"use client";

import { useMemo, useState } from "react";
import { Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { REVENUE_MOCK } from "../mock-data";
import { RevenueHeader } from "../revenue-header";
import { RevenueTable } from "../revenue-table";
import { filterByFacultyOrProgram } from "../revenue-utils";
import type { RevenueTabData, YearCode } from "../types";

export function BorkorInput() {
  const [data, setData] = useState<RevenueTabData>(REVENUE_MOCK.borkor!);
  const [search, setSearch] = useState("");

  const updateFee = (id: string, amount: number) => {
    setData((prev) => ({
      ...prev,
      fees: prev.fees.map((f) => (f.id === id ? { ...f, amount } : f)),
    }));
  };

  const updateStudent = (rowId: string, year: YearCode, value: number | null) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === rowId
          ? { ...r, studentCounts: { ...r.studentCounts, [year]: value } }
          : r,
      ),
    }));
  };

  const updatePerHead = (rowId: string, amount: number) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === rowId ? { ...r, perHeadAmount: amount } : r,
      ),
    }));
  };

  const totalFee = data.fees.reduce((s, f) => s + (f.amount || 0), 0);

  const filteredRows = useMemo(
    () => filterByFacultyOrProgram(data.rows, search),
    [data.rows, search],
  );

  return (
    <Stack gap="md">
      <RevenueHeader fees={data.fees} onChange={updateFee} />
      <TextInput
        placeholder="ค้นหาคณะ หรือ โปรแกรม"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <RevenueTable
        rows={filteredRows}
        totalFee={totalFee}
        onChangeStudent={updateStudent}
        onChangePerHead={updatePerHead}
      />
    </Stack>
  );
}
