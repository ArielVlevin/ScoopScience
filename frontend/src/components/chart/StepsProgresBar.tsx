import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";

type StepProgressBarProps = {
  className?: string;
  currentStep: number;
  tasks?: { title: string }[];
  colorScheme?: "default" | "green" | "red" | "blue" | "lights";
};

const colorSchemes = {
  default: {
    primary: "border-primary bg-primary text-primary-foreground",
    done: "border-primary bg-background text-primary",
    unVisited: "border-muted-foreground bg-background text-muted-foreground",
    unvisitedBar: "bg-background",
    indicatorColor: "bg-primary",
    unvisitedText: "text-muted-foreground",
    doneText: "text-primary",
    primaryText: "text-primary",
  },
  blue: {
    primary: "border-blue-500 bg-blue-500 text-white",
    done: "bg-blue-300 text-blue-800",
    unVisited: "border-gray-300 bg-gray-100 text-gray-500",
    unvisitedBar: "bg-gray-300",
    indicatorColor: "bg-blue-500",
    unvisitedText: "text-blue-500",
    doneText: "text-blue-800",
    primaryText: "text-blue-500",
  },
  green: {
    primary: "border-green-500 bg-green-500 text-white",
    done: "bg-green-300 text-green-800",
    unVisited: "border-gray-300 bg-gray-100 text-gray-500",
    unvisitedBar: "bg-gray-300",
    indicatorColor: "bg-green-500",
    unvisitedText: "text-green-500",
    doneText: "text-green-800",
    primaryText: "text-green-500",
  },
  red: {
    primary: "border-red-500 bg-red-500 text-whitse",
    done: "bg-red-300 text-red-800",
    unVisited: "border-gray-300 bg-gray-100 text-gray-500",
    unvisitedBar: "bg-gray-300",
    indicatorColor: "bg-red-500",
    unvisitedText: "text-red-500",
    doneText: "text-red-800",
    primaryText: "text-red-500",
  },
  lights: {
    primary:
      "border-orange-500 bg-gray-300 text-orange-500 dark:bg-orange-500 dark:text-black",
    done: "border-green-800 bg-green-800 text-white dark:border-green-900 dark:bg-green-900 dark:text-black",
    unVisited:
      "border-gray-600 bg-gray-200 text-gray-600 dark:border-gray-300 dark:bg-gray-300 dark:text-black",
    unvisitedBar: "bg-gray-300 dark:bg-gray-300",
    indicatorColor: "bg-green-800 dark:bg-green-900",
    unvisitedText: "text-gray-600 dark:text-gray-300",
    doneText: "text-green-800 dark:text-green-900",
    primaryText: "text-orange-500 dark:text-orange-500",
  },
};

export default function StepsProgressBar({
  className,
  currentStep,
  tasks = [
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
    { title: "Step 4" },
  ],
  colorScheme = "default",
}: StepProgressBarProps) {
  const progress = 33.3 * (currentStep - 1);
  const colors = colorSchemes[colorScheme];

  //const currentStep = Math.ceil((progress / 100) * tasks.length);

  return (
    <div className={cn("w-full max-w-lg mx-auto space-y-6", className)}>
      <div className="relative pt-4">
        <Progress
          value={progress}
          className="h-2 "
          unvisitedColor={colors.unvisitedBar}
          indicatorColor={colors.indicatorColor}
        />
        <div className="absolute top-0 w-full flex">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{
                position: "absolute",
                left: `${(index / (tasks.length - 1)) * 100}%`,
                transform: "translateX(-50%)", // Center each step based on its middle point
              }}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-4 flex items-center justify-center text-sm font-bold",
                  index + 1 < currentStep
                    ? colors.done // Completed step color
                    : index + 1 === currentStep
                    ? colors.primary // Current step color
                    : colors.unVisited // Unvisited step color
                )}
              >
                {index + 1}
              </div>
              {/* Title below each step */}
              <span
                className={cn(
                  "mt-2 text-sm text-center font-medium",
                  index + 1 < currentStep
                    ? colors.doneText
                    : index + 1 === currentStep
                    ? colors.primaryText
                    : colors.unvisitedText
                )}
              >
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
