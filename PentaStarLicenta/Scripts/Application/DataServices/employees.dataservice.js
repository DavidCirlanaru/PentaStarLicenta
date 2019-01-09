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

    return {
        getAllEmployees: getAllEmployees,
        addEmployee: addEmployee,
        removeEmployee: removeEmployee

    };
});