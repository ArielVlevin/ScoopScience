import { cn } from "@/utils/cn";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

const BASE = "min-h-[100dvh] mx-auto px-4 md:px-6 py-12";
const Page = ({ children, className, wide = false }: PageProps) => {
  const base = wide ? BASE : cn(BASE, "container");
  return <div className={cn(base, className)}>{children}</div>;
};

Page.defulteProps = {
  className: "",
};

export default Page;
