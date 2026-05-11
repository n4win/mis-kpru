import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export async function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
