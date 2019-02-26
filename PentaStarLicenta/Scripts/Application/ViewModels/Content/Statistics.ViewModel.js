define('statistics.viewModel', ["viewHandler", "statistics.dataservice"], function (viewHandler, statisticsDataService) {
    'use strict';

    var isViewVisible = viewHandler.views.content.statistics;

    //Charts
    require(['jquery', 'moment', 'chartjs'], function ($, moment, Chart) {
        var ctxBar = document.getElementById("middleBarChart").getContext('2d');
        var myChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


        var ctxPieLeft = document.getElementById("leftPieChart").getContext('2d');
        var myPieChart = new Chart(ctxPieLeft, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Cele mai populare zile',
                    data: [10, 20, 30, 80],
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132, 1)'
                    ],
                    borderColor: [],
                    borderWidth: 1
                }],

                labels: [
                    'Luni',
                    'Miercuri',
                    'Joi',
                    'Duminica'
                ]
            }

        });

        var ctxLineRight = document.getElementById("rightLineChart").getContext('2d');
        var myLineChart = new Chart(ctxLineRight, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Incasari (RON)',
                    data: [90, 80, 50, 40, 60, 70],
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1,
                    lineTension: 0,
                    fill: false
                }],

                labels: [
                    'Ianuarie',
                    'Februarie',
                    'Martie',
                    'Aprilie',
                    'Mai',
                    'Iunie',
                ]
            }

        });
            // /Charts
    });
 
    // --Code here


    return {
        isViewVisible: isViewVisible,
        
    };
});
