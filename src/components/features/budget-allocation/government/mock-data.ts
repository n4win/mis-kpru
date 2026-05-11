import type { GovernmentDataMap, ProjectNode } from "./types";

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
