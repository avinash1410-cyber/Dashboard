import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onFilterSelect }) => {
    const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
    const [isItemDropdownOpen, setIsItemDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleDashboardToggle = () => {
        navigate('/dashboard');
        setIsDashboardDropdownOpen(prevState => !prevState);
    };

    const handleItemToggle = () => {
        navigate('/articles');
        setIsItemDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed overflow-y-scroll">
            <h2 className="text-2xl font-bold p-4">Free Finance</h2>
            <ul className="space-y-4 p-4">
                <li><a href="/home" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a></li>
                
                <li>
                    <button
                        onClick={handleDashboardToggle}
                        className="w-full text-left block py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Dashboard Filter
                    </button>
                    {isDashboardDropdownOpen && (
                        <ul className="pl-4 mt-2 space-y-2">
                            {['Region','Countries' ,'End Year', 'Sector', 'Start Year'].map(filter => (
                                <li key={filter}>
                                    <button
                                        onClick={() => onFilterSelect(filter.toLowerCase())}
                                        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        {filter}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                <li>
                    <button
                        onClick={handleItemToggle}
                        className="w-full text-left block py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Item Filter
                    </button>
                    {isItemDropdownOpen && (
                        <ul className="pl-4 mt-2 space-y-2">
                            {['Region','Countries', 'End Year', 'Sector', 'Start Year'].map(filter => (
                                <li key={filter}>
                                    <button
                                        onClick={() => onFilterSelect(filter.toLowerCase())}
                                        className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        {filter}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
