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

export default function IngredientsCategoryPage() {
  const { category } = useParams();

  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useFetchIngredients({
    category: category as string,
    limit: 9,
    page: page,
    namesOnly: true,
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
          <PageCard
            title={category}
            titleBtn1onClick={() => setPage(page - 1)}
            titleBtn1Title="prev"
            titleBtn1Disable={
              data?.totalIngredients === 0 ||
              !data?.currentPage ||
              !data?.totalPages ||
              data.currentPage === 1
            }
            titleBtn2Title="next"
            titleBtn2Disable={
              data?.totalIngredients === 0 ||
              !data?.currentPage ||
              !data?.totalPages ||
              data.currentPage >= data.totalPages
            }
            titleBtn2onClick={() => setPage(page + 1)}
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : !data || data.totalIngredients === 0 ? (
              <div className="text-center">No ingredients found</div>
            ) : (
              <div>
                <div className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  justify-between">
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
              </div>
            )}
          </PageCard>
        </>
      )}
    </PageWithDialog>
  );
}
