import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CandyIcon} from "lucide-react";

type RecipeSymbol = {
  isActive: boolean;
  name: string;
};

export type SymbolArray = RecipeSymbol[];

type RecipeCardIconProps = {
  marks: SymbolArray;
  className?: string;
};

const RecipeCardIcons: React.FC<RecipeCardIconProps> = ({ marks, className }) => {
  return (
    <div className={className}>
      <TooltipProvider>
      {marks.map((mark) => (
        <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`cursor-pointer ${
              mark ? "text-primary" : "text-muted-foreground"
            } flex items-center justify-center`}
          >
            <CandyIcon className="w-6 h-6" />
          </span>
          </TooltipTrigger>
          <TooltipContent>
          <p>HIGH IN SUGAR</p>
        </TooltipContent>
        </Tooltip>
        ))}
    </TooltipProvider>

    </div>
  );
};


/*    old badge

{marks.map((mark) => (
          <Badge key={mark.name}  variant={mark.isActive ? "default" : "secondary"} className="rounded-full h-14 w-14 flex items-center justify-center overflow-hidden">
            <span className="whitespace-nowrap text-ellipsis text-xs"> {mark.name}</span>
          </Badge>
))}

        <Badge key={mark.name} variant={mark.isActive ? "default" : "secondary"}>
          {mark.name}
        </Badge>

        */
export default RecipeCardIcons;
