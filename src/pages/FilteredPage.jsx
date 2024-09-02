import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { useParams } from 'react-router-dom';

const FilteredPage = () => {
    const { filterType } = useParams(); // Get filter type from URL params
    const { allData, sectorData, regionData, topicData, loading, fetchSectorData, fetchRegionData, fetchTopicData, fetchAllData } = useContext(DashboardContext);

    useEffect(() => {
        const fetchData = async () => {
            if (filterType === 'sector') {
                await fetchSectorData('some-sector'); // You might need to pass a specific sector value
            } else if (filterType === 'region') {
                await fetchRegionData('some-region'); // You might need to pass a specific region value
            } else if (filterType === 'topic') {
                await fetchTopicData('some-topic'); // You might need to pass a specific topic value
            } else {
                await fetchAllData(); // Default case to fetch all data
            }
        };

        fetchData();
    }, [filterType, fetchSectorData, fetchRegionData, fetchTopicData, fetchAllData]);

    if (loading) return <p>Loading...</p>;

    let dataToDisplay;
    switch (filterType) {
        case 'sector':
            dataToDisplay = sectorData;
            break;
        case 'region':
            dataToDisplay = regionData;
            break;
        case 'topic':
            dataToDisplay = topicData;
            break;
        default:
            dataToDisplay = allData;
            break;
    }

    return (
        <div>
            <h1>Data for {filterType}</h1>
            <ul>
                {dataToDisplay.map(item => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.insight}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredPage;
