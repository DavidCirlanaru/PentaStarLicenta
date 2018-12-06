﻿using AutoMapper;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.ViewModels
{
    public static class ViewModelMapper
    {
        public static void InitializeMapper()
        {
            //Initializat mapper 
            Mapper.Initialize(cfg => InitializeAllTypes(cfg));          
        }

        private static void InitializeAllTypes(IMapperConfigurationExpression cfg)
        {
            //RoomTypes Initialize
            cfg.CreateMap<RoomType, RoomTypeViewModel>();
            cfg.CreateMap<RoomTypeViewModel, RoomType>();

            //Rooms Initialize
            cfg.CreateMap<Room, RoomViewModel>();
            cfg.CreateMap<RoomViewModel, Room>();
        }

        //Room Types -> ViewModel
        public static RoomTypeViewModel ToViewModelRoomTypes(RoomType roomType)
        {
            return Mapper.Map<RoomType, RoomTypeViewModel>(roomType);
        }

        //Room Types -> Model
        public static RoomType ToModelRoomTypes(RoomTypeViewModel roomTypeViewModel)
        {
            return Mapper.Map<RoomTypeViewModel, RoomType>(roomTypeViewModel);
        }

        //Rooms -> ViewModel
       public static RoomViewModel ToViewModelRooms(Room room)
        {
            return Mapper.Map<Room, RoomViewModel>(room);
        }

        //Rooms  -> Model
        public static Room ToModelRooms(RoomViewModel roomViewModel)
        {
            return Mapper.Map<RoomViewModel, Room>(roomViewModel);
        }

    }
}
