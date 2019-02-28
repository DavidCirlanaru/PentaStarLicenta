define('jobtypes.dataservice', [], function () {
    'use strict';

    //Get Job types
    function getAllJobTypes() {
       return $.get('/api/JobTypesApi');
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

    //Edit Job type
    function editJobType(JobTypeId, editedJobType, continuation) {
        $.ajax({
            url: 'api/JobTypesApi/' + JobTypeId,
            type: 'PUT',
            data: editedJobType,
            success: continuation
        });
    }


    return {
        getAllJobTypes: getAllJobTypes,
        addJobType: addJobType,
        removeJobType: removeJobType,
        editJobType: editJobType

    };
});