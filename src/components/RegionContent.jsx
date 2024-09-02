import React, { useContext } from 'react';
import { OptionsContext } from '../context/OptionsContext'; // Adjust the path as needed

const RegionContent = ({ onFilterSelect }) => {
    const { regionOptions, loading } = useContext(OptionsContext);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="space-y-4">
            {regionOptions.length === 0 ? (
                <p>No regions available</p>
            ) : (
                regionOptions.map(region => (
                    <li key={region}>
                        <button
                            onClick={() => onFilterSelect(region.toLowerCase())}
                            className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                        >
                            {region}
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
};

export default RegionContent;
