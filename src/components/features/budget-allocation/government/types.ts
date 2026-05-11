export type GovernmentTabType = "national" | "strategic";

export const FACULTY_CODES = [
  "edu",
  "hum",
  "mgmt",
  "sci",
  "tech",
  "maesot",
  "nurse",
  "service",
  "arts",
] as const;

export type FacultyCode = (typeof FACULTY_CODES)[number];

export const FACULTY_LABEL: Record<FacultyCode, string> = {
  edu: "คณะครุศาสตร์",
  hum: "คณะมนุษยศาสตร์ฯ",
  mgmt: "คณะวิทยาการจัดการ",
  sci: "คณะวิทยาศาสตร์ฯ",
  tech: "คณะเทคโนโลยีอุตสาหกรรม",
  maesot: "มรภ.กพ.แม่สอด",
  nurse: "คณะพยาบาลศาสตร์",
  service: "สำนักบริการวิชาการ",
  arts: "สำนักศิลปะและวัฒนธรรม",
};

export type Allocations = Partial<Record<FacultyCode, number>>;

export interface ProjectNode {
  id: string;
  code: string;
  name: string;
  children?: ProjectNode[];
  allocations?: Allocations;
}

export type GovernmentDataMap = Record<GovernmentTabType, ProjectNode[] | null>;
