define('clients.dataservice', [], function () {
    'use strict';

    //Show clients
    function getAllClients(continuation) {
        $.get('/api/ClientsApi', continuation);
    }

    function addClient(newClient, continuation) {
        $.post('/api/ClientsApi', newClient, continuation);
    }

    function removeClient(ClientId, continuation) {
        $.ajax({
            url: '/api/ClientsApi/' + ClientId,
            type: 'DELETE',
            success: continuation
        });
    }

    function editClient(ClientId, editedClient, continuation) {
        $.ajax({
            url: 'api/ClientsApi/' + ClientId,
            type: 'PUT',
            data: editedClient,
            success: continuation
        });
    }

    return {
        getAllClients: getAllClients,
        addClient: addClient,
        removeClient: removeClient,
        editClient: editClient
        
    };
});