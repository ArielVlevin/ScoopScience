import { cn } from "@/utils/cn";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  px?: number;
  py?: number;
}

const BASE = "min-h-[80dvh] mx-auto mb-12 mt-12 ";

const Page = ({ children, className, wide = false }: PageProps) => {
  const base = wide ? BASE : cn(BASE, `container mx-auto `);
  return (
    <div className={cn(base, className)}>
      <div className="gap-6 p-6 mt-6  bg-muted rounded-lg  h-full items-center justify-center drop-shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Page;
