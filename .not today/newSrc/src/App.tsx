import {
  RouterProvider,
  createBrowserRouter,
} from "../../node_modules1/react-router-dom/dist/index";
import "./App.css";

import { AuthProvider } from "./contexts/AuthContext.tsx";

import RootLayout from "./Root.tsx";
import RecipesPage from "./features/recipes/pages/recipes.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from "../../node_modules1/@tanstack/react-query/build/modern/index";
import IngredientsPage from "./features/ingredients/pages/ingredients.tsx";
import IngredientDetailPage from "./features/ingredients/pages/ingredientDetails.tsx";
import AddIngredientForm from "./features/ingredients/pages/newIngredients.tsx";
import ContactUs from "./pages/contact.tsx";
import IngredientsCategoryPage from "./features/ingredients/pages/IngredientsCategories.tsx";
import ErrorPage from "./pages/error.tsx";
import RecipeDetailPage from "./features/recipes/pages/recipeDetail.tsx";
import LandingPage from "./features/recipes/pages/landingPage.tsx";
import HomePage from "@/pages/homePage.tsx";
import Login from "@/features/auth/pages/login.tsx";
import Register from "./features/auth/pages/register.tsx";

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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "Ingredients", element: <IngredientsPage /> },
      { path: "newIngredients", element: <AddIngredientForm /> },
      { path: "Ingredients/:ingredientId", element: <IngredientDetailPage /> },
      {
        path: "IngredientsCategory/:category",
        element: <IngredientsCategoryPage />,
      },
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipes/:recipeId", element: <RecipeDetailPage /> },
      { path: "recipes/newRecipeLanding", element: <LandingPage /> },
      { path: "contact", element: <ContactUs /> },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
