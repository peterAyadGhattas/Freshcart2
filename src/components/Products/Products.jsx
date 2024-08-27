import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
