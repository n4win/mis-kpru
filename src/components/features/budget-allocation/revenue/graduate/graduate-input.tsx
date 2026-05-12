"use client";

import { Center, Paper, Stack, Text } from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";

export function GraduateInput() {
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
