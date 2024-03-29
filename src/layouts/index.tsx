import { ReactNode } from "react";
import AuthGuard from "../guards/AuthGuard";
import DashboardLayout from "./dashboard";
import LogoOnlyLayout from "./LogoOnlyLayout";

type Props = {
  children: ReactNode;
  variant?: "main" | "dashboard" | "logoOnly";
};
export default function Layout({ variant = "dashboard", children }: Props) {
  if (variant == "logoOnly") {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }
  if (variant == "main") {
    return null;
  }
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>;
    </AuthGuard>
  );
}
