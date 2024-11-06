import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ErrorPage from "@/pages/error";
import AuthPage from "@/auth/pages/auth";
import Loading from "@/pages/loading";
import PrivateRoute, { AdminRoute } from "@/config/privateRoute";
import DashBoard from "@/features/dashboard/pages/dashboard";
import Logout from "@/auth/components/logout";

const HomePage = lazy(() => import("@/pages/homePage"));

const IngredientsPage = lazy(
  () => import("@/features/ingredients/pages/ingredients")
);
const AddIngredientForm = lazy(
  () => import("@/features/ingredients/pages/newIngredients")
);
const IngredientDetailPage = lazy(
  () => import("@/features/ingredients/pages/ingredientDetails")
);
const IngredientsCategoryPage = lazy(
  () => import("@/features/ingredients/pages/IngredientsCategories")
);
const ExploreRecipesPage = lazy(
  () => import("@/features/recipes/pages/ExploreRecipes")
);

const ExploreNewsetRecipesPage = lazy(
  () => import("@/features/recipes/pages/newestRecipes")
);

const NewRecipe = lazy(() => import("@/features/recipes/pages/newRecipePage"));

const ExploreTopRatedRecipesPage = lazy(
  () => import("@/features/recipes/pages/topRatedRecipes")
);

const MakeRecipe = lazy(() => import("@/features/recipes/pages/makeRecipe"));

const EditRecipeComponent = lazy(
  () => import("@/features/recipes/components/editRecipe/editRecipe")
);

const RecipeDetailPage = lazy(
  () => import("@/features/recipes/pages/recipeDetail")
);

const FavoritesRecipesPage = lazy(
  () => import("@/features/recipes/pages/favorites")
);
const UserRecipesPage = lazy(
  () => import("@/features/recipes/pages/userRecipes")
);

const UserIngredients = lazy(
  () => import("@/features/ingredients/pages/userIngredients")
);

const AdminControllPanel = lazy(
  () => import("@/features/dashboard/components/adminControllPanel")
);

const RecipeController = lazy(
  () => import("@/features/dashboard/components/recipe")
);
const ContactUs = lazy(() => import("@/pages/contact"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "Ingredients",
        element: (
          <Suspense fallback={<Loading />}>
            <IngredientsPage />
          </Suspense>
        ),
      },
      {
        path: "newIngredients",
        element: (
          <Suspense fallback={<Loading />}>
            <AddIngredientForm />
          </Suspense>
        ),
      },
      {
        path: "Ingredients/:ingredientId",
        element: (
          <Suspense fallback={<Loading />}>
            <IngredientDetailPage />
          </Suspense>
        ),
      },
      {
        path: "IngredientsCategory/:category",
        element: (
          <Suspense fallback={<Loading />}>
            <IngredientsCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "recipes",
        element: (
          <Suspense fallback={<Loading />}>
            <ExploreRecipesPage />
          </Suspense>
        ),
      },
      {
        path: "recipes/toprated",
        element: (
          <Suspense fallback={<Loading />}>
            <ExploreTopRatedRecipesPage />
          </Suspense>
        ),
      },
      {
        path: "recipes/newest",
        element: (
          <Suspense fallback={<Loading />}>
            <ExploreNewsetRecipesPage />
          </Suspense>
        ),
      },

      {
        path: "newrecipe",
        element: (
          <Suspense fallback={<Loading />}>
            <NewRecipe />
          </Suspense>
        ),
      },
      {
        path: "/recipes/make",
        element: <PrivateRoute />,

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <MakeRecipe />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/recipes/edit",
        element: <PrivateRoute />,

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <EditRecipeComponent />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "recipes/:recipeId",
        element: (
          <Suspense fallback={<Loading />}>
            <RecipeDetailPage />
          </Suspense>
        ),
      },

      {
        path: "user/favorites",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <FavoritesRecipesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "user/recipes",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <UserRecipesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "user/ingredients",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <UserIngredients />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Layout plain />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "logout",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Logout />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<Loading />}>
        <ContactUs />
      </Suspense>
    ),
  },

  {
    path: "control/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <DashBoard />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "control/admin",
    element: <AdminRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <AdminControllPanel />
          </Suspense>
        ),
      },
      {
        path: "recipe",
        element: (
          <Suspense fallback={<Loading />}>
            <RecipeController />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
