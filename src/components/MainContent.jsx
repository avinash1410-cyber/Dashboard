import React from 'react';
import Card from '../components/Card';
import SearchBar from './SearchBar';

const MainContent = ({ data }) => {
    console.log(data)
    const dashboardData =data

    return (
        <div className="w-full p-6">
            <SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    title="Total Items" 
                    content={`Total No of Items: ${dashboardData.total_items}`} 
                />
                <Card 
                    title="Average Intensity" 
                    content={`Average Intensity: ${dashboardData.average_intensity}`} 
                />
                <Card 
                    title="Average Likelihood" 
                    content={`Average Likelihood: ${dashboardData.average_likelihood}`} 
                />
                <Card 
                    title="Max Country" 
                    content={`Country with Max Impact: ${dashboardData.max_country}`} 
                />
                <Card 
                    title="Max Region" 
                    content={`Region with Max Impact: ${dashboardData.max_region}`} 
                />
                <Card 
                    title="Max Topic" 
                    content={`Most Frequent Topic: ${dashboardData.max_topic}`} 
                />
                <Card 
                    title="Max Sector" 
                    content={`Most Impactful Sector: ${dashboardData.max_sector}`} 
                />
            </div>

            {/* You can include the dynamic data rendering below the static cards */}
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

export default MainContent;
