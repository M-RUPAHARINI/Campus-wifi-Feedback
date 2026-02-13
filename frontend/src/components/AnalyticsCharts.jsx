import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalyticsCharts = ({ feedbacks }) => {
    // Pie Chart Data: Status Distribution
    const statusCounts = { Pending: 0, 'In Progress': 0, Resolved: 0 };
    feedbacks.forEach(f => {
        if (statusCounts[f.status] !== undefined) statusCounts[f.status]++;
    });

    const pieData = {
        labels: ['Pending', 'In Progress', 'Resolved'],
        datasets: [
            {
                label: '# of Feedbacks',
                data: [statusCounts.Pending, statusCounts['In Progress'], statusCounts.Resolved],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Bar Chart Data: Signal Strength
    const signalCounts = { Poor: 0, Average: 0, Good: 0, Excellent: 0 };
    feedbacks.forEach(f => {
        if (signalCounts[f.signalStrength] !== undefined) signalCounts[f.signalStrength]++;
    });

    const barData = {
        labels: ['Poor', 'Average', 'Good', 'Excellent'],
        datasets: [
            {
                label: 'Signal Strength Reports',
                data: [signalCounts.Poor, signalCounts.Average, signalCounts.Good, signalCounts.Excellent],
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
        ],
    };

    // Bar Chart Options
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Signal Strength Distribution',
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
                <h3 className="text-lg font-medium mb-4">Feedback Status</h3>
                <div className="w-64 h-64">
                    <Pie data={pieData} />
                </div>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
                <Bar options={barOptions} data={barData} />
            </div>
        </div>
    );
};

export default AnalyticsCharts;
