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

            //Users Initialize
            cfg.CreateMap<User, UserViewModel>();
            cfg.CreateMap<UserViewModel, User>();

            //JobTypes Initialize
            cfg.CreateMap<JobType, JobTypeViewModel>();
            cfg.CreateMap<JobTypeViewModel, JobType>();
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

        //Users -> Model
        public static UserViewModel ToViewModelUsers(User user)
        {
            return Mapper.Map<User, UserViewModel>(user);
        }

        //Users - > ViewModel
        public static User ToModelUsers(UserViewModel userViewModel)
        {
            return Mapper.Map<UserViewModel, User>(userViewModel);
        }

        //JobTypes -> Model
        public static JobTypeViewModel ToViewModelJobTypes(JobType jobType)
        {
            return Mapper.Map<JobType, JobTypeViewModel>(jobType);
        }

        //JobTypes - > ViewModel
        public static JobType ToModelJobTypes(JobTypeViewModel jobTypeViewModel)
        {
            return Mapper.Map<JobTypeViewModel, JobType>(jobTypeViewModel);
        }

    }
}
