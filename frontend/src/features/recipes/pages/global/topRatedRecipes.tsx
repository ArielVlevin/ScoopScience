import Page from "@/components/class/page";
import InfiniteRecipeGrid from "../../components/CardGrid/InfiniteCardGrid";
import PageCard from "@/components/class/pageCard";

export default function ExploreTopRatedRecipesPage() {
  return (
    <Page>
      <PageCard title="Newest Recipes">
        <InfiniteRecipeGrid
          initialFilters={{
            limit: 9,
            page: 1,
            order: "desc",
            sortBy: "ratingValue",
          }}
        />
      </PageCard>
    </Page>
  );
}
