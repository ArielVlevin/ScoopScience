import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

interface DescribeProps {
  children: ReactNode;
  className?: string;
}

const Describe: React.FC<DescribeProps> = ({ children, className }) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    >
      {children}
    </p>
  );
};

export default Describe;
