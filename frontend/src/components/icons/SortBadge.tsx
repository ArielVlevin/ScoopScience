/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui";

interface SortBadgeProps<T extends Record<string, any>> {
  filterKey: keyof T & string; // Ensure the key is a string
  options: string[]; // Array of options for the badges
  filters: T; // The current filter object
  setFilters: React.Dispatch<React.SetStateAction<T>>; // Function to update filters
  className?: string; // Additional class names for the wrapper
}

const SortBadge = <T extends Record<string, any>>({
  filterKey,
  options,
  filters,
  setFilters,
  className,
}: SortBadgeProps<T>) => {
  const handleBadgeClick = (option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: option,
      page: 1, // Reset to the first page
    }));
  };

  return (
    <div className={cn(className, "flex gap-2 mb-4")}>
      {options.map((option) => (
        <Badge
          key={option}
          onClick={() => handleBadgeClick(option)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-transform duration-200",
            filters[filterKey] === option
              ? "bg-primary/80 scale-105 shadow-lg"
              : "bg-background text-gray-600 hover:bg-gray-300 hover:shadow-lg hover:scale-105"
          )}
        >
          {option}
        </Badge>
      ))}
    </div>
  );
};

export default SortBadge;
