import React from 'react';

function Card2({ title, content }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full sm:w-1/2 lg:w-1/3 flex flex-col justify-between">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <ul className="text-gray-700">
        {Object.entries(content).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span className="font-semibold">{key}:</span> <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card2;
