import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/utils/cn";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  const { settings } = useTheme();

  return <p className={cn(settings.title, className)}>{children}</p>;
};

export default Title;
