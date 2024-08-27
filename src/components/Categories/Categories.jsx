import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data); // Adjust based on the actual API response structure
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsLoading(false);
  }

  async function handleCategoryClick(categoryId) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`);
      setSubcategories(data.data); // Adjust based on the actual API response structure
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? <LoadingScreen /> : (
        <div className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white border-solid border-2 border-gray-300 rounded-sm max-w-sm dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                onClick={() => handleCategoryClick(category._id)}
              >
                <img className="rounded-t-lg w-full h-48 object-cover" src={category.image} alt={category.name} />
                <div className="px-5 pb-5">
                  <h3 className="text-gray-900 font-semibold tracking-tight dark:text-white line-clamp-1 py-2">{category.title}</h3>
                  <p className='line-clamp-2 text-green-800 text-3xl dark:text-gray-300'>{category.slug}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Subcategories:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory, index) => (
                  <div key={index} className="bg-white border-solid border-2 border-gray-300 rounded-sm max-w-sm dark:bg-gray-800 dark:border-gray-700">
                   
                    <div className="px-5 pb-5">
                      <h3 className="text-gray-900 font-semibold tracking-tight dark:text-white line-clamp-1 py-2">{subcategory.title}</h3>
                      <p className='line-clamp-2 text-green-800 text-2xl dark:text-gray-300'>{subcategory.slug}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
