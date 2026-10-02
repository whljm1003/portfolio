import type { ReactNode } from "react";
import WorkspaceShell from "@/components/portfolio/WorkspaceShell";

export const dynamic = "force-static";

export default function HomeLayout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return <WorkspaceShell detail={detail}>{children}</WorkspaceShell>;
}
