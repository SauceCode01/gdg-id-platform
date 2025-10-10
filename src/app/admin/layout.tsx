import AdminRoute from "@/components/Guards/AdminRoute";
import ProtectedRoute from "@/components/Guards/ProtectedRoute";
import React from "react";

export const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminRoute>{children}</AdminRoute>;
};

export default layout;