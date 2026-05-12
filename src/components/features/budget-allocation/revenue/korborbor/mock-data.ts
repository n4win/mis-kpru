import type { KBCampusData, KBStudentCounts } from "./types";

const empty = (): KBStudentCounts => ({
  "66": null,
  "67": null,
  "68": null,
  "69": null,
  "70": null,
});

export const KB_CAMPUS_MOCK: KBCampusData[] = [
  {
    key: "kamphaeng",
    label: "กำแพงเพชร",
    fees: [
      { id: "kf1", label: "ค่าบำรุงการศึกษา", amount: 3500 },
      { id: "kf2", label: "ค่าลงทะเบียน", amount: 1000 },
      { id: "kf3", label: "ค่าธรรมเนียมอื่น", amount: 500 },
    ],
    rows: [
      {
        id: "kk-h1",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        isFacultyHeader: true,
        studentCounts: empty(),
        perHeadAmount: 0,
      },
      {
        id: "kk-1",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        program: "นิติศาสตร์",
        studentCounts: { "66": 13, "67": 36, "68": 24, "69": 45, "70": null },
        perHeadAmount: 0,
      },
      {
        id: "kk-2",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        program: "รัฐประศาสนศาสตร์",
        studentCounts: { "66": 13, "67": 18, "68": 24, "69": 23, "70": null },
        perHeadAmount: 0,
      },
      {
        id: "kk-h2",
        faculty: "คณะวิทยาการจัดการ",
        isFacultyHeader: true,
        studentCounts: empty(),
        perHeadAmount: 0,
      },
      {
        id: "kk-3",
        faculty: "คณะวิทยาการจัดการ",
        program: "บริหารธุรกิจ (การจัดการธุรกิจ)",
        studentCounts: { "66": 8, "67": 26, "68": 10, "69": 23, "70": null },
        perHeadAmount: 0,
      },
      {
        id: "kk-4",
        faculty: "คณะวิทยาการจัดการ",
        program: "การบัญชี (เทียบโอน)",
        studentCounts: { "66": 8, "67": 7, "68": null, "69": null, "70": null },
        perHeadAmount: 0,
      },
    ],
  },
  {
    key: "maesot",
    label: "แม่สอด",
    fees: [
      { id: "mf1", label: "ค่าบำรุงการศึกษา", amount: 3500 },
      { id: "mf2", label: "ค่าลงทะเบียน", amount: 1000 },
      { id: "mf3", label: "ค่าธรรมเนียมอื่น", amount: 500 },
    ],
    rows: [
      {
        id: "ms-h1",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        isFacultyHeader: true,
        studentCounts: empty(),
        perHeadAmount: 0,
      },
      {
        id: "ms-1",
        faculty: "คณะมนุษยศาสตร์และสังคมศาสตร์",
        program: "รัฐประศาสนศาสตร์",
        studentCounts: { "66": 0, "67": 8, "68": 9, "69": 12, "70": null },
        perHeadAmount: 0,
      },
      {
        id: "ms-h2",
        faculty: "คณะวิทยาการจัดการ",
        isFacultyHeader: true,
        studentCounts: empty(),
        perHeadAmount: 0,
      },
      {
        id: "ms-2",
        faculty: "คณะวิทยาการจัดการ",
        program: "การบัญชี",
        studentCounts: { "66": 10, "67": 25, "68": 31, "69": 34, "70": null },
        perHeadAmount: 0,
      },
      {
        id: "ms-3",
        faculty: "คณะวิทยาการจัดการ",
        program: "บริหารธุรกิจ (การจัดการธุรกิจ)",
        studentCounts: { "66": 10, "67": 13, "68": 9, "69": 19, "70": null },
        perHeadAmount: 0,
      },
    ],
  },
  {
    key: "foreign",
    label: "นักศึกษาต่างชาติ",
    fees: [{ id: "ff1", label: "ค่าธรรมเนียม (ต่อเทอม)", amount: 10000 }],
    rows: [
      {
        id: "fo-1",
        faculty: "ต่างชาติ",
        program: "ภาษาไทย",
        studentCounts: { "66": null, "67": null, "68": 11, "69": 84, "70": null },
        perHeadAmount: 0,
      },
    ],
  },
];
