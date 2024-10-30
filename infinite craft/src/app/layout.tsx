import LayoutComponent from "@/components/common/Layout";
import React from "react";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutComponent>{children}</LayoutComponent>;
}
