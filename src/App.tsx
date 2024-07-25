
import { RouterProvider, createBrowserRouter } from 'react-router-dom'




import './App.css';

import RootLayout from './pages/Root.tsx'
import MainPage from './pages/HomePage/index.tsx';
import ErrorPage from './pages/Error/index.tsx';
import RecipesPage from './pages/recipeSearch/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecipeDetailPage from './pages/recipePage/index.tsx';
import NewRecipe from './pages/addRecipe/index.tsx';
import IngredientsPage from './pages/Ingredients/index.tsx';
import IngredientDetailPage from './pages/Ingredients/Details/index.tsx';
import CreationPage from './pages/Creation/index.tsx';
import AddIngredientForm from './pages/Ingredients/components/Add/index.tsx';
import LandingPage from './pages/addRecipe/landingPage.tsx';
import ContactUs from './pages/contact/index.tsx';
import IngredientsCategoryPage from './pages/Ingredients/Details/category/index.tsx';


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
    {path: 'newIngredients', element: <AddIngredientForm/>},
    {path: 'Ingredients/:ingredientId', element: <IngredientDetailPage/>},
    {path: 'IngredientsCategory/:category', element: <IngredientsCategoryPage />},
    {path: 'recipes', element: <RecipesPage/>},
    {path: 'recipes/new', element: <NewRecipe />},
    {path: 'recipes/:recipeId', element: <RecipeDetailPage/>},
    {path: 'recipes/newRecipeLanding', element: <LandingPage/>},
    {path: 'contact', element: <ContactUs/>},

  ],
},
]);


const App = () => {
  
  return ( 
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App