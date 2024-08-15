import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import RecipeGrid from "../components/recipeCard/RecipeGrid";
import ErrorPage from "@/pages/error";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ZeroStatePage from "@/components/class/zeroStatePage";
import { FileHeartIcon } from "@/components/icons/icon";
import {
  LoadMoreButton,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";

export default function UserFavoritesRecipesPage() {
  const { isAuthenticated, user } = useAuth();

  const { userName } = useParams<{ userName: string }>();

  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };
  let user_id = "";

  useEffect(() => {
    if (!userName) {
      return;
    }
    if (isAuthenticated && user && userName === user.username) {
      user_id = user._id;
    } else if (isAuthenticated && user && userName !== user.username) {
      user_id = userName || "";
    }
  }, [isAuthenticated, user, userName]);

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.favorites || []
  );

  if (user?.favorites.length === 0)
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
    <>
      <Page>
        {/* ----Cards----- */}

        <RecipeGridList
          recipes={recipes}
          itemsPerPage={itemsPerPage}
          isFavoriteCard
        />
      </Page>
      <LoadMoreButton
        className="mb-12"
        itemsPerPage={itemsPerPage}
        totalRecipes={recipes.length}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
