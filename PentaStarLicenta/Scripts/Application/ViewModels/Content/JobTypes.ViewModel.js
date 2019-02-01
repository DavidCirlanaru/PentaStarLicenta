define('jobTypes.viewModel',
    ['viewHandler', 'jobtypes.dataservice'],
    function (viewHandler, jobTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.jobTypes;

        //Add
        var jobTypes = ko.observableArray([]);
        var newJobTypeName = ko.observable('');

        //Edit
        var editedJobTypeId = ko.observable('');
        var editedJobTypeName = ko.observable('');

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

        function editJobType(id) {
            var editedJobType = ko.utils.arrayFirst(jobTypes(), function (item) {
                return item.JobTypeId == id;
            });

            editedJobTypeId(editedJobType.JobTypeId);
            editedJobTypeName(editedJobType.Type);
        }

        function addEditedJobType() {
            jobTypesDataService.editJobType(editedJobTypeId(), {
                Type: editedJobTypeName(),
                JobTypeId: editedJobTypeId()
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
            removeExistingJobType: removeExistingJobType,
            editedJobTypeId: editedJobTypeId,
            editedJobTypeName: editedJobTypeName,
            editJobType: editJobType,
            addEditedJobType: addEditedJobType



        };
    });