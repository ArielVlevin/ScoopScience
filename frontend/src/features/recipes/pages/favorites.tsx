import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import { FileHeartIcon } from "@/components/icons/icon";
import ZeroStatePage from "@/components/class/zeroStatePage";
import {
  LoadMoreButton,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { useState } from "react";
import PageCard from "@/components/class/pageCard";

export default function FavoritesRecipesPage() {
  const { user } = useAuth();

  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.favorites || []
  );

  if (recipes.length === 0)
    return (
      <ZeroStatePage
        title="You have no favorite recipes yet"
        description="Discover new recipes and save your favorites to access them easily."
        buttonText="Discover Recipes"
        buttonLink="/recipes"
        Icon={FileHeartIcon}
      />
    );

  if (isLoading) return <Loading />;
  if (isError && errors) {
    const msg = errors.map((error) => {
      error?.message;
    });
    const combinedErrors: string = msg.join("\n;; ");

    return <ErrorPage error={combinedErrors} />;
  }

  return (
    <Page>
      <PageCard title="My Favorites">
        <RecipeGridList
          recipes={recipes}
          itemsPerPage={itemsPerPage}
          isFavoriteCard
        />
        <LoadMoreButton
          className="mb-12"
          itemsPerPage={itemsPerPage}
          totalRecipes={recipes.length}
          onLoadMore={handleLoadMore}
        />
      </PageCard>
    </Page>
  );
}
