"use client";

import { Card, Divider, Group, NumberFormatter, Stack, Text } from "@mantine/core";
import { FACULTY_CODES, FACULTY_LABEL, type ProjectNode } from "../types";
import { rollupTree } from "../government-utils";

interface StrategicSummaryProps {
  roots: ProjectNode[];
}

export function StrategicSummary({ roots }: StrategicSummaryProps) {
  const { total, byFaculty } = rollupTree(roots);

  return (
    <Card withBorder radius="md" padding="md">
      <Group gap="lg" wrap="wrap" align="stretch">
        <Stack gap={2} miw={160}>
          <Text size="xs" c="dimmed" fw={500}>
            งบรวมทั้งหมด (2569)
          </Text>
          <Text fw={700} size="xl">
            <NumberFormatter
              value={total}
              thousandSeparator=","
              fixedDecimalScale
              decimalScale={2}
            />
          </Text>
        </Stack>

        <Divider orientation="vertical" />

        <Group gap="md" style={{ flex: 1 }} wrap="wrap">
          {FACULTY_CODES.map((fc) => {
            const v = byFaculty[fc];
            return (
              <Stack key={fc} gap={0} miw={120}>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {FACULTY_LABEL[fc]}
                </Text>
                <Text fw={600} size="sm" c={v > 0 ? undefined : "dimmed"}>
                  {v > 0 ? (
                    <NumberFormatter value={v} thousandSeparator="," />
                  ) : (
                    "—"
                  )}
                </Text>
              </Stack>
            );
          })}
        </Group>
      </Group>
    </Card>
  );
}
