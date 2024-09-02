import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import axios from 'axios';



const AllDataComponent = () => {
    const { allData, setAllData, loading, setLoading } = useContext(DashboardContext);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://dashboard-1-7drh.onrender.com/api/dashboard/');
            setAllData(response.data);
        } catch (error) {
            console.error('Error fetching all data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    });    

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>All Data</h2>
            <pre>{JSON.stringify(allData, null, 2)}</pre>
        </div>
    );
};

export default AllDataComponent;
