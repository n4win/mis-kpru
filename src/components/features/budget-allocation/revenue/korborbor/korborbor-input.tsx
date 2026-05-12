"use client";

import { useMemo, useState } from "react";
import { Accordion, Badge, Group, NumberFormatter, Stack, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { KB_CAMPUS_MOCK } from "./mock-data";
import { KB_EDITABLE_YEAR, KB_YEAR_CODES, type KBCampusData, type KBYear } from "./types";
import { RevenueHeader } from "../revenue-header";
import { filterByFacultyOrProgram } from "../revenue-utils";
import { KorborborTable } from "./korborbor-table";

function campusSummary(campus: KBCampusData) {
  const totalFee = campus.fees.reduce((s, f) => s + (f.amount || 0), 0);
  const termsPerYear = campus.key === "foreign" ? 3 : 3;
  const programs = campus.rows.filter((r) => !r.isFacultyHeader);
  const total = programs.reduce(
    (s, r) => s + KB_YEAR_CODES.reduce((ys, y) => ys + (r.studentCounts[y] ?? 0), 0),
    0,
  );
  const budget = programs.reduce((sum, p) => {
    if (p.perHeadAmount === 0 || p.studentCounts[KB_EDITABLE_YEAR] === null) return sum;
    return (
      sum +
      (totalFee + p.perHeadAmount) *
        KB_YEAR_CODES.reduce((s, y) => s + (p.studentCounts[y] ?? 0), 0) *
        termsPerYear
    );
  }, 0);
  return { total, budget };
}

export function KorborborInput() {
  const [campuses, setCampuses] = useState<KBCampusData[]>(KB_CAMPUS_MOCK);
  const [search, setSearch] = useState("");

  const filteredCampuses = useMemo(
    () =>
      campuses.map((c) => ({
        ...c,
        filteredRows: filterByFacultyOrProgram(c.rows, search),
      })),
    [campuses, search],
  );

  const updateFee = (campusKey: string, id: string, amount: number) => {
    setCampuses((prev) =>
      prev.map((c) =>
        c.key === campusKey
          ? { ...c, fees: c.fees.map((f) => (f.id === id ? { ...f, amount } : f)) }
          : c,
      ),
    );
  };

  const updateStudent = (
    campusKey: string,
    rowId: string,
    year: KBYear,
    value: number | null,
  ) => {
    setCampuses((prev) =>
      prev.map((c) =>
        c.key === campusKey
          ? {
              ...c,
              rows: c.rows.map((r) =>
                r.id === rowId
                  ? { ...r, studentCounts: { ...r.studentCounts, [year]: value } }
                  : r,
              ),
            }
          : c,
      ),
    );
  };

  const updatePerHead = (campusKey: string, rowId: string, amount: number) => {
    setCampuses((prev) =>
      prev.map((c) =>
        c.key === campusKey
          ? { ...c, rows: c.rows.map((r) => (r.id === rowId ? { ...r, perHeadAmount: amount } : r)) }
          : c,
      ),
    );
  };

  return (
    <Stack gap="md">
      <TextInput
        placeholder="ค้นหาคณะ หรือ โปรแกรม"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <Accordion multiple defaultValue={["kamphaeng"]} variant="separated">
        {filteredCampuses.map((campus) => {
          const { total, budget } = campusSummary(campus);
          const totalFee = campus.fees.reduce((s, f) => s + (f.amount || 0), 0);

          return (
            <Accordion.Item key={campus.key} value={campus.key}>
              <Accordion.Control>
                <Group gap="sm" wrap="wrap">
                  <Text fw={600} size="sm">
                    {campus.label}
                  </Text>
                  <Badge size="sm" variant="light" color="blue" radius="sm">
                    {total.toLocaleString()} คน
                  </Badge>
                  {budget > 0 && (
                    <Badge size="sm" variant="light" color="teal" radius="sm">
                      <NumberFormatter value={budget} thousandSeparator="," suffix=" บาท" />
                    </Badge>
                  )}
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="md" pt="xs">
                  <RevenueHeader
                    fees={campus.fees}
                    onChange={(id, amount) => updateFee(campus.key, id, amount)}
                  />
                  <KorborborTable
                    rows={campus.filteredRows}
                    totalFee={totalFee}
                    termsPerYear={campus.key === "foreign" ? 3 : 3}
                    onChangeStudent={(id, year, value) =>
                      updateStudent(campus.key, id, year, value)
                    }
                    onChangePerHead={(id, amount) => updatePerHead(campus.key, id, amount)}
                  />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Stack>
  );
}
