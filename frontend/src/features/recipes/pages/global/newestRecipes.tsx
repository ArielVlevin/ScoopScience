import Page from "@/components/pages/page";
import InfiniteCardGrid from "../../components/CardGrid/InfiniteCardGrid";
import { useState } from "react";
import { FetchRecipesParams, typeOptions } from "@/types";

export default function ExploreNewsetRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
  });

  return (
    <Page>
      <InfiniteCardGrid
        filters={filters}
        setFilters={setFilters}
        sortOptions={typeOptions}
        filterKey="recipeKind"
      />
    </Page>
  );
}
