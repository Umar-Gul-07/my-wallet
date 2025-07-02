import { useEffect, useRef } from 'react';

export const useChartInitializer = (chartId, chartType, chartData, chartOptions) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }

        const ctx = document.getElementById(chartId);
        if (!ctx) {
            return;
        }

        // Destroy existing chart if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart
        chartRef.current = new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: chartOptions
        });

        // Cleanup function
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [chartId, chartType, chartData, chartOptions]);

    return chartRef.current;
};

// Predefined chart configurations
export const chartConfigs = {
    incomeVsExpense: {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
                label: 'Income',
                data: [5, 6, 4.5, 5.5, 3, 6, 4.5, 6, 8, 3],
                backgroundColor: 'rgba(47, 44, 216,1)',
            },
            {
                label: 'Expenses',
                data: [4, 5, 3.5, 4.5, 2, 5, 3.5, 5, 7, 2],
                backgroundColor: 'rgba(47, 44, 216,0.2)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                    barPercentage: 1,
                    categoryPercentage: 0.5
                }],
                yAxes: [{
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                }]
            },
            tooltips: { enabled: true }
        }
    },

    weeklyExpenses: {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: 'Week 1',
                data: [2, 12, 17, 14, 9, 5, 11, 18, 10, 13, 16, 20, 6, 7, 3, 15, 8, 19],
                backgroundColor: 'rgba(217, 70, 239, 1)'
            },
            {
                label: 'Week 2',
                data: [7, 12, 19, 13, 17, 8, 5, 11, 6, 10, 18, 15, 14, 16, 3, 2, 20, 4],
                backgroundColor: 'rgba(168, 85, 247, 1)'
            },
            {
                label: 'Week 3',
                data: [11, 18, 5, 17, 19, 7, 9, 14, 20, 15, 12, 6, 16, 13, 4, 8, 3, 10],
                backgroundColor: 'rgba(139, 92, 246, 1)'
            },
            {
                label: 'Week 4',
                data: [8, 4, 20, 10, 12, 7, 18, 3, 17, 2, 19, 13, 15, 5, 14, 6, 11, 9],
                backgroundColor: 'rgba(99, 102, 241, 1)'
            },
            {
                label: 'Week 5',
                data: [20, 5, 14, 10, 16, 12, 2, 17, 8, 7, 4, 11, 15, 9, 18, 19, 13, 6],
                backgroundColor: 'rgba(59, 130, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                    barPercentage: 2,
                    categoryPercentage: 0.2
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                }]
            },
            tooltips: { enabled: true }
        }
    },

    budgetPeriod: {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
                label: 'Budget',
                data: [5, 6, 4.5, 5.5, 3, 6, 4.5, 6, 8, 3],
                backgroundColor: 'rgba(47, 44, 216,1)',
            },
            {
                label: 'Spent',
                data: [4, 5, 3.5, 4.5, 2, 5, 3.5, 5, 7, 2],
                backgroundColor: 'rgba(47, 44, 216,0.6)',
            },
            {
                label: 'Remaining',
                data: [4, 5, 3.5, 4.5, 2, 5, 3.5, 5, 7, 2],
                backgroundColor: 'rgba(47, 44, 216,0.3)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                    barPercentage: 1.5,
                    categoryPercentage: 0.3
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: { drawBorder: false, display: false },
                    ticks: { display: true, beginAtZero: true },
                }]
            },
            tooltips: { enabled: true }
        }
    },

    profileWallet: {
        type: 'line',
        data: {
            labels: ["4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan"],
            datasets: [{
                label: "Active",
                backgroundColor: "rgba(93, 120, 255, 0.9)",
                borderColor: "transparent",
                data: [0, 65, 52, 115, 98, 165, 125],
                lineTension: 0,
                pointRadius: 0,
                borderWidth: 2,
            },
            {
                label: "Inactive",
                backgroundColor: 'rgba(240, 243, 255, 1)',
                borderColor: "transparent",
                data: [40, 105, 92, 155, 138, 205, 165],
                lineTension: 0,
                borderWidth: 1,
                pointRadius: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{
                    gridLines: { display: false, drawBorder: true },
                    ticks: { fontColor: "#8a909d", fontFamily: "Rubik, sans-serif" },
                }],
                yAxes: [{
                    gridLines: {
                        fontColor: "#8a909d",
                        display: false,
                        color: "rgba(0,0,0,0.071)",
                        zeroLineColor: "rgba(0,0,0,0.071)"
                    },
                    ticks: { stepSize: 50, fontColor: "#8a909d", fontFamily: "Rubik, sans-serif" }
                }]
            },
            tooltips: {
                mode: "index",
                intersect: false,
                titleFontColor: "#888",
                bodyFontColor: "#555",
                titleFontSize: 12,
                bodyFontSize: 15,
                backgroundColor: "rgba(256,256,256,0.95)",
                displayColors: true,
                xPadding: 10,
                yPadding: 7,
                borderColor: "rgba(220, 220, 220, 0.9)",
                borderWidth: 2,
                caretSize: 6,
                caretPadding: 5
            }
        }
    },

    donut: {
        type: "doughnut",
        data: {
            datasets: [{
                data: [33, 33, 33],
                backgroundColor: [
                    "rgba(22, 82, 240,1)",
                    "rgba(22, 82, 240,0.5)",
                    "rgba(22, 82, 240,0.15)",
                ],
            }],
            labels: ["Facebook", "Youtube", "Google"]
        },
        options: {
            responsive: false,
            cutoutPercentage: 80,
            maintainAspectRatio: false,
            animation: { animateRotate: true, animateScale: true },
            legend: {
                display: false,
                position: "bottom",
                labels: { usePointStyle: true, fontSize: 12, fontColor: "#464a53", padding: 20 },
            },
        }
    }
}; 