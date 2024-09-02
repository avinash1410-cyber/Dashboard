import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!query.trim()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://dashboard-1-7drh.onrender.com/api/search/${query}/`);
            const data = await response.json();
            // Redirect to the /search page and pass data via state
            navigate('/search', { state: { searchResults: data } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex items-center mb-6" onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;
