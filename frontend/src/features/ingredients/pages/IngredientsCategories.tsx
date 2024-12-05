import ErrorPage from "@/pages/error";
import { useParams } from "react-router-dom";
import PageCard from "@/components/pages/pageCard";
import { useFetchIngredients } from "../hooks/useFetchingredients";
import IngredientGridIcon from "../components/ingredientGridIcon";
import { IngredientCategory } from "../types";
import { isIngredientCategory } from "../utils/isIngredientCategory";
import IngredientDialog from "../components/ingredientDialog";
import PageWithDialog from "@/components/pages/pageWithDialog";
import { useState } from "react";
import { Button } from "@/components/ui";

export default function IngredientsCategoryPage() {
  const { category } = useParams();

  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useFetchIngredients({
    category: category as string,
    limit: 9,
    page: page,
  });

  if (isError && error) return <ErrorPage error={error?.message} />;

  if (!category || !isIngredientCategory(category))
    return <ErrorPage error="Invalid Category" />;

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
        <>
          <PageCard title={category}>
            {isLoading ? (
              <div>Loading...</div>
            ) : !data || data.totalIngredients === 0 ? (
              <div className="text-center">No ingredients found</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.ingredients.map((ingredient) => (
                  <IngredientGridIcon
                    key={ingredient._id}
                    id={String(ingredient._id)}
                    header={ingredient.name}
                    category={category as IngredientCategory}
                    onClick={openDialog}
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                className="align-self-center w-52 h-16 text-xl bg-primary/85"
                onClick={() => setPage(page - 1)}
                disabled={
                  data?.totalIngredients === 0 ||
                  !data?.currentPage ||
                  !data?.totalPages ||
                  data.currentPage === 1
                }
              >
                prev page
              </Button>

              <Button
                className="align-self-center w-52 h-16 text-xl bg-primary/85"
                onClick={() => setPage(page + 1)}
                disabled={
                  data?.totalIngredients === 0 ||
                  !data?.currentPage ||
                  !data?.totalPages ||
                  data.currentPage >= data.totalPages
                }
              >
                next page
              </Button>
            </div>
          </PageCard>
        </>
      )}
    </PageWithDialog>
  );
}
