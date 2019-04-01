define('general.viewModel', ['viewHandler', 'general.dataservice', 'accomodations.dataservice',
    'clients.dataservice', 'rooms.dataservice'],
    function (viewHandler, generalDataService, accomodationsDataService, clientsDataService, roomsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.general;

        

        var accomodations = ko.observableArray([]).extend({ paged: { pageSize: 5 } });
        var pricesSum = ko.observable(0);
        var numberOfRooms = ko.observable(0);
        var numberOfClients = ko.observable(0);
        var numberOfEmployees = ko.observable(0);
        var availableClients = ko.observableArray([]);

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
                generalDataService.getAccomodationsPerMonth().done(function (data) {

                    Highcharts.chart('chartBars', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Rezervari pe luna'
                        },
                        subtitle: {
                            text: 'Numar de rezervari - ' + moment().format('YYYY')
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
                                '<td style="padding:0"><b>{point.y: 1f}</b></td></tr>',
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
                            data: data
                        }]
                    });

                });

                generalDataService.getIncomePerYear().done(function (data) {

                    Highcharts.chart('chartLine', {

                        title: {
                            text: 'Total venituri pe an'
                        },

                        yAxis: {
                            title: {
                                text: ''
                            }
                        },

                        xAxis: {
                            allowDecimals: false
                        },

                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },

                        plotOptions: {
                            candleStick: {
                                lineColor: '#A9FF96'
                            },

                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                pointStart: 2016,
                                
                            }
                        },

                        series: [
                            {
                                name: 'Venit',
                                data: data
                            }],

                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }

                    });

                });

                generalDataService.getOccupiedRooms().done(function (data) {

                    Highcharts.chart('chartPie', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Procent Ocupabilitate - ' + + moment().format('YYYY')
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage: .1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage: .1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        }, 
                        series: [{
                            name: 'Ocupabilitate',
                            colorByPoint: true,
                            data: [{
                                name: 'Camere Ocupate',
                                y: data,
                                sliced: true,
                                selected: true
                            }, {

                                name: 'Camere Libere',
                                y: 1
                            }]
                        }]
                    });

                });

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
            getRoomName: getRoomName
        };
    });