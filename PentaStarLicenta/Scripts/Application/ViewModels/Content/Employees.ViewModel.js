define('employees.viewModel',
    ['viewHandler', 'employees.dataservice'],
    function (viewHandler, employeesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.employees;

        //For adding Employees
        var employees = ko.observableArray([]);
  //  var newEmployeeFirstName = ko.observable('');
  //  var newEmployeeLastName = ko.observable('');
        var newEmployeeUsername = ko.observable('');
        var newEmployeeEmail = ko.observable('');

        function loadEmployees(data) {
            employees(data);
        }

        function addNewEmployee() {
            employeesDataService.addEmployee({
                UserName: newEmployeeUsername(),
                Email: newEmployeeEmail(),
                Id: 2
            },
                refreshEmployees
            );
        }

        //function removeExistingRoom() {
        //    roomsDataService.removeRoom(this.RoomId, refreshRooms);

        //}

        function refreshEmployees() {
            employeesDataService.getAllEmployees(loadEmployees);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshEmployees();
            }
        });  

        return {
            isViewVisible: isViewVisible,
            employees: employees,
            addNewEmployee: addNewEmployee
           

        };
    });