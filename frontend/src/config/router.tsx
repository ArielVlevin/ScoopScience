import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ErrorPage from "@/pages/error";
import AuthPage from "@/auth/pages/auth";
import Loading from "@/pages/loading";
import PrivateRoute from "@/config/privateRoute";
import DashBoard from "@/auth/components/dashboard";
import Logout from "@/auth/components/logout";

import NewRecipe from "@/features/recipes/components/newRecipe/new";

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
const RecipesPage = lazy(
  () => import("@/features/recipes/pages/ExploreRecipes")
);

const RecipeDetailPage = lazy(
  () => import("@/features/recipes/pages/recipeDetail")
);
const MakeRecipePage = lazy(() => import("@/features/recipes/pages/make"));

const FavoritesRecipesPage = lazy(
  () => import("@/features/recipes/pages/favorites")
);

const UserFavoritesRecipesPage = lazy(
  () => import("@/features/recipes/pages/userFavorites")
);

const UserRecipesPage = lazy(
  () => import("@/features/recipes/pages/userRecipes")
);

const ContactUs = lazy(() => import("@/pages/contact"));
const Login = lazy(() => import("@/auth/pages/login"));
const Register = lazy(() => import("@/auth/pages/register"));

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
            <RecipesPage />
          </Suspense>
        ),
      },
      //todo: change to user/{user_id}/recipes/newrecipe
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
                <MakeRecipePage />
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
        path: "profile/:userName/favorites",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <UserFavoritesRecipesPage />
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
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },

      {
        path: "logout",
        element: (
          <Suspense fallback={<Loading />}>
            <Logout />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
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
    path: "contact",
    element: (
      <Suspense fallback={<Loading />}>
        <ContactUs />
      </Suspense>
    ),
  },
]);

export default router;
