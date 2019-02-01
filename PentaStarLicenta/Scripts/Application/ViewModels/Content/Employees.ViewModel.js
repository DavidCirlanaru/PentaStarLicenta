define('employees.viewModel',
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

        //For Editing
        var editedEmployeeId = ko.observable('');
        var editedFirstName = ko.observable('');
        var editedLastName = ko.observable('');
        var editedUserName = ko.observable('');
        var editedEmail = ko.observable('');
        var editedJobTypeId = ko.observable('');


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

        //JobTypes Dropdown
        function getJobTypeName(id) {
            // *arrayFirst() searches through the jobTypes array looking for a match on the id. 
            //Returns that object as a match.
            var match = ko.utils.arrayFirst(availableJobTypes(), function (item) {
                return item.JobTypeId == id;
            });

            //Returns the object as a match
            // Else returns an empty string.
            return match ? match.Type : '';
        }

        //Edit Employee
        function editEmployee(id) {
            var editedEmployee = ko.utils.arrayFirst(employees(), function (item) {
                return item.Id == id;
            });

            editedEmployeeId(editedEmployee.Id);
            editedFirstName(editedEmployee.FirstName);
            editedLastName(editedEmployee.LastName);
            editedUserName(editedEmployee.UserName);
            editedEmail(editedEmployee.Email);
            editedJobTypeId(editedEmail.JobTypeId);

        }

        function addEditedEmployee() {
            employeesDataService.editEmployee(editedEmployeeId(), {
                FirstName: editedFirstName(),
                LastName: editedLastName(),
                UserName: editedUserName(),
                Email: editedEmail(),
                Id: editedEmployeeId(),
                JobTypeId: editedJobTypeId()
            },
                refreshEmployees
            );
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
            selectedJobType: selectedJobType,
            editedEmployeeId,
            editedFirstName: editedFirstName,
            editedLastName: editedLastName,
            editedUserName: editedUserName,
            editedJobTypeId: editedJobTypeId,
            editedEmail: editedEmail,
            editEmployee: editEmployee,
            addEditedEmployee: addEditedEmployee

        };
    });