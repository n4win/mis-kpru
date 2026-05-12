import type { GovernmentDataMap, NationalUnit, ProjectNode } from "./types";

const strategicTree: ProjectNode[] = [
  {
    id: "n1",
    code: "1",
    name: "พัฒนาเศรษฐกิจฐานรากด้วยนวัตกรรมภายใต้ BCG Model (ด้านเศรษฐกิจ)",
    children: [
      {
        id: "n1-1",
        code: "2.1",
        name: "จัดสรรสำหรับการกิจประจำ",
        children: [
          {
            id: "n1-1-1",
            code: "2.1.1",
            name: "วารสารวิชาการของมหาวิทยาลัย",
            children: [
              {
                id: "n1-1-1-1",
                code: "1)",
                name: "วารสารวิจัยและพัฒนา 80,000 บาท",
                allocations: { hum: 80000 },
              },
              {
                id: "n1-1-1-2",
                code: "2)",
                name: "วารสารพิกุล 80,000 บาท",
                allocations: { hum: 80000 },
              },
              {
                id: "n1-1-1-3",
                code: "3)",
                name: "วารสารครุศาสตร์ 30,000 บาท",
                allocations: { edu: 30000 },
              },
              {
                id: "n1-1-1-4",
                code: "4)",
                name: "วารสารวิทยาการจัดการ 30,000 บาท",
                allocations: { mgmt: 30000 },
              },
              {
                id: "n1-1-1-5",
                code: "5)",
                name: "วารสารวิทยาศาสตร์ 30,000 บาท",
                allocations: { sci: 30000 },
              },
              {
                id: "n1-1-1-6",
                code: "6)",
                name: "วารสารศิลปะและวัฒนธรรม 30,000 บาท",
                allocations: { arts: 30000 },
              },
              {
                id: "n1-1-1-7",
                code: "7)",
                name: "วารสารคณะเทคโนโลยีอุตสาหกรรม 30,000 บาท",
                allocations: { tech: 30000 },
              },
            ],
          },
          {
            id: "n1-1-2",
            code: "2.1.2",
            name: "ประชาสัมพันธ์มหาวิทยาลัยและการแนะแนวศึกษาต่อ",
            allocations: {},
          },
          {
            id: "n1-1-3",
            code: "2.1.3",
            name: "บูรณาการพันธกิจระดับหลักสูตรเพื่อพัฒนาทักษะในศตวรรษที่ 21",
            children: [
              {
                id: "n1-1-3-1",
                code: "1)",
                name: "คณะครุศาสตร์ 10 สาขา/วิชาเอก",
                allocations: { edu: 250000 },
              },
              {
                id: "n1-1-3-2",
                code: "2)",
                name: "คณะมนุษยศาสตร์ฯ 11 สาขา/วิชาเอก",
                allocations: { hum: 275000 },
              },
              {
                id: "n1-1-3-3",
                code: "3)",
                name: "คณะวิทยาการจัดการ 8 สาขา/วิชาเอก",
                allocations: { mgmt: 200000 },
              },
              {
                id: "n1-1-3-4",
                code: "4)",
                name: "คณะวิทยาศาสตร์ฯ 10 สาขา/วิชาเอก",
                allocations: { sci: 250000 },
              },
              {
                id: "n1-1-3-5",
                code: "5)",
                name: "คณะเทคโนโลยีอุตสาหกรรม 8 สาขา/วิชาเอก",
                allocations: { tech: 200000 },
              },
              {
                id: "n1-1-3-6",
                code: "6)",
                name: "มรภ.กพ.แม่สอด 8 สาขา/วิชาเอก",
                allocations: { maesot: 200000 },
              },
              {
                id: "n1-1-3-7",
                code: "7)",
                name: "คณะพยาบาลศาสตร์ 1 สาขา/วิชาเอก",
                allocations: { nurse: 25000 },
              },
            ],
          },
          {
            id: "n1-1-4",
            code: "2.1.4",
            name: "ศูนย์วิทยาศาสตร์และวิทยาศาสตร์ประยุกต์",
            allocations: { sci: 400000 },
          },
          {
            id: "n1-1-5",
            code: "2.1.5",
            name: "สัปดาห์วิทยาศาสตร์แห่งชาติ",
            allocations: { sci: 200000 },
          },
          {
            id: "n1-1-6",
            code: "2.1.6",
            name: "พัฒนางานวิจัยและนวัตกรรมเพื่อการพัฒนาท้องถิ่น",
            allocations: {},
          },
        ],
      },
    ],
  },
];

export const GOVERNMENT_MOCK: GovernmentDataMap = {
  national: null,
  strategic: strategicTree,
};

export const NATIONAL_UNITS_MOCK: NationalUnit[] = [
  { id: "u1", code: "1", name: "คณะครุศาสตร์", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u2", code: "2", name: "คณะมนุษยศาสตร์และสังคมศาสตร์", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u3", code: "3", name: "คณะวิทยาการจัดการ", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u4", code: "4", name: "คณะวิทยาศาสตร์และเทคโนโลยี", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u4-1", code: "4.1", name: "ศูนย์วิทยาศาสตร์", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u5", code: "5", name: "คณะเทคโนโลยีอุตสาหกรรม", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6", code: "6", name: "สำนักงานอธิการบดี", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6-1", code: "6.1", name: "กองกลางและงานอื่นๆ", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6-2", code: "6.2", name: "กองพัฒนานักศึกษา", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6-3", code: "6.3", name: "กองนโยบายและแผน", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6-4", code: "6.4", name: "งานมาตรฐานและประกันคุณภาพ", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u6-5", code: "6.5", name: "งานวิเทศสัมพันธ์และกิจการอาเซียน", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u7", code: "7", name: "สำนักบริการวิชาการและจัดหารายได้", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u8", code: "8", name: "สถาบันวิจัยและพัฒนา", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u9", code: "9", name: "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u9-1", code: "9.1", name: "ศูนย์ภาษา (สอบภาษาอังกฤษ)", level: 1, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u10", code: "10", name: "สำนักส่งเสริมวิชาการและงานทะเบียน", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u11", code: "11", name: "สำนักศิลปะและวัฒนธรรม", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u12", code: "12", name: "สภาคณาจารย์และข้าราชการ", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u13", code: "13", name: "หน่วยตรวจสอบภายใน", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u14", code: "14", name: "คณะพยาบาลศาสตร์", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u15", code: "15", name: "มหาวิทยาลัยราชภัฏกำแพงเพชร แม่สอด", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
  { id: "u16", code: "16", name: "บริหารจัดการส่วนกลางของมหาวิทยาลัย", level: 0, v1: null, v2: null, v3: null, v4: null, v5: null },
];
