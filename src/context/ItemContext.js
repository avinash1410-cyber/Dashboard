import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <ItemContext.Provider
            value={{
                allData,
                setAllData,
                loading,
                setLoading,
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};
