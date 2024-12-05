import React from "react";
import BackToPrevPage from "../class/navToPrevPage";
import { cn } from "@/utils/cn";
import { useTheme } from "@/contexts/ThemeProvider";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  returnTo?: boolean;
}

// Determine the gradient based on the theme

const Page = ({ children, className, returnTo = false }: PageProps) => {
  const { settings } = useTheme();

  return (
    <div className={cn(settings.gradient, "min-h-screen")}>
      <div
        className={cn(
          className,
          "container mx-auto flex items-center justify-center w-full "
        )}
      >
        <div className="gap-6 p-6 mt-6 w-full ">
          <div className="mx-auto p-8 mb-10 max-w-5xl ">
            {returnTo && BackToPrevPage()}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
