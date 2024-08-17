import { cn } from "@/utils/cn";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const BASE =
  "bg-background shadow-md rounded-lg p-4 mb-6  hover:scale-105 duration-500";

const Box = ({ children, className = "" }: PageProps) => {
  return <div className={cn(BASE, className)}>{children}</div>;
};

export default Box;
