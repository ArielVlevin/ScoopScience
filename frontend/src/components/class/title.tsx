import { cn } from "@/utils/cn";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return (
    <p
      className={cn("text-3xl font-sans  font-medium text-primary", className)}
    >
      {children}
    </p>
  );
};

export default Title;
