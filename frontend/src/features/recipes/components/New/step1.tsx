import {
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Recipe, typeOptions } from "@/types";
import Grid from "@/components/class/grid";
import RequiredLabel from "@/components/class/requiredLabel";
import PageCard from "@/components/pages/pageCard";
import { useTheme } from "@/contexts/ThemeProvider";

type Step1Props = {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  isAdditionalSelectVisible: boolean;
  setIsAdditionalSelectVisible: (checked: boolean) => void;
  recipes: Recipe[];
  handleAdditionalSelectChange: (value: string) => void;
};

export default function Step1({
  formData,
  handleInputChange,
  handleSelectChange,
  isAdditionalSelectVisible,
  setIsAdditionalSelectVisible,
  recipes,
  handleAdditionalSelectChange,
}: Step1Props) {
  const { settings } = useTheme();

  return (
    <>
      <PageCard title="Recipe Details" className="mb-6">
        <Grid gap={2}>
          <RequiredLabel htmlFor="name" className={settings.inputTitle}>
            Recipe Name
          </RequiredLabel>
          <Input
            id="name"
            className={settings.inputText}
            placeholder="Enter recipe name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid gap={2}>
          <RequiredLabel htmlFor="recipeKind" className={settings.inputTitle}>
            Recipe Category
          </RequiredLabel>
          <Select
            name="recipeKind"
            value={formData.recipeKind}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className={settings.inputText}>
              <SelectValue placeholder="Select recipe kind" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Grid>
      </PageCard>

      <PageCard title="Recipe Import">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isAdditionalSelectVisible}
            className={settings.inputText}
            onCheckedChange={(checked) =>
              setIsAdditionalSelectVisible(checked as boolean)
            }
          />
          <Label className={settings.inputTitle}>
            Import ice cream base recipe
          </Label>
        </div>
        {isAdditionalSelectVisible && (
          <Grid gap={2}>
            <Label htmlFor="additionalSelect" className={settings.inputTitle}>
              {formData.recipeKind} Recipes
            </Label>
            <Select
              name="additionalSelect"
              onValueChange={handleAdditionalSelectChange}
            >
              <SelectTrigger className={settings.inputText}>
                <SelectValue placeholder="Select additional option" />
              </SelectTrigger>
              <SelectContent>
                {recipes.map((recipe) => (
                  <SelectItem
                    key={recipe._id}
                    value={
                      recipe._id?.toString() || recipe.recipeData.recipeName
                    }
                  >
                    {recipe.recipeData.recipeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Grid>
        )}
      </PageCard>
    </>
  );
}
