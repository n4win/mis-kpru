import type { FeeItem } from "../types";

export const KB_YEAR_CODES = ["66", "67", "68", "69", "70"] as const;
export type KBYear = (typeof KB_YEAR_CODES)[number];
export const KB_EDITABLE_YEAR: KBYear = "70";

export type KBCampusKey = "kamphaeng" | "maesot" | "foreign";

export interface KBStudentCounts {
  "66": number | null;
  "67": number | null;
  "68": number | null;
  "69": number | null;
  "70": number | null;
}

export interface KBRow {
  id: string;
  faculty: string;
  program?: string;
  isFacultyHeader?: boolean;
  studentCounts: KBStudentCounts;
  perHeadAmount: number;
}

export interface KBCampusData {
  key: KBCampusKey;
  label: string;
  fees: FeeItem[];
  rows: KBRow[];
}

export { type FeeItem };
