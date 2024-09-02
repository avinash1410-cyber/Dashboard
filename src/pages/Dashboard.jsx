import React, { useCallback,useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import MainContent from '../components/MainContent';
import axios from 'axios';



const Dashboard = () => {
    const { dashBoard, setDashBoard, loading, setLoading } = useContext(DashboardContext);

    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://dashboard-1-7drh.onrender.com/api/dashboard/');
            setDashBoard(response.data);
        } catch (error) {
            console.error('Error fetching all data:', error);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setDashBoard]); // Include state setters in the dependency array
    
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]); // useCallback ensures this effect doesn't re-run unnecessarily
        


    if (loading) return <p>Loading...</p>;
 
    return (
        <div className="w-full"> 
        <h2 className="text-center text-2xl font-bold">DashBoard View</h2>
        <MainContent data={dashBoard} />
    </div>
    );
};

export default Dashboard;