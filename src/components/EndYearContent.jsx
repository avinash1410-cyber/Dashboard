import React, { useContext } from 'react';
import { OptionsContext } from '../context/OptionsContext'; // Adjust the path as needed

const EndYearContent = ({ onYearChange }) => {
    const { endYearOptions, loading } = useContext(OptionsContext);

    if (loading) return <p>Loading...</p>;

    return (
        <ul className="space-y-4">
            {endYearOptions.map(year => (
                <li key={year}>
                    <button
                        onClick={() => onYearChange(year)}
                        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                    >
                        {year}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default EndYearContent;
