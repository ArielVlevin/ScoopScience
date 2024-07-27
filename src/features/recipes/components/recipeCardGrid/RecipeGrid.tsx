import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cardsInfo, RecipeCard } from "./RecipeCard";
import Page from "@/components/class/page";
import Grid from "@/components/class/grid";

export default function RecipeGrid() {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

  const items: cardsInfo = Array.from({ length: itemsPerPage }, (_, index) => ({
    id: index,
    title: `Ice Cream ${index + 1}`,
    description:
      "Enjoy a refreshing and delicious ice cream treat on a hot summer day.",
    rating: 5.0,
    isLiked: false,

    marks: [
      { isActive: true, name: "high Sugar" },
      { isActive: false, name: "high Fat" },
      { isActive: true, name: "high Calories" },
      { isActive: false, name: "Vegan" },
      { isActive: true, name: "eggs" },
      { isActive: true, name: "stabilizer" },
    ],
  }));

  const startIndex = 0;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  return (
    <Page>
      {/* change it to real data */}
      <p className="text-sm text-muted-foreground  mb-4 text-center">
        18 recipes found
      </p>

      <Grid smcols={1} mdcols={2} lgcols={3} gap={8}>
        {displayedItems.map((item) => (
          <RecipeCard key={item.id} {...item} />
        ))}
      </Grid>

      <div className="flex justify-center mt-8">
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </Page>
  );
}
