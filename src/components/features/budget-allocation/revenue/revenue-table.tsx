"use client";

import { NumberFormatter, NumberInput, Text } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import { useMemo, useState } from "react";
import { TableMantine } from "@/components/ui";
import {
  EDITABLE_YEAR,
  YEAR_CODES,
  type RevenueRow,
  type YearCode,
} from "./types";
import { facultyYearTotals, groupByFaculty, sumCounts } from "./revenue-utils";

interface RevenueTableProps {
  rows: RevenueRow[];
  totalFee: number;
  onChangeStudent: (id: string, year: YearCode, value: number | null) => void;
  onChangePerHead: (id: string, value: number) => void;
}

interface DisplayRow extends RevenueRow {
  _yearTotals?: Record<YearCode, number>;
  _facultyStudents?: number;
  _facultyBudget?: number;
}

const PER_PAGE_OPTIONS = [10, 15, 25, 50];
const fmt = (n: number) => n.toLocaleString();

const editableInputStylesCenter = {
  input: { textAlign: "center" as const, fontWeight: 500 },
};
const editableInputStylesRight = {
  input: { textAlign: "right" as const, fontWeight: 500 },
};

export function RevenueTable({
  rows,
  totalFee,
  onChangeStudent,
  onChangePerHead,
}: RevenueTableProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const allRecords: DisplayRow[] = useMemo(() => {
    const groups = groupByFaculty(rows);
    return groups.flatMap((g) => {
      const yearTotals = facultyYearTotals(g.programs);
      const facultyStudents = YEAR_CODES.reduce((s, y) => s + yearTotals[y], 0);
      const facultyBudget = g.programs.reduce((sum, p) => {
        if (p.perHeadAmount === 0 || p.studentCounts["70"] === null) return sum;
        return sum + (totalFee + p.perHeadAmount) * sumCounts(p.studentCounts);
      }, 0);
      const enrichedHeader: DisplayRow = {
        ...g.header,
        _yearTotals: yearTotals,
        _facultyStudents: facultyStudents,
        _facultyBudget: facultyBudget,
      };
      return [enrichedHeader, ...g.programs];
    });
  }, [rows, totalFee]);

  const pageRecords = useMemo(() => {
    const start = (page - 1) * perPage;
    return allRecords.slice(start, start + perPage);
  }, [allRecords, page, perPage]);

  const columns: DataTableColumn<DisplayRow>[] = useMemo(
    () => [
      {
        accessor: "program",
        title: "คณะ / โปรแกรม",
        width: 240,
        render: (r) =>
          r.isFacultyHeader ? (
            <Text fw={600}>{r.faculty}</Text>
          ) : (
            <Text size="sm" pl={15}>
              {r.program}
            </Text>
          ),
      },
      ...YEAR_CODES.map(
        (y): DataTableColumn<DisplayRow> => ({
          accessor: `year_${y}`,
          title: `รหัส ${y}`,
          textAlign: "center",
          width: 90,
          render: (r) => {
            if (r.isFacultyHeader) {
              const t = r._yearTotals?.[y] ?? 0;
              return (
                <Text fw={500} size="sm">
                  {t === 0 ? "—" : fmt(t)}
                </Text>
              );
            }
            const value = r.studentCounts[y];
            if (y === EDITABLE_YEAR) {
              return (
                <NumberInput
                  value={value ?? ""}
                  onChange={(v) =>
                    onChangeStudent(r.id, y, v === "" ? null : Number(v))
                  }
                  min={0}
                  hideControls
                  size="xs"
                  variant="default"
                  styles={editableInputStylesCenter}
                />
              );
            }
            return (
              <Text size="sm" c={value === null ? "dimmed" : undefined}>
                {value === null ? "—" : fmt(value)}
              </Text>
            );
          },
        }),
      ),
      {
        accessor: "totalStudents",
        title: "รวม นศ.",
        textAlign: "center",
        width: 100,
        render: (r) =>
          r.isFacultyHeader ? (
            <Text fw={600}>{fmt(r._facultyStudents ?? 0)}</Text>
          ) : (
            <Text size="sm" fw={500}>
              {fmt(sumCounts(r.studentCounts))}
            </Text>
          ),
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
              styles={editableInputStylesRight}
            />
          ),
      },
      {
        accessor: "totalBudget",
        title: "รวมงบ (บาท)",
        textAlign: "right",
        width: 160,
        render: (r) => {
          if (r.isFacultyHeader) {
            const b = r._facultyBudget ?? 0;
            return b === 0 ? (
              <Text fw={600} c="dimmed">
                —
              </Text>
            ) : (
              <Text fw={600}>
                <NumberFormatter
                  value={b}
                  thousandSeparator=","
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
              </Text>
            );
          }
          if (r.perHeadAmount === 0 || r.studentCounts["70"] === null) {
            return (
              <Text size="sm" c="dimmed">
                —
              </Text>
            );
          }
          const total =
            (totalFee + r.perHeadAmount) * sumCounts(r.studentCounts);
          return (
            <Text size="sm" fw={600}>
              <NumberFormatter
                value={total}
                thousandSeparator=","
                fixedDecimalScale={true}
                decimalScale={2}
              />
            </Text>
          );
        },
      },
    ],
    [totalFee, onChangeStudent, onChangePerHead],
  );

  const handlePerPageChange = (n: number) => {
    setPerPage(n);
    setPage(1);
  };

  return (
    <TableMantine<DisplayRow>
      records={pageRecords}
      columns={columns}
      idAccessor="id"
      withTableBorder
      borderRadius="md"
      highlightOnHover
      verticalSpacing="xs"
      minHeight={200}
      rowStyle={(r) =>
        r.isFacultyHeader
          ? {
              backgroundColor:
                "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))",
            }
          : undefined
      }
      totalRecords={allRecords.length}
      recordsPerPage={perPage}
      onRecordsPerPageChange={handlePerPageChange}
      recordsPerPageOptions={PER_PAGE_OPTIONS}
      page={page}
      onPageChange={setPage}
    />
  );
}
