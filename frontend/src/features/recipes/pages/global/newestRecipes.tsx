import Page from "@/components/pages/page";
import InfiniteCardGrid from "../../components/CardGrid/InfiniteCardGrid";
import { useState } from "react";
import { FetchRecipesParams, typeOptions } from "@/types";
import Title from "@/components/Text/title";

export default function ExploreNewsetRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
  });

  return (
    <Page>
      <Title className="text-center mb-4">Newest recipes</Title>
      <InfiniteCardGrid
        filters={filters}
        setFilters={setFilters}
        sortOptions={typeOptions}
        filterKey="recipeKind"
      />
    </Page>
  );
}
