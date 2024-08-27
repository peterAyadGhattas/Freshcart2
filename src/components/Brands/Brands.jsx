import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the exit icon

const Modal = ({ brand, onClose }) => {
  const modalRef = useRef();

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!brand) return null; // If no brand, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full relative"
      >
        {/* Exit button with icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={brand.image}
          alt={brand.name}
        />
        <h3 className="text-gray-800 text-xl font-semibold mt-4">{brand.name}</h3>
        <button
          onClick={onClose}
          className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrands() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data); // Adjust based on the actual API response structure
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
    setIsLoading(false);
  }

  // Handle brand click
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white min-h-screen p-4">
          <h1 className='text-4xl mb-12 text-gray-800 font-bold text-center'>All Brands</h1>
          <div className="max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 relative"
                  onClick={() => handleBrandClick(brand)}
                >
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={brand.image}
                    alt={brand.name}
                  />
                  <div className="px-5 py-4">
                    <h3 className="text-gray-800 font-semibold text-xl">{brand.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render modal if a brand is selected */}
      <Modal brand={selectedBrand} onClose={handleCloseModal} />
    </>
  );
}
