import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import for toastify styles
import { AddProductToCart } from '../AddProductCart';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // Check if data and data.wishlist exist and is an array
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Unexpected data format received", {
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
        setWishlist([]); // Set empty array on unexpected data format
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist", {
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
    } finally {
      setIsLoading(false);
    }
  }

  async function productRemove(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // After removing a product, refetch the wishlist
      getUserWishlist();
      toast.success("Product removed from wishlist successfully", {
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
    } catch (error) {
      toast.error("Failed to remove product from wishlist", {
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
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col">
          <div className="flex flex-col justify-start items-start">
            <div>
              <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
            </div>
            <div className="mt-3">
              <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Favourites</h1>
            </div>
            <div className="mt-4">
              <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{wishlist.length} items</p>
            </div>
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {wishlist.map((product) => (
                <div key={product.id} className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative">
                    <Link to={`/productDetails/${product._id}`}>
                      <img className=" w-full h-50 object-cover" src={product.imageCover} alt={product.name} />
                    </Link>
                    <button
                      aria-label="remove"
                      className="absolute top-4 right-4 p-1.5 bg-gray-800 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      onClick={() => productRemove(product.id)}
                    >
                      <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-gray-900 font-semibold text-lg leading-6 dark:text-white">{product.name}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-300">{product.code}</p>
                    <p className="text-gray-800 text-base font-medium dark:text-white">{product.color}</p>
                    <p className="text-gray-800 text-lg font-bold dark:text-white">Price: ${product.price}</p>
                    <div className="flex flex-col lg:flex-row items-center mt-4 gap-2">
                      <Link to={`/productDetails/${product._id}`}>
                        <button className="w-full lg:w-auto rounded-lg py-2 text-lg bg-white border border-gray-800 text-gray-800 dark:bg-transparent dark:border-white dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800">
                          More information
                        </button>
                      </Link>
                      <button
                        className="w-full lg:w-auto rounded-lg py-2 text-lg bg-gray-800 text-white border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => AddProductToCart(product._id)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
