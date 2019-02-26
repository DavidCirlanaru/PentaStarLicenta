define('roomTypes.viewModel',
    ['viewHandler', 'roomtypes.dataservice'],
    function (viewHandler, roomTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.roomTypes;

        var roomTypes = ko.observableArray([]);
        var newRoomTypeName = ko.observable('');
        var newRoomTypePrice = ko.observable('');

        var editedRoomTypeId = ko.observable('');
        var editedRoomTypeName = ko.observable('');
        var editedRoomTypePrice = ko.observable('');

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

        function refreshRoomTypes() {
            roomTypesDataService.getAllRoomTypes(loadRoomTypes);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshRoomTypes();
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
            addEditedRoomType: addEditedRoomType

        };
    });