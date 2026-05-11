"use client";

import { useMemo } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Menu,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Tree,
  type RenderTreeNodePayload,
  type TreeNodeData,
  getTreeExpandedState,
  useTree,
} from "@mantine/core";
import {
  IconChevronRight,
  IconCircleCheckFilled,
  IconCircleDot,
  IconCircleDashed,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import type { ProjectNode } from "./types";
import { fmt, isLeaf, nodeTotal } from "./government-utils";

interface GovernmentTreeProps {
  roots: ProjectNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddChild: (parentId: string | null) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

interface NodeMeta {
  raw: ProjectNode;
  total: number;
  status: "filled" | "partial" | "empty";
}

function toTreeData(
  nodes: ProjectNode[],
  metaIndex: Map<string, NodeMeta>,
): TreeNodeData[] {
  return nodes.map((n) => {
    const total = nodeTotal(n);
    let status: NodeMeta["status"] = "empty";
    if (isLeaf(n)) {
      status = total > 0 ? "filled" : "empty";
    } else {
      const childTotals = (n.children ?? []).map((c) => nodeTotal(c));
      const filledCount = childTotals.filter((t) => t > 0).length;
      if (filledCount === 0) status = "empty";
      else if (filledCount === childTotals.length) status = "filled";
      else status = "partial";
    }
    metaIndex.set(n.id, { raw: n, total, status });
    return {
      value: n.id,
      label: n.name,
      children: n.children ? toTreeData(n.children, metaIndex) : undefined,
    };
  });
}

function StatusIcon({ status }: { status: NodeMeta["status"] }) {
  if (status === "filled")
    return (
      <IconCircleCheckFilled size={14} color="var(--mantine-color-teal-6)" />
    );
  if (status === "partial")
    return <IconCircleDot size={14} color="var(--mantine-color-yellow-6)" />;
  return <IconCircleDashed size={14} color="var(--mantine-color-gray-5)" />;
}

export function GovernmentTree({
  roots,
  selectedId,
  onSelect,
  onAddChild,
  onEdit,
  onRemove,
}: GovernmentTreeProps) {
  const metaIndex = useMemo(() => new Map<string, NodeMeta>(), []);
  const data = useMemo(() => {
    metaIndex.clear();
    return toTreeData(roots, metaIndex);
  }, [roots, metaIndex]);

  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, "*"),
  });

  const renderNode = ({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: RenderTreeNodePayload) => {
    const meta = metaIndex.get(node.value);
    if (!meta) return null;
    const { raw, total, status } = meta;
    const isSelected = node.value === selectedId;

    return (
      <Group
        {...elementProps}
        wrap="nowrap"
        gap={4}
        py={4}
        pr={4}
        style={{
          ...elementProps.style,
          borderRadius: 6,
          backgroundColor: isSelected
            ? "light-dark(var(--mantine-color-blue-0), var(--mantine-color-dark-6))"
            : undefined,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) tree.toggleExpanded(node.value);
          onSelect(node.value);
        }}
      >
        <Box w={16} style={{ flexShrink: 0 }}>
          {hasChildren && (
            <IconChevronRight
              size={14}
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 120ms ease",
                color: "var(--mantine-color-gray-6)",
              }}
            />
          )}
        </Box>
        <StatusIcon status={status} />
        <Text size="xs" fw={600} c="dimmed" style={{ flexShrink: 0 }}>
          {raw.code}
        </Text>
        <Text
          size="sm"
          fw={isSelected ? 600 : 400}
          style={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {raw.name}
        </Text>
        {total > 0 && (
          <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
            {fmt(total)}
          </Text>
        )}
        <Menu shadow="md" position="bottom-end" withinPortal>
          <Menu.Target>
            <ActionIcon
              size="sm"
              variant="subtle"
              color="gray"
              onClick={(e) => e.stopPropagation()}
              aria-label="ตัวเลือก"
            >
              <IconDotsVertical size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconPlus size={14} />}
              onClick={(e) => {
                e.stopPropagation();
                onAddChild(raw.id);
              }}
            >
              เพิ่มหัวข้อย่อย
            </Menu.Item>
            <Menu.Item
              leftSection={<IconEdit size={14} />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(raw.id);
              }}
            >
              แก้ไขชื่อ/รหัส
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(raw.id);
              }}
            >
              ลบ
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  };

  return (
    <Paper withBorder radius="md" p="sm" style={{ height: "100%" }}>
      <Stack gap="xs" h="100%">
        <Group justify="space-between">
          <Text fw={600} size="sm">
            โครงการ
          </Text>
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPlus size={14} />}
            onClick={() => onAddChild(null)}
          >
            เพิ่มโครงการหลัก
          </Button>
        </Group>
        <ScrollArea style={{ flex: 1, minHeight: 400 }}>
          {data.length === 0 ? (
            <Stack align="center" gap="xs" py="xl">
              <Text size="sm" c="dimmed">
                ยังไม่มีโครงการ
              </Text>
            </Stack>
          ) : (
            <Tree
              data={data}
              tree={tree}
              levelOffset={20}
              expandOnClick={false}
              selectOnClick={false}
              renderNode={renderNode}
            />
          )}
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
