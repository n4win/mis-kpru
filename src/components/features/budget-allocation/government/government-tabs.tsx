"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";
import { GOVERNMENT_MOCK } from "./mock-data";
import { GovernmentSummary } from "./government-summary";
import { GovernmentTree } from "./government-tree";
import { GovernmentDetail } from "./government-detail";
import {
  addChildNode,
  findNode,
  genId,
  removeNode,
  updateAllocation,
  updateNodeMeta,
} from "./government-utils";
import type {
  FacultyCode,
  GovernmentDataMap,
  GovernmentTabType,
  ProjectNode,
} from "./types";

const TAB_LABEL: Record<GovernmentTabType, string> = {
  national: "งปม.แผ่นดิน",
  strategic: "งปม.ยุทธศาสตร์",
};

const TAB_ORDER: GovernmentTabType[] = ["national", "strategic"];

type EditTarget =
  | { mode: "add"; parentId: string | null }
  | { mode: "edit"; id: string };

export function GovernmentTabs() {
  const [data, setData] = useState<GovernmentDataMap>(GOVERNMENT_MOCK);
  const [active, setActive] = useState<GovernmentTabType>("national");
  const [selectedByTab, setSelectedByTab] = useState<
    Record<GovernmentTabType, string | null>
  >({ national: null, strategic: null });

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [draftCode, setDraftCode] = useState("");
  const [draftName, setDraftName] = useState("");

  const roots = data[active] ?? null;
  const selectedId = selectedByTab[active];
  const selectedNode = useMemo(
    () => (roots && selectedId ? findNode(roots, selectedId) : null),
    [roots, selectedId],
  );

  const setRoots = (tab: GovernmentTabType, next: ProjectNode[]) => {
    setData((prev) => ({ ...prev, [tab]: next }));
  };

  const handleSelect = (id: string) => {
    setSelectedByTab((prev) => ({ ...prev, [active]: id }));
  };

  const handleChangeAllocation = (
    id: string,
    faculty: FacultyCode,
    amount: number,
  ) => {
    if (!roots) return;
    setRoots(active, updateAllocation(roots, id, faculty, amount));
  };

  const openAdd = (parentId: string | null) => {
    setDraftCode("");
    setDraftName("");
    setEditTarget({ mode: "add", parentId });
  };

  const openEdit = (id: string) => {
    if (!roots) return;
    const n = findNode(roots, id);
    if (!n) return;
    setDraftCode(n.code);
    setDraftName(n.name);
    setEditTarget({ mode: "edit", id });
  };

  const closeEdit = () => setEditTarget(null);

  const submitEdit = () => {
    if (!editTarget || !roots) return;
    const code = draftCode.trim();
    const name = draftName.trim();
    if (!code || !name) return;

    if (editTarget.mode === "add") {
      const child: ProjectNode = {
        id: genId(),
        code,
        name,
        allocations: {},
      };
      setRoots(active, addChildNode(roots, editTarget.parentId, child));
      setSelectedByTab((p) => ({ ...p, [active]: child.id }));
    } else {
      setRoots(active, updateNodeMeta(roots, editTarget.id, { code, name }));
    }
    closeEdit();
  };

  const handleRemove = (id: string) => setConfirmRemoveId(id);

  const confirmRemove = () => {
    if (!confirmRemoveId || !roots) return;
    setRoots(active, removeNode(roots, confirmRemoveId));
    if (selectedId === confirmRemoveId) {
      setSelectedByTab((p) => ({ ...p, [active]: null }));
    }
    setConfirmRemoveId(null);
  };

  return (
    <>
      <Tabs
        mt={20}
        value={active}
        onChange={(v) => v && setActive(v as GovernmentTabType)}
      >
        <Tabs.List>
          {TAB_ORDER.map((t) => (
            <Tabs.Tab key={t} value={t}>
              {TAB_LABEL[t]}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {TAB_ORDER.map((t) => (
          <Tabs.Panel key={t} value={t} pt="md">
            {data[t] ? (
              <Stack gap="md">
                <GovernmentSummary roots={data[t] ?? []} />
                <Grid>
                  <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
                    <GovernmentTree
                      roots={data[t] ?? []}
                      selectedId={t === active ? selectedId : null}
                      onSelect={handleSelect}
                      onAddChild={openAdd}
                      onEdit={openEdit}
                      onRemove={handleRemove}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
                    <GovernmentDetail
                      node={t === active ? selectedNode : null}
                      onChangeAllocation={handleChangeAllocation}
                      onEdit={openEdit}
                      onRemove={handleRemove}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            ) : (
              <EmptyTab />
            )}
          </Tabs.Panel>
        ))}
      </Tabs>

      <Modal
        opened={editTarget !== null}
        onClose={closeEdit}
        title={
          editTarget?.mode === "add"
            ? editTarget.parentId === null
              ? "เพิ่มโครงการหลัก"
              : "เพิ่มหัวข้อย่อย"
            : "แก้ไขโครงการ"
        }
        centered
      >
        <Stack>
          <TextInput
            label="รหัส/ลำดับ"
            placeholder="เช่น 1, 2.1, 2.1.1, 1)"
            value={draftCode}
            onChange={(e) => setDraftCode(e.currentTarget.value)}
            required
          />
          <TextInput
            label="ชื่อโครงการ/หัวข้อ"
            placeholder="ระบุชื่อโครงการ"
            value={draftName}
            onChange={(e) => setDraftName(e.currentTarget.value)}
            required
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={closeEdit}>
              ยกเลิก
            </Button>
            <Button
              onClick={submitEdit}
              disabled={!draftCode.trim() || !draftName.trim()}
            >
              บันทึก
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={confirmRemoveId !== null}
        onClose={() => setConfirmRemoveId(null)}
        title="ยืนยันการลบ"
        centered
      >
        <Stack>
          <Text size="sm">
            ต้องการลบโครงการนี้ใช่หรือไม่? หากมีหัวข้อย่อยจะถูกลบทั้งหมดด้วย
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setConfirmRemoveId(null)}>
              ยกเลิก
            </Button>
            <Button color="red" onClick={confirmRemove}>
              ลบ
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

function EmptyTab() {
  return (
    <Paper withBorder radius="md" p="xl">
      <Center>
        <Stack align="center" gap="xs" py="xl">
          <IconClockHour4 size={40} color="var(--mantine-color-gray-5)" />
          <Text fw={500} c="gray.7">
            ยังไม่มีข้อมูล
          </Text>
          <Text size="sm" c="dimmed">
            อยู่ระหว่างเตรียมรายละเอียด
          </Text>
        </Stack>
      </Center>
    </Paper>
  );
}
