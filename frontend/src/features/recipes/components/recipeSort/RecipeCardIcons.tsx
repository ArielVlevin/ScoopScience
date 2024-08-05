import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SpecialMarks } from "@/features/recipes/types/specialMarks";
import { CandyIcon } from "lucide-react";
type RecipeCardIconProps = {
  marks: SpecialMarks;
  className?: string;
};

const RecipeCardIcons: React.FC<RecipeCardIconProps> = ({
  marks,
  className,
}) => {
  return (
    <div className={className}>
      <TooltipProvider>
        {Object.entries(marks).map(([mark]) => (
          <li key={mark}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={`cursor-pointer ${
                    mark ? "text-primary" : "text-muted-foreground"
                  } flex items-center justify-center`}
                >
                  <CandyIcon className="w-6 h-6" />{" "}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>HIGH IN SUGAR</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default RecipeCardIcons;
