
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'

import Notfound from './components/Notfound/Notfound'
import CounterContextProvider from './Contexts/CounterContext'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoutes from './components/ProtectedAuthRoutes/ProtectedAuthRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import WishList from './components/WishList/WishList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShippingAddress from './components/shippingAddress/ShippingAddress'





function App() {

  
const router= createBrowserRouter([
  {
    path: '', 
    element: <Layout/>, 
    children: [
      {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'login', element:<ProtectedAuthRoutes> <Login/></ProtectedAuthRoutes>},
      {path: 'register', element: <ProtectedAuthRoutes> <Register/></ProtectedAuthRoutes>},
      {path: 'Cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
      {path: 'categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'WishList', element: <ProtectedRoute><WishList/></ProtectedRoute>},
     {path: 'shippingAddress', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      
      {path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path: 'notfound', element: <Notfound/>}
    ]
  }
]);

  return (
    <>
  
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
          
           <ToastContainer />
        </CounterContextProvider>
      </AuthContextProvider>
     
    </>
  );
}

export default App;
