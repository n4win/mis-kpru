import React from "react";
import { ThemeIcon } from "@mantine/core";
import {
  IconUsers,
  IconDatabase,
  IconClipboardList,
  IconMoneybag,
  IconDashboard,
  IconCurrencyDollar,
  IconReceipt,
  Icon123,
} from "@tabler/icons-react";

interface AppMenu {
  MenuAdmin: MenuItem[];
  //   MenuUser: MenuItem[];
}

export interface MenuItem {
  title: string;
  path?: string;
  icon?: (active: boolean) => React.ReactNode;
  sub?: MenuItem[];
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
}

const Icon = (icon: React.ElementType) => (active: boolean) =>
  React.createElement(
    ThemeIcon,
    { variant: active ? "subtle" : "light", size: 30 },
    React.createElement(icon, { size: 20 }),
  );

export const Menu: AppMenu = {
  MenuAdmin: [
    {
      title: "แดชบอร์ด",
      path: "/admin",
      icon: Icon(IconDashboard),
    },
    {
      title: "ข้อมูลทั่วไป",
      icon: Icon(IconDatabase),
      disabled: true,
      sub: [
        {
          title: "แผนงาน",
          path: "/admin/master/plan",
        },
        {
          title: "ผลผลิต",
          path: "/admin/master/product",
        },
        {
          title: "งาน (มหาวิทยาลัยฯ)",
          path: "/admin/master/work-university",
          divider: true,
        },
        {
          title: "ประเด็นยุทธศาสตร์",
          path: "/admin/master/strategic",
        },
        {
          title: "กลยุทธ์",
          path: "/admin/master/tactic",
        },
        {
          title: "แนวทาง/มาตรการจัดสรร งปม.",
          path: "/admin/master/guideline",
        },
        {
          title: "ตัวชี้วัด",
          path: "/admin/master/kpi",
          divider: true,
        },
        {
          title: "สถานภาพ",
          path: "/admin/master/status",
        },
        {
          title: "ประเภทโครงการ",
          path: "/admin/master/project-type",
        },
        {
          title: "งบประมาณ",
          path: "/admin/master/budget",
        },
        {
          title: "หมวดเงิน",
          path: "/admin/master/money-category",
        },
        {
          title: "การบูรณาการเรียน/การสอน ในหลักสูตร",
          path: "/admin/master/learn-integration",
        },
        {
          title: "เป้าหมายการพัฒนาที่ยั่งยืน (SDGs)",
          path: "/admin/master/sdg",
        },
        {
          title: "ค่านิยม",
          path: "/admin/master/popular",
        },
        {
          title: "อัตลักษณ์ & เอกลักษณ์",
          path: "/admin/master/identity-unique",
        },
        {
          title: "การบูรณาการงาน",
          path: "/admin/master/work-integration",
        },
        {
          title: "ระดับ",
          path: "/admin/master/level",
        },
        {
          title: "หน่วยนับ",
          path: "/admin/master/count-unit",
        },
        {
          title: "ประเภทดัชนีตัวชี้วัดความสำเร็จ",
          path: "/admin/master/type-indicator",
        },
      ],
    },
    {
      title: "ข้อมูลผู้ใช้งาน",
      path: "/admin/user",
      disabled: true,
      icon: Icon(IconUsers),
    },
    {
      title: "ข้อมูลหน่วยงานtest",
      path: "/admin/department",
      disabled: true,
      icon: Icon(Icon123),
    },
    {
      title: "จัดสรรงบประมาณ",
      icon: Icon(IconMoneybag),
      sub: [
        {
          title: "เงินรายได้",
          path: "/admin/budget-allocation/revenue",
        },
        {
          title: "งบแผ่นดิน",
          path: "/admin/budget-allocation/government",
        },
      ],
    },
  ],
  //   MenuUser: [
  //     {
  //       title: "บันทึการซื้อจ้าง",
  //       icon: Icon(IconReceipt),
  //       sub: [
  //         {
  //           title: "การบันทึก Form PS1",
  //           path: "/procurement",
  //         },
  //         {
  //           title: "การบันทึก Form PS1 (ครุภัณฑ์)",
  //           path: "/",
  //           disabled: true,
  //         },
  //       ],
  //     },
  //     {
  //       title: "บันทึกโครงการ",
  //       icon: Icon(IconClipboardList),
  //       sub: [
  //         {
  //           title: "บันทึกโครงการ (2569)",
  //           path: "/project/record",
  //         },
  //         {
  //           title: "รายงานสรุปโครงการ (2569)",
  //           path: "/project/reportproject",
  //           disabled: true,
  //         },
  //         {
  //           title: "บันทึกเอกสารสะสมงาน",
  //           path: "/project/recorddoc",
  //           disabled: true,
  //         },
  //         {
  //           title: "บันทึกผลการดำเนินงาน (2568)",
  //           path: "/project/recordresult",
  //           disabled: true,
  //         },
  //         {
  //           title: "รายงานสรุปผลดำเนินงาน (2568)",
  //           path: "/project/reportsummary",
  //           disabled: true,
  //         },
  //       ],
  //     },
  //   ],
};
