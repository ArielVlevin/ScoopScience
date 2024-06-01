
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/Root.tsx'
import ProductsPage from './pages/Products.tsx';
import MainPage from './pages/Home.tsx';
import ErrorPage from './pages/Error.tsx';
import ProductDetailPage from './pages/ProductDetail.tsx';
import RecipesPage from './pages/Recipes.tsx';
import RecipeDetailPage from './pages/RecipeDetail.tsx';



const router = createBrowserRouter([{
  path: '/',
  errorElement: <ErrorPage />,
  element: <RootLayout />,
  children: [
    {index: true, element: <MainPage/>},
    {path: 'products', element: <ProductsPage/>},
    {path: 'products/:productId', element: <ProductDetailPage/>},
    {path: 'recipes', element: <RecipesPage/>},
    {path: 'recipes/:recipeId', element: <RecipeDetailPage/>},

  ],
},
]);


const App = () => {
  return  <>
  <RouterProvider router={router} />
  </>;
}

export default App