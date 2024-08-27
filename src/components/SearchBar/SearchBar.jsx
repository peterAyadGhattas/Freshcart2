import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value); // Call the onSearch callback with the current query
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800">
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                value={query}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
        </div>
    );
};

export default SearchBar;
