﻿define('employees.viewModel',
    ['viewHandler', 'employees.dataservice', 'jobtypes.dataservice'],
    function (viewHandler, employeesDataService, jobTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.employees;

        //For adding Employees
        var employees = ko.observableArray([]);
        var newEmployeeFirstName = ko.observable('');
        var newEmployeeLastName = ko.observable('');
        var newEmployeeUsername = ko.observable('');
        var newEmployeeEmail = ko.observable('');

        //For JobTypes dropdown
        var availableJobTypes = ko.observableArray([]);
        var selectedJobType = ko.observable();


        function loadEmployees(data) {
            employees(data);
        }

        function addNewEmployee() {
            employeesDataService.addEmployee({
                UserName: newEmployeeUsername(),
                Email: newEmployeeEmail(),
                FirstName: newEmployeeFirstName(),
                LastName: newEmployeeLastName(),
                JobTypeId: selectedJobType().JobTypeId
            },
                refreshEmployees
            );
        }

        //RoomTypes Dropdown
        function getJobTypeName(id) {
            // *arrayFirst() searches through the roomTypes array looking for a match on the id. 
            //Returns that object as a match.
            var match = ko.utils.arrayFirst(availableJobTypes(), function (item) {
                return item.JobTypeId == id;
            });

            //Returns the object as a match
            // Else returns an empty string.
            return match ? match.Type : '';
        }


        function removeExistingEmployee() {
            employeesDataService.removeEmployee(this.Id, refreshEmployees);

        }

        function loadJobTypes(data) {
            availableJobTypes(data);
        }

        function refreshEmployees() {
            employeesDataService.getAllEmployees(loadEmployees);
        }

          isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshEmployees();
                jobTypesDataService.getAllJobTypes(function (data) {
                    loadJobTypes(data);
                    refreshEmployees();

                });
            }
        });

        return {
            isViewVisible: isViewVisible,
            employees: employees,
            addNewEmployee: addNewEmployee,
            removeExistingEmployee: removeExistingEmployee,
            newEmployeeFirstName: newEmployeeFirstName,
            newEmployeeLastName: newEmployeeLastName,
            newEmployeeUsername: newEmployeeUsername,
            newEmployeeEmail: newEmployeeEmail,
            availableJobTypes: availableJobTypes,
            getJobTypeName: getJobTypeName,
            selectedJobType: selectedJobType
        };
    });