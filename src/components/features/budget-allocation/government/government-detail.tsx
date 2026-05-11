"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Group,
  NumberFormatter,
  NumberInput,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconClick,
  IconCoins,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import {
  FACULTY_CODES,
  FACULTY_LABEL,
  type FacultyCode,
  type ProjectNode,
} from "./types";
import { fmt, isLeaf, nodeAllocations, nodeTotal } from "./government-utils";

interface GovernmentDetailProps {
  node: ProjectNode | null;
  onChangeAllocation: (
    id: string,
    faculty: FacultyCode,
    amount: number,
  ) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export function GovernmentDetail({
  node,
  onChangeAllocation,
  onEdit,
  onRemove,
}: GovernmentDetailProps) {
  if (!node) return <EmptyState />;

  const leaf = isLeaf(node);
  const total = nodeTotal(node);
  const allocations = nodeAllocations(node);

  return (
    <Paper withBorder radius="md" p="lg" style={{ height: "100%" }}>
      <ScrollArea h="100%">
        <Stack gap="md">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={4} style={{ flex: 1 }}>
              <Group gap={6}>
                <Badge variant="light" size="sm">
                  {node.code}
                </Badge>
                {leaf ? (
                  <Badge variant="dot" color="teal" size="sm">
                    รายการย่อย
                  </Badge>
                ) : (
                  <Badge variant="dot" color="blue" size="sm">
                    หมวดโครงการ
                  </Badge>
                )}
              </Group>
              <Title order={4}>{node.name}</Title>
            </Stack>
            <Group gap={4}>
              <Button
                size="xs"
                variant="light"
                leftSection={<IconEdit size={14} />}
                onClick={() => onEdit(node.id)}
              >
                แก้ไข
              </Button>
              <Button
                size="xs"
                variant="light"
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => onRemove(node.id)}
              >
                ลบ
              </Button>
            </Group>
          </Group>

          <Card withBorder radius="md" padding="md">
            <Group justify="space-between" align="center">
              <Flex gap={8} align="center">
                <IconCoins size={20} />
                <Text fw={600}>งบรวมของโครงการนี้</Text>
              </Flex>
              <Text fw={700} size="xl">
                <NumberFormatter
                  value={total}
                  thousandSeparator=","
                  fixedDecimalScale
                  decimalScale={2}
                  suffix=" ฿"
                />
              </Text>
            </Group>
            {!leaf && (
              <Text size="xs" c="dimmed" mt={4}>
                คำนวณอัตโนมัติจากผลรวมของรายการย่อยภายใน
              </Text>
            )}
          </Card>

          <Divider
            label={
              <Text size="sm" fw={500}>
                จัดสรรให้หน่วยงาน
              </Text>
            }
            labelPosition="left"
          />

          {!leaf && (
            <Alert
              variant="light"
              color="gray"
              icon={<IconAlertCircle size={16} />}
            >
              โหนดนี้เป็นหมวดโครงการ —
              ยอดจัดสรรของแต่ละหน่วยงานคำนวณจากรายการย่อย หากต้องการแก้ไข
              ให้เลือกรายการย่อยแล้วกรอกยอดในนั้น
            </Alert>
          )}

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
            {FACULTY_CODES.map((fc) => {
              const value = allocations[fc] ?? 0;
              return (
                <Stack key={fc} gap={4}>
                  <Text size="xs" fw={500} c="dimmed">
                    {FACULTY_LABEL[fc]}
                  </Text>
                  {leaf ? (
                    <NumberInput
                      value={value || ""}
                      onChange={(v) =>
                        onChangeAllocation(node.id, fc, Number(v) || 0)
                      }
                      min={0}
                      step={1000}
                      thousandSeparator=","
                      hideControls
                      placeholder="0"
                      suffix=" ฿"
                    />
                  ) : (
                    <Text size="sm" fw={500}>
                      {value > 0 ? fmt(value) : "—"}
                    </Text>
                  )}
                </Stack>
              );
            })}
          </SimpleGrid>
        </Stack>
      </ScrollArea>
    </Paper>
  );
}

function EmptyState() {
  return (
    <Paper withBorder radius="md" p="xl" style={{ height: "100%" }}>
      <Center h="100%" mih={400}>
        <Stack align="center" gap="xs">
          <IconClick size={40} color="var(--mantine-color-gray-5)" />
          <Text fw={500} c="gray.7">
            เลือกโครงการจากด้านซ้าย
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            คลิกที่โครงการในแผนผังเพื่อดูและจัดสรรงบประมาณ
          </Text>
        </Stack>
      </Center>
    </Paper>
  );
}
