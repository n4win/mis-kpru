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

export type NationalValue = number | null;

export interface NationalUnit {
  id: string;
  code: string;
  name: string;
  level: 0 | 1;
  v1: NationalValue;
  v2: NationalValue;
  v3: NationalValue;
  v4: NationalValue;
  v5: NationalValue;
}

export type NationalRowStatus = "empty" | "partial" | "complete";

export type NationalField = "v1" | "v2" | "v3" | "v4" | "v5";

export const NATIONAL_COLUMNS: {
  key: NationalField;
  num: string;
  title: string;
}[] = [
  {
    key: "v1",
    num: "(1)",
    title: "งบจัดสรร-บริหารหน่วยงาน ใช้งบยุทธโครงการที่ 13.4",
  },
  {
    key: "v2",
    num: "(2)",
    title: "งบพัฒนาบุคลากรสายสนับสนุน ใช้งบยุทธโครงการที่ 13.4",
  },
  { key: "v3", num: "(3)", title: "โครงการตามยุทธศาสตร์" },
  { key: "v4", num: "(4)", title: "งบพัฒนาวิชาการหลักสูตร (วัสดุการศึกษา)" },
  { key: "v5", num: "(5)", title: "เงินอุดหนุนรายหัวนักศึกษา (วัสดุการศึกษา)" },
];

export interface NationalTotals {
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
  A: number;
  B: number;
  all: number;
}
