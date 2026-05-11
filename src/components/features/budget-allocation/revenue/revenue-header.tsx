"use client";

import {
  Card,
  Group,
  NumberInput,
  Stack,
  Text,
  Title,
  Divider,
  SimpleGrid,
  Badge,
  Flex,
} from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import type { FeeItem } from "./types";

interface RevenueHeaderProps {
  fees: FeeItem[];
  onChange: (id: string, amount: number) => void;
}

export function RevenueHeader({ fees, onChange }: RevenueHeaderProps) {
  const total = fees.reduce((sum, f) => sum + (f.amount || 0), 0);

  return (
    <Card withBorder radius="md" padding="md">
      <Group justify="space-between" align="center" mb="xs">
        <Flex gap={10} align="center">
          <IconCoin size={20} />
          <Title order={5}>ค่าธรรมเนียม</Title>
        </Flex>
        <Badge size="lg" variant="dot">
          รวม {total.toLocaleString()} บาท
        </Badge>
      </Group>

      <Divider mb="md" />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {fees.map((fee) => (
          <Stack key={fee.id} gap={4}>
            <Text size="sm" fw={500}>
              {fee.label}
            </Text>
            <NumberInput
              value={fee.amount}
              onChange={(v) => onChange(fee.id, Number(v) || 0)}
              min={0}
              step={100}
              thousandSeparator=","
              suffix=" ฿"
              hideControls
              readOnly
            />
          </Stack>
        ))}
      </SimpleGrid>
    </Card>
  );
}
