"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Group,
  NumberFormatter,
  NumberInput,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDeviceFloppy, IconSearch, IconX } from "@tabler/icons-react";
import { NATIONAL_UNITS_MOCK } from "../mock-data";
import {
  computeNationalTotals,
  sumNationalA,
  sumNationalB,
  updateNationalUnit,
} from "../government-utils";
import {
  NATIONAL_COLUMNS,
  type NationalField,
  type NationalUnit,
  type NationalValue,
} from "../types";

const COLOR_SUM =
  "light-dark(var(--mantine-color-blue-0), var(--mantine-color-dark-7))";
const COLOR_TOTAL =
  "light-dark(var(--mantine-color-teal-0), var(--mantine-color-dark-7))";
const COLOR_SUM_STRONG =
  "light-dark(var(--mantine-color-blue-1), var(--mantine-color-dark-5))";
const COLOR_TOTAL_STRONG =
  "light-dark(var(--mantine-color-teal-1), var(--mantine-color-dark-5))";
const COLOR_FOOTER =
  "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))";
const COLOR_EMPTY =
  "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))";
const COLOR_BODY = "var(--mantine-color-body)";

export function NationalInput() {
  const [units, setUnits] = useState<NationalUnit[]>(NATIONAL_UNITS_MOCK);
  const [search, setSearch] = useState("");
  const [savedAt, setSavedAt] = useState<Date>(new Date());
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const totals = useMemo(() => computeNationalTotals(units), [units]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return units;
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.code.toLowerCase().includes(q),
    );
  }, [units, search]);

  const handleChange = (
    id: string,
    field: NationalField,
    value: NationalValue,
  ) => {
    setUnits((prev) => updateNationalUnit(prev, id, field, value));
    setSavedAt(new Date());
  };

  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Title order={4}>
          งบหน่วยงาน ประจำปีงบประมาณ พ.ศ. 2569 (งบประมาณแผ่นดิน)
        </Title>

        <ReportToolbar
          totalAll={totals.all}
          savedAt={savedAt}
          search={search}
          onSearchChange={setSearch}
        />

        <ScrollArea>
          <Table
            stickyHeader
            withTableBorder
            withColumnBorders
            verticalSpacing={6}
            horizontalSpacing="xs"
            styles={{ table: { minWidth: 1400, fontSize: 13 } }}
          >
            <TableHeader />
            <Table.Tbody>
              {filtered.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={9}>
                    <Text size="sm" c="dimmed" ta="center" py="md">
                      ไม่พบหน่วยงานที่ตรงกับเงื่อนไข
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filtered.map((u) => (
                  <UnitRow key={u.id} unit={u} onChange={handleChange} />
                ))
              )}
            </Table.Tbody>
            <TableFooter totals={totals} />
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}

function ReportToolbar({
  totalAll,
  savedAt,
  search,
  onSearchChange,
}: {
  totalAll: number;
  savedAt: Date;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <Group justify="space-between" gap="md" wrap="wrap">
      <TextInput
        placeholder="ค้นหาหน่วยงาน..."
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        leftSection={<IconSearch size={14} />}
        rightSection={
          search ? (
            <ActionIcon
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => onSearchChange("")}
            >
              <IconX size={12} />
            </ActionIcon>
          ) : null
        }
        size="xs"
        style={{ minWidth: 220 }}
      />
      <Group gap="md">
        <Stack gap={0} align="flex-end">
          <Text size="xs" c="dimmed">
            ยอดรวมปัจจุบัน
          </Text>
          <Text fw={700} size="md" c="teal.7">
            <NumberFormatter
              value={totalAll}
              thousandSeparator=","
              suffix=" บาท"
            />
          </Text>
        </Stack>
        <SaveStatus savedAt={savedAt} />
      </Group>
    </Group>
  );
}

function SaveStatus({ savedAt }: { savedAt: Date }) {
  const sec = Math.floor((Date.now() - savedAt.getTime()) / 1000);
  let label: string;
  if (sec < 5) label = "บันทึกแล้ว";
  else if (sec < 60) label = `บันทึกล่าสุด ${sec} วินาทีที่แล้ว`;
  else if (sec < 3600)
    label = `บันทึกล่าสุด ${Math.floor(sec / 60)} นาทีที่แล้ว`;
  else label = `บันทึกล่าสุด ${Math.floor(sec / 3600)} ชั่วโมงที่แล้ว`;

  return (
    <Group gap={4} align="center">
      <IconDeviceFloppy size={14} color="var(--mantine-color-teal-7)" />
      <Stack gap={0}>
        <Text size="xs" fw={500} c="teal.7">
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          บันทึกอัตโนมัติ
        </Text>
      </Stack>
    </Group>
  );
}

function TableHeader() {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th
          rowSpan={2}
          style={{
            minWidth: 300,
            position: "sticky",
            left: 0,
            backgroundColor: COLOR_BODY,
            zIndex: 3,
          }}
        >
          หน่วยงาน
        </Table.Th>
        {NATIONAL_COLUMNS.slice(0, 3).map((c) => (
          <InputColHeader key={c.key} num={c.num} title={c.title} />
        ))}
        <SumColHeader
          label="รวม A"
          formula="(1)+(2)+(3)"
          bg={COLOR_SUM_STRONG}
          minWidth={120}
        />
        {NATIONAL_COLUMNS.slice(3, 5).map((c) => (
          <InputColHeader key={c.key} num={c.num} title={c.title} />
        ))}
        <SumColHeader
          label="รวม B"
          formula="(4)+(5)"
          bg={COLOR_SUM_STRONG}
          minWidth={120}
        />
        <SumColHeader
          label="รวมงบแผ่นดิน 2569 ทั้งหมด"
          formula="A + B"
          bg={COLOR_TOTAL_STRONG}
          minWidth={150}
        />
      </Table.Tr>
      <Table.Tr></Table.Tr>
    </Table.Thead>
  );
}

function InputColHeader({ num, title }: { num: string; title: string }) {
  return (
    <Table.Th ta="center" style={{ minWidth: 140 }}>
      <Tooltip label={title} withArrow multiline w={200} position="bottom">
        <Stack gap={0} align="center" style={{ cursor: "default" }}>
          <Text size="xs" fw={600}>
            {num}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={2}>
            {title}
          </Text>
        </Stack>
      </Tooltip>
    </Table.Th>
  );
}

function SumColHeader({
  label,
  formula,
  bg,
  minWidth,
}: {
  label: string;
  formula: string;
  bg: string;
  minWidth: number;
}) {
  return (
    <Table.Th rowSpan={2} ta="center" style={{ minWidth, backgroundColor: bg }}>
      {label}
      <Text size="xs" c="dimmed" fw={400}>
        {formula}
      </Text>
    </Table.Th>
  );
}

function UnitRow({
  unit,
  onChange,
}: {
  unit: NationalUnit;
  onChange: (id: string, field: NationalField, value: NationalValue) => void;
}) {
  const A = sumNationalA(unit);
  const B = sumNationalB(unit);
  const total = A + B;
  const inputFieldsA: NationalField[] = ["v1", "v2", "v3"];
  const inputFieldsB: NationalField[] = ["v4", "v5"];
  const isChild = unit.level === 1;

  return (
    <Table.Tr>
      <Table.Td
        style={{
          position: "sticky",
          left: 0,
          backgroundColor: COLOR_BODY,
          zIndex: 1,
        }}
      >
        <Group gap={10} wrap="nowrap" pl={isChild ? 20 : 0}>
          <Text size="xs" c="dimmed" fw={600}>
            {unit.code}
          </Text>
          <Text
            size="sm"
            fw={isChild ? 400 : 500}
            style={{ flex: 1 }}
            lineClamp={1}
          >
            {unit.name}
          </Text>
        </Group>
      </Table.Td>
      {inputFieldsA.map((k) => (
        <InputCell
          key={k}
          value={unit[k]}
          onChange={(v) => onChange(unit.id, k, v)}
        />
      ))}
      <SumCell value={A} bg={COLOR_SUM} />
      {inputFieldsB.map((k) => (
        <InputCell
          key={k}
          value={unit[k]}
          onChange={(v) => onChange(unit.id, k, v)}
        />
      ))}
      <SumCell value={B} bg={COLOR_SUM} />
      <SumCell value={total} bg={COLOR_TOTAL} strong />
    </Table.Tr>
  );
}

function InputCell({
  value,
  onChange,
}: {
  value: NationalValue;
  onChange: (v: NationalValue) => void;
}) {
  const isEmpty = value === null;
  return (
    <Table.Td
      p={2}
      style={{ backgroundColor: isEmpty ? COLOR_EMPTY : undefined }}
    >
      <NumberInput
        value={value ?? ""}
        onChange={(v) => {
          if (v === "" || v === undefined) onChange(null);
          else {
            const num = Number(v);
            onChange(Number.isNaN(num) ? null : num);
          }
        }}
        min={0}
        step={1000}
        thousandSeparator=","
        hideControls
        placeholder="—"
        size="xs"
        variant="unstyled"
        styles={{
          input: {
            textAlign: "right",
            color: isEmpty ? "var(--mantine-color-gray-5)" : undefined,
          },
        }}
      />
    </Table.Td>
  );
}

function SumCell({
  value,
  bg,
  strong,
}: {
  value: number;
  bg: string;
  strong?: boolean;
}) {
  return (
    <Table.Td style={{ backgroundColor: bg }}>
      <Money value={value} fw={strong ? 700 : 500} />
    </Table.Td>
  );
}

function TableFooter({
  totals,
}: {
  totals: ReturnType<typeof computeNationalTotals>;
}) {
  return (
    <Table.Tfoot style={{ backgroundColor: COLOR_FOOTER }}>
      <Table.Tr>
        <Table.Th
          style={{
            position: "sticky",
            left: 0,
            backgroundColor: COLOR_FOOTER,
            zIndex: 1,
          }}
        >
          <Text fw={700} size="sm">
            รวมงบจัดสรร
          </Text>
        </Table.Th>
        <Table.Th>
          <Money value={totals.v1} fw={700} />
        </Table.Th>
        <Table.Th>
          <Money value={totals.v2} fw={700} />
        </Table.Th>
        <Table.Th>
          <Money value={totals.v3} fw={700} />
        </Table.Th>
        <Table.Th style={{ backgroundColor: COLOR_SUM_STRONG }}>
          <Money value={totals.A} fw={700} />
        </Table.Th>
        <Table.Th>
          <Money value={totals.v4} fw={700} />
        </Table.Th>
        <Table.Th>
          <Money value={totals.v5} fw={700} />
        </Table.Th>
        <Table.Th style={{ backgroundColor: COLOR_SUM_STRONG }}>
          <Money value={totals.B} fw={700} />
        </Table.Th>
        <Table.Th style={{ backgroundColor: COLOR_TOTAL_STRONG }}>
          <Money value={totals.all} fw={800} />
        </Table.Th>
      </Table.Tr>
    </Table.Tfoot>
  );
}

function Money({ value, fw = 500 }: { value: number; fw?: number }) {
  if (!value) {
    return (
      <Text size="sm" c="dimmed" ta="right">
        —
      </Text>
    );
  }
  return (
    <Text size="sm" ta="right" fw={fw}>
      <NumberFormatter value={value} thousandSeparator="," />
    </Text>
  );
}
