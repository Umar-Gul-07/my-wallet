import { useEffect, useRef } from 'react';

const ChartInitializer = () => {
    const initializedCharts = useRef(new Set());

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 10;

        const initializeCharts = () => {
            // Check if Chart.js is available
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js not loaded, retrying...');
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(initializeCharts, 500);
                }
                return;
            }

            // Initialize Income vs Expense chart
            const incomeVsExpenseCtx = document.getElementById("chartjsIncomeVsExpense");
            if (incomeVsExpenseCtx && !initializedCharts.current.has("chartjsIncomeVsExpense")) {
                try {
                    incomeVsExpenseCtx.height = 100;
                    new Chart(incomeVsExpenseCtx, {
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
                    });
                    initializedCharts.current.add("chartjsIncomeVsExpense");
                    console.log('Income vs Expense chart initialized');
                } catch (error) {
                    console.error('Error initializing Income vs Expense chart:', error);
                }
            }

            // Initialize Weekly Expenses chart
            const weeklyExpensesCtx = document.getElementById("chartjsWeeklyExpenses");
            if (weeklyExpensesCtx && !initializedCharts.current.has("chartjsWeeklyExpenses")) {
                try {
                    weeklyExpensesCtx.height = 100;
                    new Chart(weeklyExpensesCtx, {
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
                    });
                    initializedCharts.current.add("chartjsWeeklyExpenses");
                    console.log('Weekly Expenses chart initialized');
                } catch (error) {
                    console.error('Error initializing Weekly Expenses chart:', error);
                }
            }

            // Initialize Budget Period charts
            const budgetPeriodIds = ["chartjsBudgetPeriod", "chartjsBudgetPeriod2", "chartjsBudgetPeriod3", "chartjsBudgetPeriod4"];
            budgetPeriodIds.forEach((id) => {
                const ctx = document.getElementById(id);
                if (ctx && !initializedCharts.current.has(id)) {
                    try {
                        ctx.height = 100;
                        new Chart(ctx, {
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
                        });
                        initializedCharts.current.add(id);
                        console.log(`${id} chart initialized`);
                    } catch (error) {
                        console.error(`Error initializing ${id} chart:`, error);
                    }
                }
            });

            // Initialize Profile Wallet charts
            const profileWalletIds = ["profileWallet", "profileWallet2", "profileWallet3", "profileWallet4"];
            const profileWalletData = [
                {
                    first: [0, 65, 52, 115, 98, 165, 125],
                    second: [40, 105, 92, 155, 138, 205, 165]
                },
                {
                    first: [0, 65, 77, 33, 49, 100, 100],
                    second: [20, 85, 97, 53, 69, 120, 120]
                },
                {
                    first: [0, 40, 77, 55, 33, 116, 50],
                    second: [30, 70, 107, 85, 73, 146, 80]
                },
                {
                    first: [0, 44, 22, 77, 33, 151, 99],
                    second: [60, 32, 120, 55, 19, 134, 88]
                }
            ];

            profileWalletIds.forEach((id, index) => {
                const ctx = document.getElementById(id);
                if (ctx && !initializedCharts.current.has(id)) {
                    try {
                        const config = {
                            type: "line",
                            data: {
                                labels: [
                                    "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan"
                                ],
                                datasets: [
                                    {
                                        label: "Active",
                                        backgroundColor: "rgba(93, 120, 255, 0.9)",
                                        borderColor: "transparent",
                                        data: profileWalletData[index].first,
                                        lineTension: 0,
                                        pointRadius: 0,
                                        borderWidth: 2,
                                    },
                                    {
                                        label: "Inactive",
                                        backgroundColor: 'rgba(240, 243, 255, 1)',
                                        borderColor: "transparent",
                                        data: profileWalletData[index].second,
                                        lineTension: 0,
                                        borderWidth: 1,
                                        pointRadius: 0,
                                    }
                                ]
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
                        };

                        const chartCtx = ctx.getContext("2d");
                        const myLine = new Chart(chartCtx, config);

                        // Add event listeners for chart actions
                        const actionId = `area-chart-action${index === 0 ? '' : index + 1}`;
                        const items = document.querySelectorAll(`#${actionId} span`);
                        items.forEach(function (item, dataIndex) {
                            item.addEventListener("click", function () {
                                config.data.datasets[0].data = profileWalletData[dataIndex].first;
                                config.data.datasets[1].data = profileWalletData[dataIndex].second;
                                myLine.update();
                            });
                        });

                        initializedCharts.current.add(id);
                        console.log(`${id} chart initialized`);
                    } catch (error) {
                        console.error(`Error initializing ${id} chart:`, error);
                    }
                }
            });

            // Initialize Donut chart
            const donutCtx = document.getElementById("chartjsDonut");
            if (donutCtx && !initializedCharts.current.has("chartjsDonut")) {
                try {
                    new Chart(donutCtx, {
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
                            labels: [
                                "Facebook",
                                "Youtube",
                                "Google",
                            ]
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
                        },
                    });
                    initializedCharts.current.add("chartjsDonut");
                    console.log('Donut chart initialized');
                } catch (error) {
                    console.error('Error initializing Donut chart:', error);
                }
            }
        };

        // Initial attempt with a small delay
        setTimeout(initializeCharts, 100);

        // Set up a mutation observer to watch for new chart elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if any chart elements were added
                            const chartElements = node.querySelectorAll ? 
                                node.querySelectorAll('[id*="chart"], [id*="profileWallet"]') : 
                                [];
                            
                            if (chartElements.length > 0 || 
                                (node.id && (node.id.includes('chart') || node.id.includes('profileWallet')))) {
                                setTimeout(initializeCharts, 50);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return null;
};

export default ChartInitializer; 