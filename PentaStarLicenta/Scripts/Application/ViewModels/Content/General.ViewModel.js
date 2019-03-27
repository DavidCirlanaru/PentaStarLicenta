define('general.viewModel', ['viewHandler', 'general.dataservice', 'accomodations.dataservice',
    'clients.dataservice', 'rooms.dataservice'],
    function (viewHandler, generalDataService, accomodationsDataService, clientsDataService, roomsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.general;



        Highcharts.chart('chartBars', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Rezervari pe luna'
            },
            subtitle: {
                text: 'Numar de rezervari'
            },
            xAxis: {
                categories: [
                    'Ianuarie',
                    'Februarie',
                    'Martie',
                    'Aprilie',
                    'Mai',
                    'Iunie',
                    'Julie',
                    'August',
                    'Sepemprie',
                    'Octombrie',
                    'Noiembrie',
                    'Decembrie'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Rezervari',
                data: accomodationsPerMonth
            }]
        });


        Highcharts.chart('chartSideBars', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Stacked bar chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        });

        Highcharts.chart('chartPie', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares in January, 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Chrome',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Internet Explorer',
                    y: 11.84
                }, {
                    name: 'Firefox',
                    y: 10.85
                }, {
                    name: 'Edge',
                    y: 4.67
                }, {
                    name: 'Safari',
                    y: 4.18
                }, {
                    name: 'Sogou Explorer',
                    y: 1.64
                }, {
                    name: 'Opera',
                    y: 1.6
                }, {
                    name: 'QQ',
                    y: 1.2
                }, {
                    name: 'Other',
                    y: 2.61
                }]
            }]
        });

        var accomodations = ko.observableArray([]).extend({ paged: { pageSize: 5 } });
        var pricesSum = ko.observable(0);
        var numberOfRooms = ko.observable(0);
        var numberOfClients = ko.observable(0);
        var numberOfEmployees = ko.observable(0);
        var availableClients = ko.observableArray([]);
        var accomodationsPerMonth = ko.observableArray([""]);

        console.log(accomodationsPerMonth);

        function getClientFirstName(id) {
            var matchClient = ko.utils.arrayFirst(availableClients(), function (item) {
                return item.ClientId == id;
            });
            return matchClient ? matchClient.FirstName + ' ' + matchClient.LastName : '';
        }

        function loadClients(data) {
            availableClients(data);
        }

        //--Rooms
        var availableRooms = ko.observableArray([]);

        function getRoomName(id) {
            var matchRoom = ko.utils.arrayFirst(availableRooms(), function (item) {
                return item.RoomId == id;
            });
            return matchRoom ? matchRoom.Name : '';
        }

        function loadRooms(data) {
            availableRooms(data);
        }

        //Load Accomodations
        function loadAccomodations(data) {
            accomodations(data);
        }

        function loadClients(data) {
            availableClients(data);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                accomodationsDataService.getAllAccomodations().done(loadAccomodations).fail(function () { console.log('Failed!') });
                clientsDataService.getAllClients().done(loadClients).fail(function () { console.log('Failed!') });
                roomsDataService.getAllRooms().done(loadRooms).fail(function () { console.log('Failed!') });

                generalDataService.getAllRoomTypePrices().done(function (data) { pricesSum(data) });
                generalDataService.getNumberOfClients().done(function (data) { numberOfClients(data) });
                generalDataService.getNumberOfEmployees().done(function (data) { numberOfEmployees(data) });
                generalDataService.getNumberOfRooms().done(function (data) { numberOfRooms(data) });
                generalDataService.getAccomodationsPerMonth().done(function (data) { accomodationsPerMonth(data) });
            }
        });


        return {
            isViewVisible: isViewVisible,
            accomodations: accomodations,
            pricesSum: pricesSum,
            numberOfClients: numberOfClients,
            numberOfEmployees: numberOfEmployees,
            numberOfRooms: numberOfRooms,
            availableClients: availableClients,
            getClientFirstName: getClientFirstName,
            availableRooms: availableRooms,
            getRoomName: getRoomName,
            accomodationsPerMonth: accomodationsPerMonth
        };
    }); define('general.viewModel', ['viewHandler', 'general.dataservice', 'accomodations.dataservice',
        'clients.dataservice', 'rooms.dataservice'],
        function (viewHandler, generalDataService, accomodationsDataService, clientsDataService, roomsDataService) {
            'use strict';

            var isViewVisible = viewHandler.views.content.general;



            Highcharts.chart('chartBars', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Rezervari pe luna'
                },
                subtitle: {
                    text: 'Numar de rezervari'
                },
                xAxis: {
                    categories: [
                        'Ianuarie',
                        'Februarie',
                        'Martie',
                        'Aprilie',
                        'Mai',
                        'Iunie',
                        'Julie',
                        'August',
                        'Sepemprie',
                        'Octombrie',
                        'Noiembrie',
                        'Decembrie'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Rezervari',
                    data: accomodationsPerMonth
                }]
            });


            Highcharts.chart('chartSideBars', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Stacked bar chart'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                    name: 'Jane',
                    data: [2, 2, 3, 2, 1]
                }, {
                    name: 'Joe',
                    data: [3, 4, 4, 2, 5]
                }]
            });

            Highcharts.chart('chartPie', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Browser market shares in January, 2018'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Chrome',
                        y: 61.41,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Internet Explorer',
                        y: 11.84
                    }, {
                        name: 'Firefox',
                        y: 10.85
                    }, {
                        name: 'Edge',
                        y: 4.67
                    }, {
                        name: 'Safari',
                        y: 4.18
                    }, {
                        name: 'Sogou Explorer',
                        y: 1.64
                    }, {
                        name: 'Opera',
                        y: 1.6
                    }, {
                        name: 'QQ',
                        y: 1.2
                    }, {
                        name: 'Other',
                        y: 2.61
                    }]
                }]
            });

            function getClientFirstName(id) {
                var matchClient = ko.utils.arrayFirst(availableClients(), function (item) {
                    return item.ClientId == id;
                });
                return matchClient ? matchClient.FirstName + ' ' + matchClient.LastName : '';
            }

            function loadClients(data) {
                availableClients(data);
            }

            //--Rooms
            var availableRooms = ko.observableArray([]);

            function getRoomName(id) {
                var matchRoom = ko.utils.arrayFirst(availableRooms(), function (item) {
                    return item.RoomId == id;
                });
                return matchRoom ? matchRoom.Name : '';
            }

            function loadRooms(data) {
                availableRooms(data);
            }

            //Load Accomodations
            function loadAccomodations(data) {
                accomodations(data);
            }

            function loadClients(data) {
                availableClients(data);
            }

            var accomodations = ko.observableArray([]).extend({ paged: { pageSize: 5 } });
            var availableClients = ko.observableArray([]);
            var pricesSum = ko.observable(0);
            var numberOfRooms = ko.observable(0);
            var numberOfClients = ko.observable(0);
            var numberOfEmployees = ko.observable(0);
            var accomodationsPerMonth = ko.observableArray([0]);

            isViewVisible.subscribe(function (newValue) {
                if (newValue) {
                    accomodationsDataService.getAllAccomodations().done(loadAccomodations).fail(function () { console.log('Failed!') });
                    clientsDataService.getAllClients().done(loadClients).fail(function () { console.log('Failed!') });
                    roomsDataService.getAllRooms().done(loadRooms).fail(function () { console.log('Failed!') });

                    generalDataService.getAllRoomTypePrices().done(function (data) { pricesSum(data) });
                    generalDataService.getNumberOfClients().done(function (data) { numberOfClients(data) });
                    generalDataService.getNumberOfEmployees().done(function (data) { numberOfEmployees(data) });
                    generalDataService.getNumberOfRooms().done(function (data) { numberOfRooms(data) });
                    generalDataService.getAccomodationsPerMonth().done(function (data) { accomodationsPerMonth(data) });
                    console.log(accomodationsPerMonth.toString());
                }
            });

            return {
                isViewVisible: isViewVisible,
                accomodations: accomodations,
                pricesSum: pricesSum,
                numberOfClients: numberOfClients,
                numberOfEmployees: numberOfEmployees,
                numberOfRooms: numberOfRooms,
                availableClients: availableClients,
                getClientFirstName: getClientFirstName,
                availableRooms: availableRooms,
                getRoomName: getRoomName,
                accomodationsPerMonth: accomodationsPerMonth
            };
        });