import { useContext, useState } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import CartPage from './pages/Cart/CartPage'
import ProductsListPage from './pages/ProductsList/ProductsListPage'
import ProductPage from './pages/Product/ProductPage'
import MainTemplate from './templates/MainTemplate'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import { getCartItems, getQuantity } from './pages/Cart/cartUtils'

import { createContext } from 'react'

export const GlobalContext = createContext()


function App() {
  // glob states
  const [nbPanier, setNbPanier] = useState(getQuantity(getCartItems()))

  // saving context
  const context = {
    nbPanier, setNbPanier,
  }

  // router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainTemplate />}>
        <Route index element={<HomePage />}></Route>
        <Route path='panier' element={<CartPage />} loader={getCartItems}></Route>
        <Route path='produits' element={<ProductsListPage />}></Route>
        <Route path='produits/:id' element={<ProductPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Route>
    )
  )

  return (
    <GlobalContext.Provider value={context}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>

  )
}

export default App
