import { cn } from "@/utils/cn";
import React from "react";

interface PageBoxProps {
  children: React.ReactNode;
  className?: string;
}

const BASE =
  "bg-muted shadow-md rounded-lg p-4 mb-6  hover:scale-105 duration-500";

const PageBox = ({ children, className = "" }: PageBoxProps) => {
  return <div className={cn(BASE, className)}>{children}</div>;
};

export default PageBox;
