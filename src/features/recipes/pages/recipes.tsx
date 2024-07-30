import SortRecipesBar from "../components/sortRecipesBar";
import RecipeCard from "../components/recipeCardGrid/RecipeGrid";
import Page from "@/components/class/page";

export default function RecipesPage() {
  return (
    <Page wide>
      {/* ----Toolbar----- */}
      <div className="w-11/12 mx-auto">
        <SortRecipesBar />
      </div>
      {/* ----Cards----- */}
      <RecipeCard />
    </Page>
  );
}
