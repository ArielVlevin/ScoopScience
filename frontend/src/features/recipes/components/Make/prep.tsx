import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/pages/pageCard";
import PageBox from "@/components/pages/pageBox";
import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/utils/cn";

const steps = [
  {
    description: "Mix the heavy cream with vanilla in a large bowl.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    description: "Add sugar and salt, then whisk until fully combined.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    description:
      "Pour the mixture into an ice cream maker and churn according to manufacturer's instructions.",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const PreparationSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { settings } = useTheme();

  return (
    <PageBox className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Preparation Steps</h2>
      <div>
        <p className="text-lg font-semibold mb-2">
          Step {currentStep + 1}/{steps.length}
        </p>
        <div className="">
          <img
            src={steps[currentStep].image || "/placeholder.svg"}
            alt={`Step ${currentStep + 1}`}
            className="rounded-lg shadow-md mb-4 justify-center	size-[450px]"
          />
          <p className="mb-4">{steps[currentStep].description}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </PageBox>
  );
};

export default PreparationSteps;
