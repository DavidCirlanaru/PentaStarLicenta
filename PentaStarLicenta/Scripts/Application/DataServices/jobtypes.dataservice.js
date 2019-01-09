define('jobtypes.dataservice', [], function () {
    'use strict';

    //Get Job types
    function getAllJobTypes(continuation) {
        $.get('/api/JobTypesApi', continuation);
    }

    //Add Job type
    function addJobType(newJobType, continuation) {
        $.post('/api/JobTypesApi', newJobType, continuation);
    }

    function removeJobType(JobTypeId, continuation) {
        $.ajax({
            url: '/api/JobTypesApi/' + JobTypeId,
            type: 'DELETE',
            success: continuation
        });
    }

    return {
        getAllJobTypes: getAllJobTypes,
        addJobType: addJobType,
        removeJobType: removeJobType

    };
});