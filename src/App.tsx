
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/Root.tsx'
import MainPage from './pages/HomePage/index.tsx';
import ErrorPage from './pages/Error/index.tsx';
import RecipesPage from './pages/Recipe/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecipeDetailPage from './pages/RecipeDetails/index.tsx';
import NewRecipe from './pages/Recipe/components/Add/index.tsx';
import IngredientsPage from './pages/Ingredients/index.tsx';
import IngredientDetailPage from './pages/IngredientDetail/index.tsx';
import CreationPage from './pages/Creation/index.tsx';
import AddIngredientForm from './pages/Ingredients/components/Add/index.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

const router = createBrowserRouter([{
  path: '/',
  errorElement: <ErrorPage />,
  element: <RootLayout />,
  children: [
    {index: true, element: <MainPage/>},
    {path: 'Creation', element: <CreationPage/>},
    {path: 'Ingredients', element: <IngredientsPage/>},
    {path: 'Ingredients/new', element: <AddIngredientForm/>},
    {path: 'Ingredients/:ingredientId', element: <IngredientDetailPage/>},
    {path: 'recipes', element: <RecipesPage/>},
    {path: 'recipes/new', element: <NewRecipe />},
    {path: 'recipes/:recipeId', element: <RecipeDetailPage/>},

  ],
},
]);


const App = () => {
  return  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>;
}

export default App