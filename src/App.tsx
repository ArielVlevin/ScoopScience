import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./Root.tsx";
import RecipesPage from "./features/recipes/pages/recipes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IngredientsPage from "./features/ingredients/pages/ingredients.tsx";
import IngredientDetailPage from "./features/ingredients/pages/ingredientDetails.tsx";
import AddIngredientForm from "./features/ingredients/pages/newIngredients.tsx";
import ContactUs from "./pages/contact.tsx";
import IngredientsCategoryPage from "./features/ingredients/pages/IngredientsCategories.tsx";
import ErrorPage from "./pages/error.tsx";
import NewRecipe from "./features/recipes/pages/newRecipe.tsx";
import RecipeDetailPage from "./features/recipes/pages/recipeDetail.tsx";
import LandingPage from "./features/recipes/pages/landingPage.tsx";
import HomePage from "@/pages/homePage.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Ingredients", element: <IngredientsPage /> },
      { path: "newIngredients", element: <AddIngredientForm /> },
      { path: "Ingredients/:ingredientId", element: <IngredientDetailPage /> },
      {
        path: "IngredientsCategory/:category",
        element: <IngredientsCategoryPage />,
      },
      { path: "recipes", element: <RecipesPage /> },
      { path: "newRecipe", element: <NewRecipe /> },
      { path: "recipes/:recipeId", element: <RecipeDetailPage /> },
      { path: "recipes/newRecipeLanding", element: <LandingPage /> },
      { path: "contact", element: <ContactUs /> },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
