import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Card2 from '../components/Card2';
import { Link } from 'react-router-dom';


function SearchPage() {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };

    return (
        <>
            <div>SearchPage</div>
            <SearchBar />
            <p>Results of the search are as follows:</p>
            {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <>
                    <Card2
                        key={index}
                        title={`Card ${index + 1}`}
                        content={{
                            "Average Intensity": result.intensity || "N/A",
                            "Sector": result.sector || "N/A",
                            "Topic": result.topic || "N/A",
                            "Country": result.country || "N/A",
                            "Relevance": result.relevance || "N/A",
                            "Likelihood": result.likelihood || "N/A",
                        }}
                    />
                      <Link
                    to={`/details/${result.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    View Details →
                </Link>
                    </>
                    
                ))
            ) : (
                <p>No results found.</p>
            )}
        </>
    );
}

export default SearchPage;