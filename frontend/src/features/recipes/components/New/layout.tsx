import { ReactNode } from "react";
import StepsProgressBar from "@/components/chart/StepsProgresBar";
import Page from "@/components/class/page";
import PageCard from "@/components/class/pageCard";
import FixedButtomBar from "@/components/class/fixedButtonBar";

interface RecipeLayoutProps {
  children: ReactNode;
  currentStep: number;

  onNext: () => void;
  onBack: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function RecipeLayout({
  children,
  currentStep,
  onNext,
  onBack,
  handleSubmit,
}: RecipeLayoutProps) {
  return (
    <Page>
      <PageCard className="mb-10">
        <StepsProgressBar
          currentStep={currentStep}
          tasks={[
            { title: "Recipe Details" },
            { title: "Ingredients" },
            { title: "Recipe Steps" },
            { title: "Review" },
          ]}
        />
      </PageCard>
      {children}

      {currentStep === 1 ? (
        <FixedButtomBar onClick={onNext} btmText="Save and Continue" />
      ) : currentStep === 4 ? (
        <FixedButtomBar
          onClick={handleSubmit}
          btmText="Upload Recipe"
          scndBtmText="Back"
          scndBtmOnClick={onBack}
        />
      ) : currentStep === 2 || currentStep === 3 ? (
        <FixedButtomBar
          onClick={onNext}
          btmText="Save and Continue"
          scndBtmText="Back"
          scndBtmOnClick={onBack}
        />
      ) : currentStep === 5 ? (
        <FixedButtomBar onClick={onBack} btmText="Back" />
      ) : null}
    </Page>
  );
}
