define('employees.dataservice', [], function () {
    'use strict';

    //Add/Show employees
    function getAllEmployees(continuation) {
        $.get('/api/UsersApi', continuation);
    }

    function addEmployee(newUser, continuation) {
        $.post('/api/UsersApi', newUser, continuation);
    }

    function removeEmployee(Id, continuation) {
        $.ajax({
            url: '/api/UsersApi/' + Id,
            type: 'DELETE',
            success: continuation
        });
    }

    function editEmployee(Id, editedEmployee, continuation) {
        $.ajax({
            url: '/api/UsersApi/' + Id,
            type: 'PUT',
            data: editedEmployee,
            success: continuation
        });
    }

    return {
        getAllEmployees: getAllEmployees,
        addEmployee: addEmployee,
        removeEmployee: removeEmployee,
        editEmployee: editEmployee

    };
});