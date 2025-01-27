import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/config/api";
import { Recipe, Ingredient } from "@/types";
import { User } from "@/auth/types/userTypes";
import Grid from "@/components/class/grid";
import PageCard from "@/components/pages/pageCard";
import IngredientGridIcon from "@/features/ingredients/components/ingredientGridIcon";
import { CardGrid } from "@/features/recipes/components/CardGrid/CardGrid";
import Page from "@/components/pages/page";

export default function SearchResultsPage() {
  const { query } = useParams<{ query: string }>(); // Capture query from URL
  const [results, setResults] = useState<{
    recipes: Recipe[];
    users: User[];
    ingredients: Ingredient[];
  }>({
    recipes: [],
    users: [],
    ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query && query.trim().length > 0) {
      setError(null); // Clear previous error
      setIsLoading(true);
      console.log("query", query);
      api
        .get(`/search?search=${query}`)
        .then((response) => {
          setResults(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Error fetching results");
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setResults({ recipes: [], users: [], ingredients: [] });
    }
  }, [query]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Page>
      <h1 className="text-2xl font-bold">Results for "{query}"</h1>

      <Grid gap={14}>
        {results.ingredients.length > 0 && (
          <PageCard title="Ingredients">
            <Grid
              mdcols={4}
              gap={2}
              className="flex flex-wrap justify-center items-center"
            >
              {results.ingredients.map((ingredient) => (
                <IngredientGridIcon
                  key={ingredient._id}
                  id={String(ingredient._id)}
                  header={ingredient.name}
                  category={ingredient.category}
                  onClick={() => console.log(`Clicked ${ingredient.name}`)}
                />
              ))}
            </Grid>
          </PageCard>
        )}

        {results.recipes.length > 0 && (
          <PageCard title="Recipes">
            <CardGrid recipes={results.recipes || []} itemsPerPage={9} />
          </PageCard>
        )}

        {results.users.length > 0 && (
          <PageCard title="Users">
            <Grid
              mdcols={2}
              gap={2}
              className="flex flex-wrap justify-center items-center"
            >
              {results.users.map((user) => (
                <IngredientGridIcon
                  key={user._id}
                  id={user._id}
                  header={user.userName}
                  category="other" // Replace if needed
                  onClick={() => console.log(`Clicked ${user.userName}`)}
                />
              ))}
            </Grid>
          </PageCard>
        )}
      </Grid>
    </Page>
  );
}
