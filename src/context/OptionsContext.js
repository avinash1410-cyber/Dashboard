import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const [regionOptions, setRegionOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);
    const [endYearOptions, setEndYearOptions] = useState([]);
    const [startYearOptions, setStartYearOptions] = useState([]);
    const [countriesOptions, setCountriesOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch filter options from API
    const fetchFilterOptions = async () => {
        try {
            setLoading(true);
            // Make API call to fetch all options
            const response = await axios.get('https://dashboard-1-7drh.onrender.com/api/available-filters/');
            
            // Assuming the response data structure
            setRegionOptions(response.data.regions || []);
            setSectorOptions(response.data.sectors || []);
            setStartYearOptions(response.data.start_years || []);
            setEndYearOptions(response.data.end_years || []);
            setCountriesOptions(response.data.countries || []);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    return (
        <OptionsContext.Provider
            value={{
                regionOptions,
                sectorOptions,
                endYearOptions,
                startYearOptions,
                countriesOptions,
                loading,
                setCountriesOptions,
                setSectorOptions,
                setRegionOptions,
                setEndYearOptions,
                setStartYearOptions,
                setLoading,
            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};
