import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import HomePage from './pages/Home/HomePage'
import CartPage from './pages/Cart/CartPage'
import ProductsListPage from './pages/ProductsList/ProductsListPage'
import ProductPage from './pages/ProductPage/ProductPage'
import MainTemplate from './templates/MainTemplate'
import NotFoundPage from './pages/NotFound/NotFoundPage'


function App() {
  // router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainTemplate />}>
        <Route index element={<HomePage />}></Route>
        <Route path='panier' element={<CartPage />}></Route>
        <Route path='produits' element={<ProductsListPage />}></Route>
        <Route path='produits/:id' element={<ProductPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Route>
    )
  )

  return (
      <RouterProvider router={router} />
  )
}

export default App
