import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

// Function to add a product to the cart
export async function addProductToWishlist(productId) {
  try {
    // Make POST request to add the product to the cart
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist/",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    // Validate the response format
    if (data && typeof data === 'object' && data.message) {
      // Log the response for debugging purposes
      console.log(data);

      // Display success message
      toast.success(data.message, {
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
    } else {
      // Handle unexpected data format
      console.warn("Unexpected response format:", data);

      toast.error("Unexpected response format from the server", {
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
  } catch (error) {
    // Log error for debugging
    console.error("Error adding product to cart:", error);

    // Display error message
    const errorMessage = error.response?.data?.message || "Failed to add product to cart";
    
    toast.error(errorMessage, {
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
