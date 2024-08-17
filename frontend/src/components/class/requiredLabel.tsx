import { cn } from "@/utils/cn";
import { Label } from "../ui";

interface RequiredLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const RequiredLabel = ({
  children,
  size,
  htmlFor,
  className = "font-medium",
}: RequiredLabelProps) => {
  return (
    <div className="flex items-center space-x-1">
      <Label htmlFor={htmlFor} className={cn(size, className)}>
        {children}
      </Label>
      <span className="text-sm font-medium leading-none text-red-500">*</span>
    </div>
  );
};

export default RequiredLabel;
