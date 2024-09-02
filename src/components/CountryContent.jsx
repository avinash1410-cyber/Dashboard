import React, { useContext } from 'react';
import { OptionsContext } from '../context/OptionsContext'; // Adjust the path as needed

const CountryContent = ({ onFilterSelect }) => {
    const { countriesOptions, loading } = useContext(OptionsContext);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="space-y-4">
            {countriesOptions.countries === 0 ? (
                <p>No country available</p>
            ) : (
                countriesOptions.map(countries => (
                    <li key={countries}>
                        <button
                            onClick={() => onFilterSelect(countries.toLowerCase())}
                            className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                        >
                            {countries}
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
};

export default CountryContent;
