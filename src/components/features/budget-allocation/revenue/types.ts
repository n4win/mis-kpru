export type ProgramType = "borkor" | "korborbor" | "graduate";

export const YEAR_CODES = ["66", "67", "68", "69", "70"] as const;
export type YearCode = (typeof YEAR_CODES)[number];

export const EDITABLE_YEAR: YearCode = "70";

export interface StudentCounts {
  "66": number | null;
  "67": number | null;
  "68": number | null;
  "69": number | null;
  "70": number | null;
}

export interface RevenueRow {
  id: string;
  faculty: string;
  program?: string;
  isFacultyHeader?: boolean;
  studentCounts: StudentCounts;
  perHeadAmount: number;
}

export interface FeeItem {
  id: string;
  label: string;
  amount: number;
}

export interface RevenueTabData {
  fees: FeeItem[];
  rows: RevenueRow[];
}

export type RevenueDataMap = Record<ProgramType, RevenueTabData | null>;
