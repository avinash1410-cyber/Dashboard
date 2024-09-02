import React from 'react';
import Card from '../components/Card';
import SearchBar from './SearchBar';

const MainContent2 = ({ data }) => {
    console.log(data)
    return (
        <div className="w-full p-6">
            <SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    title="Total Items" 
                    content={`Total No of Items: ${data.length}`} 
                />
            </div>

            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {data.map((result, index) => (
                        <Card 
                            key={index} 
                            title={result.title} 
                            content={result.insight} 
                            id={result.id} 
                        />
                    ))}
                </div>
            ) : (
                <div>.</div>
            )}
        </div>
    );
};

export default MainContent2;
