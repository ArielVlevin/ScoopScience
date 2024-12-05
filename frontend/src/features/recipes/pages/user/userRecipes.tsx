import Page from "@/components/pages/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import { useAuth } from "@/contexts/AuthContext";
import ZeroStatePage from "@/components/pages/zeroStatePage";
import { FileAddIcon, PlusIcon } from "@/components/icons/icon";

import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useState } from "react";

import PageCard from "@/components/pages/pageCard";
import { Separator } from "@/components/ui/separator";
import { FetchRecipesParams } from "../../utils/fetchRecipes";
import { useFetchRecipes } from "../../hooks/useFetchRecipes";
import { CardGrid } from "../../components/CardGrid/CardGrid";

export default function UserRecipesPage() {
  const { user } = useAuth();

  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
    search: "",
    userId: String(user?._id),
  });

  const { data, isLoading, isError, error } = useFetchRecipes(filters);

  if (isLoading) return <Loading />;
  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  if (data?.recipes.length === 0)
    return (
      <ZeroStatePage
        title="You have no created recipes yet"
        description="Create new recipes and share them with the world."
        buttonText="Create new Recipe"
        buttonLink="/newRecipe"
        Icon={FileAddIcon}
      />
    );
  if (data?.recipes)
    return (
      <>
        <Page>
          <PageCard title="My Recipes">
            {/* ----add new recipe----- */}

            <Link to="/newRecipe">
              <Button className="w-40 h-12 text-md ">
                <PlusIcon className="size-4 mr-2" />
                New Recipe
              </Button>
            </Link>
            <Separator />

            {/* ----Cards----- */}
            <CardGrid
              recipes={data?.recipes}
              itemsPerPage={filters.limit!}
              type="editable"
            />
          </PageCard>
        </Page>
      </>
    );
}
