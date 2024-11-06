import React from "react";
import { Button } from "@/components/ui/button";

interface CardButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: "orange" | "green" | "blue" | "red"; // Add more colors as needed
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  onClick,
  children,
  color = "green", // Default color
  className = "",
}) => {
  // Define color classes based on the color prop
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
      onClick={onClick}
      className={`w-full text-white ${colorClasses[color]} ${className}`}
    >
      {children}
    </Button>
  );
};

export default CardButton;
