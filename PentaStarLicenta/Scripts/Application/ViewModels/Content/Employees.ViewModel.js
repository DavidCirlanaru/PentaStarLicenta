define('employees.viewModel',
    ['viewHandler', 'employees.dataservice', 'jobtypes.dataservice'],
    function (viewHandler, employeesDataService, jobTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.employees;

        //For adding Employees
        var employees = ko.observableArray([]).extend({ paged: { pageSize: 10 } });
        var newEmployeeFirstName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un prenume de angajat"
            }
        });
        var newEmployeeLastName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un nume de angajat"
            }
        });
        var newEmployeeUsername = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un username de angajat"
            }
        });
        var newEmployeeEmail = ko.observable('').extend({
            pattern: { params: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email-ul nu este valid" ' },
            required: {
                message: "Adauga mail"
            }
        });

        var errors = ko.validation.group([newEmployeeFirstName, newEmployeeLastName, newEmployeeUsername, newEmployeeEmail, editedFirstName, editedLastName,
            editedUserName, editedEmail]);
        errors.showAllMessages();

        function clearInputs() {
            newEmployeeFirstName('');
            newEmployeeLastName('');
            newEmployeeUsername('');
            newEmployeeEmail('');
        }

        //For JobTypes dropdown
        var availableJobTypes = ko.observableArray([]);
        var selectedJobType = ko.observable();

        //For Editing
        var editedEmployeeId = ko.observable('');
        var editedFirstName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un prenume de angajat"
            }
        });
        var editedLastName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un nume de angajat"
            }
        });
        var editedUserName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un username de angajat"
            }
        });
        var editedEmail = ko.observable('').extend({
            pattern: { params: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email-ul nu este valid" ' },
            required: {
                message: "Adauga mail"
            }
        });

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
            employeesDataService.getAllEmployees().done(loadEmployees).fail(function () { console.log('Failed!') });
        }

          isViewVisible.subscribe(function (newValue) {
              if (newValue) {
                  var loadJobTypesPromise = jobTypesDataService.getAllJobTypes().done(function (data) { loadJobTypes(data) });

                  $.when(loadJobTypesPromise).done(function () {
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
            editedEmployeeId: editedEmployeeId,
            editedFirstName: editedFirstName,
            editedLastName: editedLastName,
            editedUserName: editedUserName,
            editedJobTypeId: editedJobTypeId,
            editedEmail: editedEmail,
            editEmployee: editEmployee,
            addEditedEmployee: addEditedEmployee,
            clearInputs: clearInputs

        };
    });