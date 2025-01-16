import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/utils/cn";
import React from "react";

interface PageBoxProps {
  children: React.ReactNode;
  className?: string;
  pop?: boolean;
}

const PageBox = ({ children, className = "", pop = false }: PageBoxProps) => {
  const { settings } = useTheme();

  return (
    <div
      className={cn(
        settings.pageBox,
        "shadow-md rounded-lg p-4 mb-6 ",
        pop && " hover:scale-105 duration-500",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageBox;
