import type { RevenueRow, StudentCounts, YearCode } from "./types";
import { YEAR_CODES } from "./types";

export interface FacultyGroup {
  header: RevenueRow;
  programs: RevenueRow[];
}

export const sumCounts = (counts: StudentCounts) =>
  YEAR_CODES.reduce((sum, y) => sum + (counts[y] ?? 0), 0);

interface FacultyRowLike {
  faculty: string;
  program?: string;
  isFacultyHeader?: boolean;
}

export function groupByFaculty<T extends FacultyRowLike>(
  rows: T[],
): { header: T; programs: T[] }[] {
  const groups: { header: T; programs: T[] }[] = [];
  let current: { header: T; programs: T[] } | null = null;
  for (const r of rows) {
    if (r.isFacultyHeader) {
      if (current) groups.push(current);
      current = { header: r, programs: [] };
    } else if (current) {
      current.programs.push(r);
    }
  }
  if (current) groups.push(current);
  return groups;
}

export function filterByFacultyOrProgram<T extends FacultyRowLike>(
  rows: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  const result: T[] = [];
  for (const g of groupByFaculty(rows)) {
    const facultyMatch = g.header.faculty.toLowerCase().includes(q);
    if (facultyMatch) {
      result.push(g.header, ...g.programs);
      continue;
    }
    const matched = g.programs.filter((p) =>
      (p.program ?? "").toLowerCase().includes(q),
    );
    if (matched.length > 0) result.push(g.header, ...matched);
  }
  return result;
}

export const facultyYearTotals = (programs: RevenueRow[]) => {
  const totals: Record<YearCode, number> = {
    "66": 0,
    "67": 0,
    "68": 0,
    "69": 0,
    "70": 0,
  };
  for (const p of programs) {
    for (const y of YEAR_CODES) {
      totals[y] += p.studentCounts[y] ?? 0;
    }
  }
  return totals;
};

export interface RevenueStats {
  facultyCount: number;
  programCount: number;
  totalStudents: number;
  totalBudget: number;
}

export const computeStats = (
  rows: RevenueRow[],
  totalFee: number
): RevenueStats => {
  const groups = groupByFaculty(rows);
  let students = 0;
  let budget = 0;
  let programs = 0;
  for (const g of groups) {
    programs += g.programs.length;
    for (const p of g.programs) {
      const s = sumCounts(p.studentCounts);
      students += s;
      budget += (totalFee + p.perHeadAmount) * s;
    }
  }
  return {
    facultyCount: groups.length,
    programCount: programs,
    totalStudents: students,
    totalBudget: budget,
  };
};
