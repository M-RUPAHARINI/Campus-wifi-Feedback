import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const StatusPieChart = ({ feedbacks }) => {
    const statusCounts = { Pending: 0, Assigned: 0, 'In Progress': 0, Resolved: 0, Closed: 0 };
    feedbacks.forEach(f => {
        if (statusCounts[f.status] !== undefined) statusCounts[f.status]++;
    });

    const data = {
        labels: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
        datasets: [{
            data: [
                statusCounts.Pending,
                statusCounts.Assigned,
                statusCounts['In Progress'],
                statusCounts.Resolved,
                statusCounts.Closed
            ],
            backgroundColor: [
                'rgba(234, 179, 8, 0.6)',  // Yellow
                'rgba(168, 85, 247, 0.6)', // Purple
                'rgba(59, 130, 246, 0.6)',  // Blue
                'rgba(34, 197, 94, 0.6)',   // Green
                'rgba(100, 116, 139, 0.6)', // Slate
            ],
            borderColor: [
                '#eab308', '#a855f7', '#3b82f6', '#22c55e', '#64748b'
            ],
            borderWidth: 1,
            hoverOffset: 12,
        }]
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-2">
            <div className="w-full h-full max-h-[200px] flex justify-center">
                <Pie data={data} options={{
                    maintainAspectRatio: false,
                    color: '#94a3b8',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 20,
                                font: { size: 11, weight: '600' },
                                color: '#94a3b8',
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
};

export const LocationBarChart = ({ feedbacks }) => {
    const locationCounts = {
        'Learning Center': 0,
        'Eastern Wing (AS Block)': 0,
        'Western Wing (IB Block)': 0,
        'Sunflower Block': 0,
        'Hostel': 0,
        'Other': 0
    };

    feedbacks.forEach(f => {
        let place = f.placeOfIssue || 'Other';
        if (place === 'Library') place = 'Learning Center';
        else if (place === 'AS Block') place = 'Eastern Wing (AS Block)';
        else if (place === 'IB Block') place = 'Western Wing (IB Block)';

        if (locationCounts[place] !== undefined) {
            locationCounts[place]++;
        } else {
            locationCounts['Other']++;
        }
    });

    const dataKeys = Object.keys(locationCounts).filter(k => k !== 'Other' || locationCounts[k] > 0);
    const dataValues = dataKeys.map(k => locationCounts[k]);

    const barData = {
        labels: dataKeys,
        datasets: [{
            label: 'Total Reports',
            data: dataValues,
            backgroundColor: 'rgba(59, 130, 246, 0.4)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 6,
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.6)',
        }],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#64748b',
                    font: { size: 10 },
                    stepSize: 1
                },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            },
            x: {
                ticks: {
                    color: '#94a3b8',
                    font: { size: 10, weight: '600' },
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: { display: false }
            }
        }
    };

    return (
        <div className="h-full w-full py-2">
            <div className="w-full h-full max-h-[220px]">
                <Bar options={barOptions} data={barData} />
            </div>
        </div>
    );
};

const AnalyticsCharts = ({ feedbacks }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusPieChart feedbacks={feedbacks} />
            <LocationBarChart feedbacks={feedbacks} />
        </div>
    );
};

export default AnalyticsCharts;
