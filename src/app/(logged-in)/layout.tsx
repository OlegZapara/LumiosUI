import { getSession } from "@/actions/auth-actions";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function LoggedInLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session) notFound();
  return <>{children}</>;
}
