import { useRecipeForm } from "../../hooks/useRecipeForm";
import { useState } from "react";
import StepsProgressBar from "@/components/chart/StepsProgresBar";
import FixedButtomBar from "@/components/class/fixedButtonBar";
import RecipeRecipePreview from "../../components/New/recipePreview";
import { ContinueRecipeModal } from "../../components/New/continueModal";
import Page from "@/components/class/page";
import PageCard from "@/components/class/pageCard";

import Step1 from "../../components/New/step1";
import Step2 from "../../components/New/step2";
import Step3 from "../../components/New/step3";
import Step4 from "../../components/New/step4";

export default function NewRecipe() {
  const {
    recipes,
    isAdditionalSelectVisible,
    setIsAdditionalSelectVisible,
    currentStep,
    handleNext,
    handleBack,
    formData,
    handleInputChange,
    handleAdditionalSelectChange,
    handleFileChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
    rows,
    setRows,
    totals,
    setTotals,
    recipe,
    isModalOpen,
    handleContinuePrevious,
    handleNew,
  } = useRecipeForm();

  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && (
        <ContinueRecipeModal
          isOpen={isModalOpen}
          onContinue={handleContinuePrevious}
          onNew={handleNew}
        />
      )}
      <Page>
        <PageCard className="mb-10">
          <StepsProgressBar
            colorScheme="lights"
            className="mb-8"
            currentStep={currentStep}
            tasks={[
              { title: "Recipe Details" },
              { title: "Ingredients" },
              { title: "Recipe Steps" },
              { title: "Review" },
            ]}
          />
        </PageCard>
        {/* Step 1 */}

        <form>
          {currentStep === 1 && (
            <Step1
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              isAdditionalSelectVisible={isAdditionalSelectVisible}
              setIsAdditionalSelectVisible={setIsAdditionalSelectVisible}
              recipes={recipes}
              handleAdditionalSelectChange={handleAdditionalSelectChange}
            />
          )}

          {currentStep === 2 && (
            <Step2
              rows={rows}
              setRows={setRows}
              totals={totals}
              setTotals={setTotals}
              isAddingIngredient={isAddingIngredient}
              setIsAddingIngredient={setIsAddingIngredient}
            />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />
          )}
          {currentStep === 4 && (
            <Step4
              formData={formData}
              handleSwitchChange={handleSwitchChange}
              handleNext={handleNext}
            />
          )}
        </form>
        {currentStep === 5 && <RecipeRecipePreview recipe={recipe} />}
        {currentStep === 1 ? (
          <FixedButtomBar onClick={handleNext} btmText="Save and Continue" />
        ) : currentStep === 4 ? (
          <FixedButtomBar
            onClick={handleSubmit}
            btmText="Upload Recipe"
            scndBtmText="Back"
            scndBtmOnClick={handleBack}
          />
        ) : currentStep === 2 || currentStep === 3 ? (
          <FixedButtomBar
            onClick={handleNext}
            btmText="Save and Continue"
            scndBtmText="Back"
            scndBtmOnClick={handleBack}
          />
        ) : currentStep === 5 ? (
          <FixedButtomBar onClick={handleBack} btmText="Back" />
        ) : null}
      </Page>
    </>
  );
}
