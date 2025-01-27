import { Input, Textarea } from "@/components/ui";
import Grid from "@/components/class/grid";
import PageCard from "@/components/pages/pageCard";
import RequiredLabel from "@/components/class/requiredLabel";
import { useTheme } from "@/contexts/ThemeProvider";

type Step3Props = {
  formData: {
    description: string;
    instructions: string;
    cookingTime: string;
    prepTime: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Step3({
  formData,
  handleInputChange,
  handleFileChange,
}: Step3Props) {
  const { settings } = useTheme();

  return (
    <>
      <PageCard title="Recipe Description" className="mb-6">
        <Grid gap={2}>
          <RequiredLabel htmlFor="description" className={settings.inputTitle}>
            Description
          </RequiredLabel>
          <Textarea
            className={settings.inputText}
            id="description"
            placeholder="Enter a brief description of the recipe"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid gap={2}>
          <RequiredLabel htmlFor="instructions" className={settings.inputTitle}>
            Instructions
          </RequiredLabel>
          <Textarea
            className={settings.inputText}
            id="instructions"
            placeholder="Enter step-by-step instructions"
            rows={6}
            value={formData.instructions}
            onChange={handleInputChange}
          />
        </Grid>
        <div className="grid grid-cols-2 gap-4">
          <Grid gap={2}>
            <RequiredLabel
              htmlFor="cookingTime"
              className={settings.inputTitle}
            >
              Cooking Time (minutes)
            </RequiredLabel>
            <Input
              className={settings.inputText}
              id="cookingTime"
              type="number"
              placeholder="30"
              value={formData.cookingTime}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid gap={2}>
            <RequiredLabel htmlFor="prepTime" className={settings.inputTitle}>
              Preparation Time (minutes)
            </RequiredLabel>
            <Input
              className={settings.inputText}
              id="prepTime"
              type="number"
              placeholder="15"
              value={formData.prepTime}
              onChange={handleInputChange}
            />
          </Grid>
        </div>
      </PageCard>
      <PageCard title="Photo">
        <Input
          type="file"
          className={settings.inputText}
          onChange={handleFileChange}
        />
      </PageCard>
    </>
  );
}
