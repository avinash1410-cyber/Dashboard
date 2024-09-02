import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import SearchBar from '../components/SearchBar';



ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching data for ID:", id);
        fetch(`https://dashboard-1-7drh.onrender.com/api/get/${id}/`)
            .then(response => response.json())
            .then(data => {
                console.log("Data:", data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;

    // Prepare data for pie chart
    const pieChartData = {
        labels: ['Intensity', 'Relevance', 'Likelihood'],
        datasets: [
            {
                data: [data.intensity || 0, data.relevance || 0, data.likelihood || 0],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    return (
        <div className="p-6">
            <SearchBar></SearchBar>
            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Title</h2>
                        <p>{data.title}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Insight</h2>
                        <p>{data.insight}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Sector</h2>
                        <p>{data.sector}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Topic</h2>
                        <p>{data.topic}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Region</h2>
                        <p>{data.region}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Country</h2>
                        <p>{data.country}</p>
                    </div>
                    
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Source</h2>
                        <p>{data.source}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Pestle</h2>
                        <p>{data.pestle}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Added</h2>
                        <p>{data.added}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Published</h2>
                        <p>{data.published}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Impact</h2>
                        <p>{data.impact}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Start Year</h2>
                        <p>{data.start_year}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">End Year</h2>
                        <p>{data.end_year}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">URL</h2>
                        <a href={data.url} className="text-blue-500 hover:underline">
                            {data.url}
                        </a>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-xl font-semibold mb-4">Intensity, Relevance, and Likelihood</h2>
                    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
                </div>
            ) : (
                <p>No details found</p>
            )}
        </div>
    );
};

export default DetailPage;
