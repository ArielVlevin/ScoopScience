import { cn } from "@/utils/cn";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

const BASE = "min-h-[80dvh] mx-auto px-4 md:px-6 py-12";
const Page = ({ children, className = "", wide = false }: PageProps) => {
  const base = wide ? BASE : cn(BASE, "container");
  return (
    <div className={cn(base, className)}>
      <div className="gap-6 mt-6 bg-muted rounded-lg p-6  h-full items-center justify-center drop-shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Page;
