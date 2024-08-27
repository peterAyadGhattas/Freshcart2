/* import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast,Bounce } from 'react-toastify';
import CartProduct from '../CartProduct/CartProduct';
import LoadingScreen from '../LoadingScreen/LoadingScreen'


export default function Cart() {
  const [isLoading, setIsLoading] = useState(true)
const [Cart, setCart] = useState(null)
  useEffect(() => {
    getUserCart();
  
  }, [])
  async function getUserCart() {
    let {data}=await axios .get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem("token")}
    });
    setCart(data);
    setIsLoading(false)
    
  }
  async function productRemove(productId) {
    let {data} =await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
      headers:{ token:localStorage.getItem("token")}
    });
    
    setCart(data);
    toast.success("Product deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
  return (
    <>
{isLoading?<LoadingScreen/>: <div className=" pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
     {Cart?.data.products.map((Product, index) =>{
      return <CartProduct key={index} setCart={setCart} Product={Product}/>
     })}
     
      </div>
  
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${Cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${Cart?.data.totalCartPrice} USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>}

    </>
  )
}
 */

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Cart() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getUserCart();
  }, [userToken]);

  async function getUserCart() {
    setLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: userToken
        }
      });
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  function clearCart() {
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: userToken
      }
    }).finally(() => {
      setCart(null);
    });
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
   
      {
        cart?.numOfCartItems > 0 ? (
          <div className="min-h-screen pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({cart?.numOfCartItems})</h1>
            <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {cart?.data.products.map((product, index) => (
                  <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
                ))}
              </div>
              <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">${cart?.data.totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">$0.00</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div>
                    <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice.toFixed(2)} USD</p>
                    <p className="text-sm text-gray-700">Including VAT</p>
                  </div>
                </div>
               {/*  {"/shippingAddress/" + cart?.data._id} */}
                <Link to={`/ShippingAddress/`} className="mt-6 block text-center rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600">
                    Check out
                  </Link>
              </div>
            </div>
            <div className='w-3/4 mx-auto'>
              <button
                onClick={clearCart}
                className='text-red-500 border-2 border-red-500 rounded-md px-4 py-2 m-3 w-full hover:bg-red-500 hover:text-white duration-300'>
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className='h-screen flex justify-center items-center'>
            <h1 className="text-center text-2xl font-semibold">Your Cart Is Empty</h1>
          </div>
        )
      }
    </>
  );
}
