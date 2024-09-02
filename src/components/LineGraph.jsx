import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
            {
                label: 'Dataset 2',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="w-full md:w-3/4 lg:w-1/2 p-4">
            <Line data={data} />
        </div>
    );
};

export default LineGraph;
