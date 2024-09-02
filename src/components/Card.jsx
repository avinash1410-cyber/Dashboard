import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, content, id, target = `/details/${id}` }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 m-4">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-6">{content}</p>
                <Link
                    to={target}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default Card;
