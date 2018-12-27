define('employees.dataservice', [], function () {
    'use strict';

    //Add/Show employees
    function getAllEmployees(continuation) {
        $.get('/api/UsersApi', continuation);
    }

    function addEmployee(newUser, continuation) {
        $.post('/api/UsersApi', newUser, continuation);
    }

    //function removeRoom(RoomId, continuation) {
    //    $.ajax({
    //        url: '/api/RoomsApi/' + RoomId,
    //        type: 'DELETE',
    //        success: continuation
    //    });
    //}

    return {
        getAllEmployees: getAllEmployees,
        addEmployee: addEmployee,

    };
});