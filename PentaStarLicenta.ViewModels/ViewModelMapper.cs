using AutoMapper;
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
            cfg.CreateMap<RoomType, RoomTypeViewModel>();
            cfg.CreateMap<RoomTypeViewModel, RoomType>();
        }

        public static RoomTypeViewModel ToViewModel(RoomType roomType)
        {
            return Mapper.Map<RoomType, RoomTypeViewModel>(roomType);
        }

        public static RoomType ToModel(RoomTypeViewModel roomTypeViewModel)
        {
            return Mapper.Map<RoomTypeViewModel, RoomType>(roomTypeViewModel);
        }
    }
}
