// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

 

  backendAPI:"https://localhost:7173/api/",

  
  CampusConsumer:{
    base:"CampusConsumer",
    CreateCampusConsumerLogin:"/CreateCampusConsumerLogin",
    UpdateConsumer:"/UpdateConsumer",
    GetConsumerById:'/GetConsumerById'
  },
  Merchandise:{
    base:"Merchandise",
    CreateMerchandise:"/CreateMerchandise",
     GetAllMerchandise:"/GetAllMerchandise",
    UpdateMerchandise:"/UpdateMerchandise",
    DeleteMerchandise:"/DeleteMerchandise",
    GetMerchandiseByStoreID:"/GetMerchandiseInfoByStoreID"
  },
  Store:{
    base:"Store",
    GetAllStores:"/GetAllStores",
    CreateStore:"/CreateStore",
    UpdateStore:"/UpdateStore",
    DeleteStore:"/DeleteStore",
    GetStoreById:"/GetStoreById",
    GetStoreByProviderId:"/GetStoreInfoByProviderID"
  },
  CampusServiceProvider:{
    base:'CampusServiceProvider',
    GetServiceProviderById:'/GetServiceProviderById',
    GetAllServiceProviders:'/GetAllServiceProviders',
    GetProviderStoreInfoByConsumerID:'/GetProviderStoreInfoByConsumerID'
  },
  Order:{
    base:'Order',
    GetAllOrders:'/GetAllOrders',
    CreateOrder:"/CreateOrder"
  },
  Cart:{
    base:'Cart',
    CreateCart:'/CreateCart',
    GetAllCarts:'/GetAllCarts'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

