"use client";

import { Tabs, Stack, Center, Text, Paper } from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";
import { useState } from "react";
import { RevenueHeader } from "./revenue-header";
import { RevenueTable } from "./revenue-table";
import { REVENUE_MOCK } from "./mock-data";
import type {
  ProgramType,
  RevenueDataMap,
  RevenueTabData,
  YearCode,
} from "./types";

const TAB_LABEL: Record<ProgramType, string> = {
  borkor: "บ.กศ",
  korborbor: "กศ.บป",
  graduate: "บัณฑิต",
};

const TAB_ORDER: ProgramType[] = ["borkor", "korborbor", "graduate"];

export function RevenueTabs() {
  const [data, setData] = useState<RevenueDataMap>(REVENUE_MOCK);
  const [active, setActive] = useState<ProgramType>("borkor");

  const updateFee = (tab: ProgramType, id: string, amount: number) => {
    setData((prev) => {
      const cur = prev[tab];
      if (!cur) return prev;
      return {
        ...prev,
        [tab]: {
          ...cur,
          fees: cur.fees.map((f) => (f.id === id ? { ...f, amount } : f)),
        },
      };
    });
  };

  const updateStudent = (
    tab: ProgramType,
    rowId: string,
    year: YearCode,
    value: number | null,
  ) => {
    setData((prev) => {
      const cur = prev[tab];
      if (!cur) return prev;
      return {
        ...prev,
        [tab]: {
          ...cur,
          rows: cur.rows.map((r) =>
            r.id === rowId
              ? { ...r, studentCounts: { ...r.studentCounts, [year]: value } }
              : r,
          ),
        },
      };
    });
  };

  const updatePerHead = (tab: ProgramType, rowId: string, amount: number) => {
    setData((prev) => {
      const cur = prev[tab];
      if (!cur) return prev;
      return {
        ...prev,
        [tab]: {
          ...cur,
          rows: cur.rows.map((r) =>
            r.id === rowId ? { ...r, perHeadAmount: amount } : r,
          ),
        },
      };
    });
  };

  return (
    <Tabs
      mt={20}
      value={active}
      onChange={(v) => v && setActive(v as ProgramType)}
    >
      <Tabs.List>
        {TAB_ORDER.map((t) => (
          <Tabs.Tab key={t} value={t}>
            {TAB_LABEL[t]}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {TAB_ORDER.map((t) => {
        const tabData = data[t];
        return (
          <Tabs.Panel key={t} value={t} pt="md">
            {tabData ? (
              <TabContent
                tabData={tabData}
                onChangeFee={(id, amount) => updateFee(t, id, amount)}
                onChangeStudent={(id, y, v) => updateStudent(t, id, y, v)}
                onChangePerHead={(id, v) => updatePerHead(t, id, v)}
              />
            ) : (
              <EmptyState />
            )}
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}

interface TabContentProps {
  tabData: RevenueTabData;
  onChangeFee: (id: string, amount: number) => void;
  onChangeStudent: (id: string, year: YearCode, value: number | null) => void;
  onChangePerHead: (id: string, value: number) => void;
}

function TabContent({
  tabData,
  onChangeFee,
  onChangeStudent,
  onChangePerHead,
}: TabContentProps) {
  const totalFee = tabData.fees.reduce((s, f) => s + (f.amount || 0), 0);
  return (
    <Stack gap="md">
      <RevenueHeader fees={tabData.fees} onChange={onChangeFee} />
      <RevenueTable
        rows={tabData.rows}
        totalFee={totalFee}
        onChangeStudent={onChangeStudent}
        onChangePerHead={onChangePerHead}
      />
    </Stack>
  );
}

function EmptyState() {
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
