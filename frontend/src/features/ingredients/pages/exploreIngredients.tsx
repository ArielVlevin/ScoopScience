import { useNavigate } from "react-router-dom";
import Loading from "@/pages/loading.tsx";
import ErrorPage from "@/pages/error.tsx";
import Grid from "@/components/class/grid";
import PageCard from "@/components/pages/pageCard";
import { IngredientCategory } from "../types";
import IngredientGridIcon from "../components/ingredientGridIcon";
import { useFetchIngredientsByCategory } from "../hooks/useFetchIngredientsByCategory";
import IngredientDialog from "../components/ingredientDialog";
import PageWithDialog from "@/components/pages/pageWithDialog";

const FETCH_LIMIT = 11;

export default function ExploreIngredientsPage() {
  const {
    data: ingredientsByCategory,
    isLoading,
    isError,
    error,
  } = useFetchIngredientsByCategory(FETCH_LIMIT);

  const navigate = useNavigate();
  const navToCategory = (category: string) => {
    navigate(`/IngredientsCategory/${category}`);
  };

  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <PageWithDialog
      dialogRenderer={({ isOpen, data, onClose }) => (
        <IngredientDialog
          isOpen={isOpen}
          ingredientId={data as string}
          onClose={onClose}
        />
      )}
    >
      {({ openDialog }) => (
        <Grid mdcols={2} gap={8} className="">
          {isLoading ? (
            <Loading />
          ) : (
            ingredientsByCategory?.map(({ _id: category, ingredients }) => (
              <PageCard key={category} title={category}>
                <Grid
                  mdcols={4}
                  gap={2}
                  className="flex flex-wrap justify-center items-center"
                >
                  {ingredients.length === 0 ? (
                    <div className="text-center">No ingredients found</div>
                  ) : (
                    <>
                      {ingredients.map((ingredient) => (
                        <IngredientGridIcon
                          key={ingredient._id}
                          id={String(ingredient._id)}
                          header={ingredient.name}
                          category={category as IngredientCategory}
                          onClick={openDialog}
                        />
                      ))}
                    </>
                  )}
                  {ingredients.length === FETCH_LIMIT && (
                    <>
                      <IngredientGridIcon
                        id={category}
                        header="See More"
                        category="other"
                        onClick={() => navToCategory(category)}
                      />
                    </>
                  )}
                </Grid>
              </PageCard>
            ))
          )}
        </Grid>
      )}
    </PageWithDialog>
  );
}
