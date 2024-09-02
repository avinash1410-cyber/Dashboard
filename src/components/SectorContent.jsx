import React, { useContext } from 'react';
import { OptionsContext } from '../context/OptionsContext'; // Adjust the path as needed

const SectorContent = ({ onFilterSelect }) => {
    const { sectorOptions, loading } = useContext(OptionsContext);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="space-y-4">
            {sectorOptions.length === 0 ? (
                <p>No sectors available</p>
            ) : (
                sectorOptions.map(sector => (
                    <li key={sector}>
                        <button
                            onClick={() => onFilterSelect(sector.toLowerCase())}
                            className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                        >
                            {sector}
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
};

export default SectorContent;
