import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";

type StepProgressBarProps = {
  currentStep: number;
  tasks?: { title: string }[];
};
export default function StepsProgressBar({
  currentStep,
  tasks = [
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
    { title: "Step 4" },
  ],
}: StepProgressBarProps) {
  const progress = 33 * (currentStep - 1); // This would typically be a state variable or prop

  //const currentStep = Math.ceil((progress / 100) * tasks.length);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="relative pt-4">
        <Progress value={progress} className="h-2" />
        <div className="absolute top-0 left-0 w-full flex justify-between">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ left: `${(index / (tasks.length - 1)) * 100}%` }}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-4 flex items-center justify-center text-xs font-bold",
                  index + 1 < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index + 1 === currentStep
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground bg-background text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className=" text-sm text-center whitespace-nowrap">
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
