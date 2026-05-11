import { HeaderAdmin } from "@/components/ui";
import { GovernmentTabs } from "@/components/features/budget-allocation/government";

export default function Page() {
  return (
    <>
      <HeaderAdmin
        title={"งบแผ่นดิน"}
        description={"จัดการการจัดสรรงบประมาณแผ่นดินและงบยุทธศาสตร์"}
        breadcrumbs={[
          { label: "แดชบอร์ด", href: "/admin" },
          { label: "จัดสรรงบประมาณ" },
          { label: "งบแผ่นดิน" },
        ]}
      />
      <GovernmentTabs />
    </>
  );
}
