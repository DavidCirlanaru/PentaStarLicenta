define('roomTypes.viewModel',
    ['viewHandler', 'roomtypes.dataservice'],
    function (viewHandler, roomTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.roomTypes;

        var roomTypes = ko.observableArray([]).extend({ paged: { pageSize: 10 } });
                
       

        var newRoomTypeName = ko.observable('').extend({
            required: {
                params: true,
                message: "Adauga tipul camerei"
            },
            minLength: { params: 3, message: "Introduceti minim 3 caractere" }
        });
        var newRoomTypePrice = ko.observable('').extend({
            number: { params: true, message: "Pretul este format doar din numere" },
            required: {
                params: true,
                message: "Adauga numele camerei"
            },
        });

        var editedRoomTypeId = ko.observable('');
        var editedRoomTypeName = ko.observable('').extend({
            required: {
                params: true,
                message: "Adauga tipul camerei"
            },
            minLength: { params: 3, message: "Introduceti minim 3 caractere" }
        });
        var editedRoomTypePrice = ko.observable('').extend({
            number: { params: true, message: "Pretul este format doar din numere" },
            required: {
                params: true,
                message: "Adauga numele camerei"
            },
        });

        var errors = ko.validation.group([newRoomTypeName, newRoomTypePrice, editedRoomTypeName, editedRoomTypePrice]);
        errors.showAllMessages();

        function clearInputs() {
            newRoomTypeName('');
            newRoomTypePrice('');
        }


        function loadRoomTypes(data) {
            roomTypes(data);
        }

        function addNewRoomType() {
            roomTypesDataService.addRoomType({
                Type: newRoomTypeName(),
                Price: newRoomTypePrice(),
                RoomId: 1
            },
                refreshRoomTypes
            );
        }

        function editRoomType(id) {
            var editedRoomType = ko.utils.arrayFirst(roomTypes(), function (item) {
                return item.RoomTypeId == id;
            });

            editedRoomTypeId(editedRoomType.RoomTypeId);
            editedRoomTypeName(editedRoomType.Type);
            editedRoomTypePrice(editedRoomType.Price);
        }

        function addEditedRoomType() {
            roomTypesDataService.editRoomType(editedRoomTypeId(), {
                Type: editedRoomTypeName(),
                Price: editedRoomTypePrice(),
                RoomTypeId: editedRoomTypeId()
            },
                refreshRoomTypes
            );
        }

        function removeExistingRoomType() {
            roomTypesDataService.removeRoomType(this.RoomTypeId, refreshRoomTypes);
        }

        //Pagination
      
        function refreshRoomTypes() {
            roomTypesDataService.getAllRoomTypes().done(loadRoomTypes).fail(function () { console.log('Failed!') });
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                $.when().done(function () {
                    refreshRoomTypes();
                }); 
            }
        });       

        return {
            isViewVisible: isViewVisible,
            roomTypes: roomTypes,
            addNewRoomType: addNewRoomType,
            newRoomTypeName: newRoomTypeName,
            newRoomTypePrice: newRoomTypePrice,
            removeExistingRoomType: removeExistingRoomType,
            editedRoomTypeId: editedRoomTypeId,
            editedRoomTypeName: editedRoomTypeName,
            editedRoomTypePrice: editedRoomTypePrice,
            editRoomType: editRoomType,
            addEditedRoomType: addEditedRoomType,
            clearInputs: clearInputs

        };
    });