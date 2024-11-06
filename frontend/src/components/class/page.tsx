import { cn } from "@/utils/cn";
import React from "react";
import BackToPrevPage from "./backToPrevPage";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  px?: number;
  py?: number;
  returnTo?: boolean;
}

const BASE = "min-h-[80dvh] mx-auto mb-12 mt-12 ";

const Page = ({
  children,
  className,
  wide = false,
  returnTo = true,
}: PageProps) => {
  const base = wide ? BASE : cn(BASE, `container mx-auto `);
  return (
    <div className="container mx-auto flex items-center justify-center w-full">
      <div className="gap-6 p-6 mt-6 w-full ">
        <div className="mx-auto p-8 mb-10 max-w-5xl  ">
          {returnTo && <BackToPrevPage />}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
