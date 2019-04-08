define('jobTypes.viewModel',
    ['viewHandler', 'jobtypes.dataservice'],
    function (viewHandler, jobTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.jobTypes;

        //Add
        var jobTypes = ko.observableArray([]).extend({ paged: { pageSize: 10 } });
        var newJobTypeName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un tip de job"
            }
        });

        //Edit
        var editedJobTypeId = ko.observable('');
        var editedJobTypeName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un tip de job"
            }
        });

        var errors = ko.validation.group([newJobTypeName, editedJobTypeName]);
        errors.showAllMessages();


        function clearInputs() {
            newJobTypeName('');
            editedJobTypeName('');
        }

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
            jobTypesDataService.getAllJobTypes().done(loadJobTypes).fail(function () { console.log('Failed!') });
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                $.when().done(function () {
                    refreshJobTypes();
                });
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
            addEditedJobType: addEditedJobType,
            clearInputs: clearInputs
        };
    });