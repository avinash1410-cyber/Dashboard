import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import RegionContent from './components/RegionContent';
import EndYearContent from './components/EndYearContent';
import StartYearContent from './components/StartYearContent';
import SectorContent from './components/SectorContent';
import CountryContent from './components/CountryContent';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import AllDataComponent from './pages/AllData';
import { DashboardContext } from './context/DashboardContext';
import { ItemContext } from './context/ItemContext';
import DetailPage from './pages/DetailPage';
import Articles from './pages/ArticlePage';
import axios from 'axios';



function App() {
    const [modalType, setModalType] = useState(null);
    const [selectedYearType, setSelectedYearType] = useState(null);

    const { 
        setDashBoard 
    } = useContext(DashboardContext);



    const { 
        setAllData
    }=useContext(ItemContext);
    





    const handleFilterSelect = (filterType) => {
        if (filterType === 'region') {
            setModalType('region');
        } else if (filterType === 'start year') {
            setSelectedYearType('start');
            setModalType('calendar');
        } else if (filterType === 'end year') {
            setSelectedYearType('end');
            setModalType('calendar');
        } else if (filterType === 'sector') {
            setModalType('sector');
        } else if (filterType === 'countries') {
            setModalType('countries');
        }
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedYearType(null);
    };





    const fetchSectorData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const fetchRegionData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    



    const fetchCountryData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    
    const fetchStartYearData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    
    const fetchEndYearData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };









    const fetchSectorDashboardData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    
    const fetchRegionDashboardData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    
    const fetchCountryDashboardData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            console.log('in fetchCountryDashboardData')
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const fetchStartYearDashboardData = async (endpoint, setData) => {
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };





    const fetchSectorDashBoardData = async (sector) => {
        await fetchSectorDashboardData(`https://dashboard-1-7drh.onrender.com/api/dashboard/?sector=${sector}`, setDashBoard);
    };

    const fetchCountryDashBoardData = async (countries) => {
        console.log("In fetchCountryDashBoardData")
        await fetchCountryDashboardData(`https://dashboard-1-7drh.onrender.com/api/dashboard/?country=${countries}`, setDashBoard);
    };

    const fetchRegionDashBoardData = async (region) => {
        await fetchRegionDashboardData(`https://dashboard-1-7drh.onrender.com/api/dashboard/?region=${region}`, setDashBoard);
    };

    const fetchStartYearDashBoardData = async (start_year) => {
        await fetchStartYearDashboardData(`https://dashboard-1-7drh.onrender.com/api/dashboard/?start_year=${start_year}`, setDashBoard);
    };





    const fetchSectorArticlesData = async (sector) => {
        await fetchSectorData(`https://dashboard-1-7drh.onrender.com/api/filter/?sector=${sector}`, setAllData);
    };

    const fetchCountryArticlesData = async (countries) => {
        await fetchCountryData(`https://dashboard-1-7drh.onrender.com/api/filter/?country=${countries}`, setAllData);
    };

    const fetchRegionArticlesData = async (region) => {
        await fetchRegionData(`https://dashboard-1-7drh.onrender.com/api/filter/?region=${region}`, setAllData);
    };



    const fetchStartYearArticlesData = async (year) => {
        await fetchStartYearData(`https://dashboard-1-7drh.onrender.com/api/filter/?start_year=${year}`, setAllData);
    };


    const fetchEndYearArticlesData = async (year) => {
        await fetchEndYearData(`https://dashboard-1-7drh.onrender.com/api/filter/?end_year=${year}`, setAllData);
    };







    const handleRegionSelect = (region) => {
        const currentPath = window.location.pathname;
        if (currentPath === '/dashboard') {
            fetchRegionDashBoardData(region);
        } else if (currentPath === '/articles') {
            fetchRegionArticlesData(region);
        }
        closeModal();
    };


    const handleSectorSelect = (sector) => {
        const currentPath = window.location.pathname;
        if (currentPath === '/dashboard') {
            fetchSectorDashBoardData(sector);
        } else if (currentPath === '/articles') {
            fetchSectorArticlesData(sector);
        }
        closeModal();
    };

    const handleCountrySelect = (countries) => {
        const currentPath = window.location.pathname;
        if (currentPath === '/dashboard') {
            console.log("In handleCountrySelect")
            fetchCountryDashBoardData(countries); // Assuming country is used in dashboard endpoint
        } else if (currentPath === '/articles') {
            console.log("In handleCountrySelect")
            fetchCountryArticlesData(countries); // Assuming country is used in articles endpoint
        }
        closeModal();
    };

    const handleStartYearSelect = (year) => {
        const currentPath = window.location.pathname;
        if (currentPath === '/dashboard') {
            console.log("In handleCountrySelect")
            fetchStartYearDashBoardData(year); // Assuming country is used in dashboard endpoint
        } else if (currentPath === '/articles') {
            console.log("In handleCountrySelect")
            fetchStartYearArticlesData(year); // Assuming country is used in articles endpoint
        }
        closeModal();
    };

    const handleEndYearSelect = (year) => {
        const currentPath = window.location.pathname;
        if (currentPath === '/dashboard') {
            console.log("In handleCountrySelect")
            fetchCountryDashBoardData(year); // Assuming country is used in dashboard endpoint
        } else if (currentPath === '/articles') {
            console.log("In handleCountrySelect")
            fetchEndYearArticlesData(year); // Assuming country is used in articles endpoint
        }
        closeModal();
    };



    return (
        <Router>
            <div className="flex">
                <Sidebar onFilterSelect={handleFilterSelect} />
                <div className="flex-1 ml-64 p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/all" element={<AllDataComponent />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/details/:id" element={<DetailPage />} />
                        <Route path="/articles" element={<Articles />} />
                    </Routes>
                </div>
                {modalType === 'region' && (
                    <Modal
                        title="Regions"
                        content={<RegionContent onFilterSelect={handleRegionSelect} />}
                        onClose={closeModal}
                    />
                )}
                
                {modalType === 'calendar' && selectedYearType === 'start' && (
                    <Modal
                        title="Select Start Year"
                        content={<StartYearContent onYearChange={handleStartYearSelect} />}
                        onClose={closeModal}
                    />
                )}
                {modalType === 'calendar' && selectedYearType === 'end' && (
                    <Modal
                        title="Select End Year"
                        content={<EndYearContent onYearChange={handleEndYearSelect} />}
                        onClose={closeModal}
                    />
                )}
                {modalType === 'sector' && (
                    <Modal
                        title="Sectors"
                        content={<SectorContent onFilterSelect={handleSectorSelect} />}
                        onClose={closeModal}
                    />
                )}
                {modalType === 'countries' && (
                    <Modal
                        title="Countries"
                        content={<CountryContent onFilterSelect={handleCountrySelect} />}
                        onClose={closeModal}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;
