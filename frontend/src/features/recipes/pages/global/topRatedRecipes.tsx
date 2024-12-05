import Page from "@/components/pages/page";

import { FetchRecipesParams, typeOptions } from "@/types";
import { useState } from "react";
import InfiniteCardGrid from "../../components/CardGrid/InfiniteCardGrid";

export default function ExploreTopRatedRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "ratingValue",
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
