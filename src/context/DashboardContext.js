import React, { createContext, useState } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [dashBoard, setDashBoard] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <DashboardContext.Provider
            value={{
                dashBoard,
                loading,
                setDashBoard,
                setLoading,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
