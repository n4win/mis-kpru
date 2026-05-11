import { HeaderAdmin } from "@/components/ui";
import { RevenueTabs } from "@/components/features/budget-allocation/revenue";

export default function Page() {
  return (
    <>
      <HeaderAdmin
        title={"เงินรายได้"}
        description={"จัดการข้อมูลเงินรายได้ของมหาวิทยาลัย"}
        breadcrumbs={[
          { label: "แดชบอร์ด", href: "/admin" },
          { label: "จัดสรรงบประมาณ" },
          { label: "เงินรายได้" },
        ]}
      />
      <RevenueTabs />
    </>
  );
}
