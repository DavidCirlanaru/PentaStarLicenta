define('jobTypes.viewModel',
    ['viewHandler', 'jobtypes.dataservice'],
    function (viewHandler, jobTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.jobTypes;

        var jobTypes = ko.observableArray([]);
        var newJobTypeName = ko.observable('');
        var newJobTypePrice = ko.observable('');

        function loadJobTypes(data) {
            jobTypes(data);
        }

        function addNewJobType() {
            jobTypesDataService.addJobType({
                Type: newJobTypeName()                                
            },
                refreshJobTypes
            );
        }

        function removeExistingJobType() {
            jobTypesDataService.removeJobType(this.JobTypeId, refreshJobTypes);
        }

        function refreshJobTypes() {
            jobTypesDataService.getAllJobTypes(loadJobTypes);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshJobTypes();
            }
        });

        return {
            isViewVisible: isViewVisible,
            jobTypes: jobTypes,
            addNewJobType: addNewJobType,
            newJobTypeName: newJobTypeName,
            newJobTypePrice: newJobTypePrice,
            removeExistingJobType: removeExistingJobType

        };
    });