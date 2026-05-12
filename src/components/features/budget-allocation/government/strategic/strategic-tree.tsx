"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
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
  IconSearch,
} from "@tabler/icons-react";
import type { ProjectNode } from "../types";
import { fmt, isLeaf, nodeTotal } from "../government-utils";

interface StrategicTreeProps {
  roots: ProjectNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

interface NodeMeta {
  raw: ProjectNode;
  total: number;
  status: "filled" | "partial" | "empty";
}

function filterTree(nodes: ProjectNode[], query: string): ProjectNode[] {
  if (!query) return nodes;
  const q = query.toLowerCase();
  return nodes.flatMap((n) => {
    const selfMatch =
      n.name.toLowerCase().includes(q) || n.code.toLowerCase().includes(q);
    const filteredChildren = n.children
      ? filterTree(n.children, query)
      : undefined;
    if (selfMatch) return [n];
    if (filteredChildren && filteredChildren.length > 0)
      return [{ ...n, children: filteredChildren }];
    return [];
  });
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

export function StrategicTree({
  roots,
  selectedId,
  onSelect,
}: StrategicTreeProps) {
  const [search, setSearch] = useState("");

  const metaIndex = useMemo(() => new Map<string, NodeMeta>(), []);
  const data = useMemo(() => {
    metaIndex.clear();
    const filtered = filterTree(roots, search.trim());
    return toTreeData(filtered, metaIndex);
  }, [roots, search, metaIndex]);

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
      </Group>
    );
  };

  return (
    <Paper
      withBorder
      radius="md"
      p="sm"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack gap="xs" style={{ flex: 1, minHeight: 0 }}>
        {/* <Text fw={600} size="sm">
          โครงการ
        </Text> */}
        <TextInput
          placeholder="ค้นหาโครงการ..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={14} />}
          size="xs"
        />
        <ScrollArea mah={520} mih={300} offsetScrollbars>
          {data.length === 0 ? (
            <Stack align="center" gap="xs" py="xl">
              <Text size="sm" c="dimmed">
                {search ? "ไม่พบโครงการที่ค้นหา" : "ยังไม่มีโครงการ"}
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
