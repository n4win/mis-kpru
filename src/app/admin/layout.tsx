import { MainLayout } from "@/components/layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
