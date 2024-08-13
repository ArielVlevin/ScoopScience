import { cn } from "@/utils/cn";
import React from "react";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  smcols?: number;
  mdcols?: number;
  lgcols?: number;
  gap?: number;
}

const Grid = ({
  children,
  className = "",
  smcols,
  mdcols = 1,
  lgcols,
  gap = 4,
}: GridProps) => {
  const smCols = smcols ?? mdcols;
  const lgCols = lgcols ?? mdcols;

  return (
    <div
      className={cn(
        `grid sm:grid-cols-${smCols} md:grid-cols-${mdcols} lg:grid-cols-${lgCols} gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
