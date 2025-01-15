import Page from "@/components/pages/page";

import { FetchRecipesParams, typeOptions } from "@/types";
import { useState } from "react";
import InfiniteCardGrid from "../../components/CardGrid/InfiniteCardGrid";
import Title from "@/components/Text/title";

export default function ExploreTopRatedRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "ratingValue",
  });

  return (
    <Page>
      <Title className="text-center mb-4">Top Rated recipes</Title>

      <InfiniteCardGrid
        filters={filters}
        setFilters={setFilters}
        sortOptions={typeOptions}
        filterKey="recipeKind"
      />
    </Page>
  );
}
