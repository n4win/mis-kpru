"use client";

import { NumberFormatter, NumberInput, Text } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import { useMemo } from "react";
import { TableMantine } from "@/components/ui";
import {
  KB_EDITABLE_YEAR,
  KB_YEAR_CODES,
  type KBRow,
  type KBYear,
} from "./types";

interface KorborborTableProps {
  rows: KBRow[];
  totalFee: number;
  termsPerYear?: number;
  onChangeStudent: (id: string, year: KBYear, value: number | null) => void;
  onChangePerHead: (id: string, value: number) => void;
}

interface KBDisplayRow extends KBRow {
  _yearTotals?: Record<KBYear, number>;
  _total?: number;
  _budget?: number;
}

const fmt = (n: number) => n.toLocaleString();

const sumYears = (counts: KBRow["studentCounts"], years: readonly KBYear[]) =>
  years.reduce((s, y) => s + (counts[y] ?? 0), 0);

function buildDisplayRows(
  rows: KBRow[],
  totalFee: number,
  termsPerYear: number,
): KBDisplayRow[] {
  const result: KBDisplayRow[] = [];
  let currentPrograms: KBRow[] = [];
  let headerIdx = -1;

  const enrichHeader = () => {
    if (headerIdx < 0) return;
    const yearTotals = Object.fromEntries(
      KB_YEAR_CODES.map((y) => [
        y,
        currentPrograms.reduce((s, r) => s + (r.studentCounts[y] ?? 0), 0),
      ]),
    ) as Record<KBYear, number>;
    const total = KB_YEAR_CODES.reduce((s, y) => s + yearTotals[y], 0);
    const budget = currentPrograms.reduce((sum, p) => {
      if (p.perHeadAmount === 0 || p.studentCounts[KB_EDITABLE_YEAR] === null) return sum;
      return sum + (totalFee + p.perHeadAmount) * sumYears(p.studentCounts, KB_YEAR_CODES) * termsPerYear;
    }, 0);
    result[headerIdx] = {
      ...result[headerIdx],
      _yearTotals: yearTotals,
      _total: total,
      _budget: budget,
    };
  };

  for (const row of rows) {
    if (row.isFacultyHeader) {
      enrichHeader();
      currentPrograms = [];
      headerIdx = result.length;
      result.push({
        ...row,
        _yearTotals: Object.fromEntries(
          KB_YEAR_CODES.map((y) => [y, 0]),
        ) as Record<KBYear, number>,
      });
    } else {
      const total = sumYears(row.studentCounts, KB_YEAR_CODES);
      const budget =
        row.perHeadAmount === 0 || row.studentCounts[KB_EDITABLE_YEAR] === null
          ? 0
          : (totalFee + row.perHeadAmount) * total * termsPerYear;
      result.push({ ...row, _total: total, _budget: budget });
      currentPrograms.push(row);
    }
  }
  enrichHeader();
  return result;
}

const editStyleCenter = { input: { textAlign: "center" as const, fontWeight: 500 } };
const editStyleRight = { input: { textAlign: "right" as const, fontWeight: 500 } };

export function KorborborTable({
  rows,
  totalFee,
  termsPerYear = 3,
  onChangeStudent,
  onChangePerHead,
}: KorborborTableProps) {
  const records = useMemo(
    () => buildDisplayRows(rows, totalFee, termsPerYear),
    [rows, totalFee, termsPerYear],
  );

  const historicalYears = KB_YEAR_CODES.filter((y) => y !== KB_EDITABLE_YEAR);

  const columns: DataTableColumn<KBDisplayRow>[] = useMemo(
    () => [
      {
        accessor: "program",
        title: "คณะ / โปรแกรม",
        width: 230,
        render: (r) =>
          r.isFacultyHeader ? (
            <Text fw={600}>{r.faculty}</Text>
          ) : (
            <Text size="sm" pl={15}>
              {r.program}
            </Text>
          ),
      },
      ...historicalYears.map(
        (y): DataTableColumn<KBDisplayRow> => ({
          accessor: `year_${y}`,
          title: `รหัส ${y}`,
          textAlign: "center",
          width: 75,
          render: (r) => {
            if (r.isFacultyHeader) {
              const val = r._yearTotals?.[y] ?? 0;
              return (
                <Text size="sm" fw={600} c={val === 0 ? "dimmed" : undefined}>
                  {val === 0 ? "—" : fmt(val)}
                </Text>
              );
            }
            const val = r.studentCounts[y];
            return (
              <Text size="sm" c={val === null ? "dimmed" : undefined}>
                {val === null ? "—" : fmt(val)}
              </Text>
            );
          },
        }),
      ),
      {
        accessor: `year_${KB_EDITABLE_YEAR}`,
        title: `รหัส ${KB_EDITABLE_YEAR}`,
        textAlign: "center",
        width: 90,
        render: (r) => {
          if (r.isFacultyHeader) {
            const val = r._yearTotals?.[KB_EDITABLE_YEAR] ?? 0;
            return (
              <Text size="sm" fw={600} c={val === 0 ? "dimmed" : undefined}>
                {val === 0 ? "—" : fmt(val)}
              </Text>
            );
          }
          return (
            <NumberInput
              value={r.studentCounts[KB_EDITABLE_YEAR] ?? ""}
              onChange={(v) =>
                onChangeStudent(r.id, KB_EDITABLE_YEAR, v === "" ? null : Number(v))
              }
              min={0}
              hideControls
              size="xs"
              variant="default"
              styles={editStyleCenter}
            />
          );
        },
      },
      {
        accessor: "total",
        title: "รวม นศ.",
        textAlign: "center",
        width: 85,
        render: (r) => {
          const val = r._total ?? 0;
          return (
            <Text size="sm" fw={r.isFacultyHeader ? 700 : 600} c={val === 0 ? "dimmed" : undefined}>
              {val === 0 ? "—" : fmt(val)}
            </Text>
          );
        },
      },
      {
        accessor: "perHeadAmount",
        title: "รายหัว",
        textAlign: "center",
        width: 100,
        render: (r) =>
          r.isFacultyHeader ? null : (
            <NumberInput
              value={r.perHeadAmount || ""}
              onChange={(v) => onChangePerHead(r.id, Number(v) || 0)}
              min={0}
              step={100}
              thousandSeparator=","
              hideControls
              size="xs"
              variant="default"
              styles={editStyleRight}
            />
          ),
      },
      {
        accessor: "budget",
        title: "รวมงบ (บาท)",
        textAlign: "right",
        width: 155,
        render: (r) => {
          if (r.isFacultyHeader) {
            const val = r._budget ?? 0;
            return val === 0 ? (
              <Text size="sm" fw={700} c="dimmed">—</Text>
            ) : (
              <Text size="sm" fw={700}>
                <NumberFormatter value={val} thousandSeparator="," fixedDecimalScale decimalScale={2} />
              </Text>
            );
          }
          const val = r._budget ?? 0;
          if (val === 0)
            return <Text size="sm" c="dimmed">—</Text>;
          return (
            <Text size="sm" fw={500}>
              <NumberFormatter value={val} thousandSeparator="," fixedDecimalScale decimalScale={2} />
            </Text>
          );
        },
      },
    ],
    [historicalYears, onChangeStudent, onChangePerHead],
  );

  return (
    <TableMantine<KBDisplayRow>
      records={records}
      columns={columns}
      idAccessor="id"
      withTableBorder
      borderRadius="md"
      highlightOnHover
      verticalSpacing="xs"
      minHeight={100}
      rowStyle={(r) =>
        r.isFacultyHeader
          ? {
              backgroundColor:
                "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))",
            }
          : undefined
      }
    />
  );
}
