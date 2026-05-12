"use client";

import { useMemo, useState } from "react";
import {
  Center,
  Grid,
  Paper,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";
import { GOVERNMENT_MOCK } from "./mock-data";
import { StrategicSummary, StrategicTree, StrategicDetail } from "./strategic";
import { NationalInput } from "./national";
import { findNode, findPath, updateAllocation } from "./government-utils";
import type {
  FacultyCode,
  GovernmentDataMap,
  GovernmentTabType,
} from "./types";

const TAB_LABEL: Record<GovernmentTabType, string> = {
  national: "งปม.แผ่นดิน",
  strategic: "งปม.ยุทธศาสตร์",
};

const TAB_ORDER: GovernmentTabType[] = ["national", "strategic"];

export function GovernmentTabs() {
  const [data, setData] = useState<GovernmentDataMap>(GOVERNMENT_MOCK);
  const [active, setActive] = useState<GovernmentTabType>("national");
  const [selectedByTab, setSelectedByTab] = useState<
    Record<GovernmentTabType, string | null>
  >({ national: null, strategic: null });

  const roots = data[active] ?? null;
  const selectedId = selectedByTab[active];
  const selectedNode = useMemo(
    () => (roots && selectedId ? findNode(roots, selectedId) : null),
    [roots, selectedId],
  );
  const selectedBreadcrumb = useMemo(
    () => (roots && selectedId ? findPath(roots, selectedId) : []),
    [roots, selectedId],
  );

  const handleSelect = (id: string) => {
    setSelectedByTab((prev) => ({ ...prev, [active]: id }));
  };

  const handleChangeAllocation = (
    id: string,
    faculty: FacultyCode,
    amount: number,
  ) => {
    if (!roots) return;
    setData((prev) => ({
      ...prev,
      [active]: updateAllocation(roots, id, faculty, amount),
    }));
  };

  return (
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

      <Tabs.Panel value="national" pt="md">
        <NationalInput />
      </Tabs.Panel>

      <Tabs.Panel value="strategic" pt="md">
        {data.strategic ? (
          <Stack gap="md">
            <StrategicSummary roots={data.strategic ?? []} />
            <Grid align="stretch">
              <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
                <StrategicTree
                  roots={data.strategic ?? []}
                  selectedId={active === "strategic" ? selectedId : null}
                  onSelect={handleSelect}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
                <StrategicDetail
                  node={active === "strategic" ? selectedNode : null}
                  breadcrumb={active === "strategic" ? selectedBreadcrumb : []}
                  onChangeAllocation={handleChangeAllocation}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        ) : (
          <EmptyTab />
        )}
      </Tabs.Panel>
    </Tabs>
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
