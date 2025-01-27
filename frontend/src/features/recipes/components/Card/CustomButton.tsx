import { Button } from "@/components/ui";
import React, { forwardRef } from "react";

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "orange" | "green" | "blue" | "red";
  className?: string;
}

// Use React.forwardRef to handle refs properly
const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ onClick, children, color = "green", className = "" }, ref) => {
    const colorClasses = {
      orange:
        "bg-orange-700 hover:bg-orange-500 dark:bg-orange-900 dark:hover:bg-orange-700",
      green:
        "bg-green-700 hover:bg-green-500 dark:bg-green-900 dark:hover:bg-green-700",
      blue: "bg-blue-700 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-700",
      red: "bg-red-700 hover:bg-red-500 dark:bg-red-900 dark:hover:bg-red-700",
    };

    return (
      <Button
        ref={ref} // Pass the ref down to the Button component
        onClick={onClick}
        className={`w-full text-white ${colorClasses[color]} ${className}`}
      >
        {children}
      </Button>
    );
  }
);

// Add a displayName for debugging purposes
CustomButton.displayName = "CustomButton";

export default CustomButton;
