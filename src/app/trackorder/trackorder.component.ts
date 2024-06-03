import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { ProfileService } from "../services/profile.service";
import { ProviderService } from "../services/provider.service";
import { StoreService } from "../services/store.service";
import { OrderService } from "../services/order.service";
import { CheckoutService } from "../services/checkout.service";
import { ToastrService } from "ngx-toastr";
import { TransactionService } from "../services/transaction.service";
import { interval } from 'rxjs';
import { CampusConsumerService } from "../services/campus-consumer.service";
@Component({
    selector: "app-trackorder",
    templateUrl: "./trackorder.component.html",
    styleUrls: ["./trackorder.component.scss"],
})
export class TrackorderComponent implements OnInit {
    allMerchandiseInCart: any;
    consumerData: any = {};
    providerData: any;
    storeData: any;
    order: any;
    totalPrice: any = 0;
    cartIDSFromDb: any;
    paymentCreditntails: any;
    bank: any;
    estimatedTime:any=0;
    constructor(
        private cartService: CartService,
        private profileService: ProfileService,
        private providerService: ProviderService,
        public storeService: StoreService,
        private checkoutService: CheckoutService,
        public orderService: OrderService,
        private toastr: ToastrService,
        private transactionService: TransactionService,
        private consumerService:CampusConsumerService
    ) {}
    markers: any[] = [];
    location: any[] = [
        sessionStorage.getItem("LAT"),
        sessionStorage.getItem("LONG"),
    ];
    currentOrder: any;
    currentUser: any;
    ngOnInit(): void {
        this.consumerFun();
        this.markers = [
            {
                position: {
                    lat: parseInt(this.location[0]),
                    lng: parseInt(this.location[1]),
                },
                visible: true,
                opacity: 1,

                title: "Consumer",
                options: {
                    draggable: false,
                    icon: "../assets/img/loc1.png",
                },
            },
            {
                lat: parseInt(this.location[0]),
                lng: parseInt(this.location[1]),
              visible: true,
              opacity: 1,

              title: "Provider",
              options: {
                draggable: false,
                icon: '../assets/img/loc2.png'
              }
            }
        ];
    }
    display: any;
    center: google.maps.LatLngLiteral = { lat: 32.494162, lng: 35.99104 };
    zoom = 14;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = event.latLng.toJSON();
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
    consumerFun() {
        this.checkoutService.userData$.subscribe((res) => {
            if (res) {
                this.consumerData = res;
                this.orderService.GetOrders().subscribe((res) => {
                    if (res?.length > 0) {
                        if (
                            res.filter(
                                (data) =>
                                    data.consumerid ==
                                    this.consumerData.consumerid
                            ).length > 0
                        ) {
                            this.currentOrder = res.filter(
                                (data) =>
                                    data.consumerid ==
                                    this.consumerData.consumerid
                            )[0];
                            this.currentUser = "consumer";
                        }
                    }
                });
                this.getLatestOrderUpdate();
                this.getCart();
            }
        });
    }
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            let lat = position.coords.latitude;
                            let lng = position.coords.longitude;

                            const location = {
                                lat,
                                lng,
                            };
                            resolve(location);
                        }
                    },
                    (error) => console.log(error)
                );
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

    getAllProviders() {
        this.providerService
            .GetAllServiceProviders()
            .subscribe((providerRes: any) => {
                if (providerRes) {
                    this.providerData = providerRes.filter(
                        (provider) =>
                            provider.providerid == this.storeData.providerid
                    )[0];
                    this.orderService.GetOrders().subscribe((res) => {
                        if (res?.length > 0) {
                            if (
                                res.filter(
                                    (data) =>
                                        data.providerid ==
                                        this.providerData.providerid
                                ).length > 0
                            ) {
                                this.currentOrder = res.filter(
                                    (data) =>
                                        data.providerid ==
                                        this.providerData.providerid
                                )[0];
                                this.currentUser = "provider";
                            }
                        }
                    });
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            if (position) {
                                this.consumerData.locationLatitude =
                                    position.coords.latitude;
                                this.consumerData.locationLongitude =
                                    position.coords.longitude;
                            }
                        });
                    } else {
                        alert("Geolocation is not supported by this browser.");
                    }

                    this.allMerchandiseInCart = this.allMerchandiseInCart.map(
                        (merchandise) => ({
                            quantity: merchandise.quantity,
                            total: this.totalPrice,
                            consumerid: this.consumerData.consumerid,
                            productid: merchandise.productid,
                            storeid: merchandise.storeid,
                            product: {
                                productid: merchandise.productid,
                                name: merchandise.name,
                                rate: merchandise.rate,
                                description: merchandise.description,
                                category: merchandise.category,
                                price: merchandise.price,
                                quantity: merchandise.quantity,
                                image: merchandise.image,
                                status: merchandise.status,
                                storeid: merchandise.storeid,
                                store: merchandise.store,
                                carts: merchandise.carts,
                                merchandiseReviews:
                                    merchandise.merchandiseReviews,
                            },
                            store: this.storeData,
                        })
                    );
                    const observableToPromise = (observable) => {
                        return new Promise((resolve, reject) => {
                            observable.subscribe(
                                (res) => resolve(res),
                                (err) => reject(err)
                            );
                        });
                    };
                    const createCartPromises = [];
                    for (let i = 0; i < this.allMerchandiseInCart.length; i++) {
                        const createCartObservable =
                            this.cartService.CreateCartRecord(
                                this.allMerchandiseInCart[i]
                            );
                        createCartPromises.push(
                            observableToPromise(createCartObservable)
                        );
                    }
                    Promise.all(createCartPromises)
                        .then((results) => {
                            const anyNull = results.some((res) => res == null);
                            if (anyNull) {
                                this.orderFun();
                            }
                        })
                        .catch((error) => {
                            console.error(
                                "Error creating cart records:",
                                error
                            );
                        });
                }
            });
    }
    orderFun() {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(
            currentDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}T${currentDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${currentDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${currentDate
            .getSeconds()
            .toString()
            .padStart(2, "0")}.${currentDate
            .getMilliseconds()
            .toString()
            .padStart(3, "0")}Z`;
        this.cartService.GetAllCarts().subscribe((res) => {
            if (res) {
                this.cartIDSFromDb = res;
                this.cartIDSFromDb = this.cartIDSFromDb.filter(
                    (cart) =>
                        cart.consumerid == this.consumerData.consumerid &&
                        cart.storeid == this.storeData.storeid
                );
                for (let i = 0; i < this.allMerchandiseInCart.length; i++) {
                    this.allMerchandiseInCart[i].cartid =
                        this.cartIDSFromDb[i].cartid;
                }
            }
        });
        this.order = {
            consumerid: this.consumerData.consumerid,
            providerid: this.providerData?.providerid,
            totalamount: this.totalPrice,
            consumer: {
                locationLatitude: this.consumerData.locationLatitude.toString(),
                locationLongitude:
                    this.consumerData.locationLongitude.toString(),
                consumerid: this.consumerData.consumerid,
                isprovider: this.consumerData.isprovider,
                fullname: this.consumerData.fullname,
                email: this.consumerData.email,
                imagepath: this.consumerData.imagepath,
                phone: this.consumerData.phone,
                status: this.consumerData.status,
                password: this.consumerData.password,
                roleid: this.consumerData.roleid,
                role: this.consumerData.role,
                banks: this.consumerData.banks,
                campusserviceproviders:
                    this.consumerData.campusserviceproviders,
                carts: this.consumerData.carts,
                logins: this.consumerData.logins,
                merchandiseReviews: this.consumerData.merchandiseReviews,
                orders: this.consumerData.orders,
                specialrequests: this.consumerData.specialrequests,
                storeReviews: this.consumerData.storeReviews,
                testimonials: this.consumerData.testimonials,
            },
            provider: this.providerData,
            location: null,
            locatioN_LATITUDE: this.consumerData.locationLatitude.toString(),
            locatioN_LONGITUDE: this.consumerData.locationLongitude.toString(),
            deliveryaddress: null,
            orderdate: formattedDate,
            orderstatus: "pending",
            carts: this.allMerchandiseInCart.map((merchandise) => ({
                cartid: this.allMerchandiseInCart.cartid,
                quantity: merchandise.quantity,
                total: this.totalPrice,
                consumerid: this.consumerData.consumerid,
                productid: merchandise.productid,
                orderid: null,
                storeid: merchandise.storeid,
                order: merchandise.name,
                product: {
                    productid: merchandise.productid,
                    name: merchandise.name,
                    rate: merchandise.rate,
                    description: merchandise.description,
                    category: merchandise.category,
                    price: merchandise.price,
                    quantity: merchandise.quantity,
                    image: merchandise.image,
                    status: merchandise.status,
                    storeid: merchandise.storeid,
                    store: merchandise.store,
                    carts: merchandise.carts,
                    merchandiseReviews: merchandise.merchandiseReviews,
                },
                store: this.storeData,
            })),
        };
        this.orderService.CreateOrder(this.order).subscribe(
            (res: any) => {
              
                    this.toastr.success("Order Added successfully", res);
                    this.updater();
                
            },
            (error: any) => {
                this.toastr.error("Error Occurred");
            }
        );
    }
    getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the Earth in km
        const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1); 
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = R * c; // Distance in km
        return distance;
    }
    
    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
    
    // Travel time calculation function
    calculateTravelTime(distanceInKm: number): number {
        const timePerKm = 5; // 5 minutes per kilometer
        return distanceInKm * timePerKm;
    }
   
    getLatestOrderUpdate() {
        // Call initially
        this.orderService.GetOrders().subscribe((res) => {
            if (res) {
                if( res.filter(
                    (data) =>
                        data.consumerid ==
                        this.consumerData.consumerid
                ).length > 0){
                    this.currentOrder = res.filter(
                        (data) =>
                            data.consumerid ==
                            this.consumerData.consumerid
                    )[0];
                    this.currentUser = "consumer";
                    this.markers[0].position= {
                        lat: parseInt(this.currentOrder.locatioN_LATITUDE),
                        lng: parseInt(this.currentOrder.locatioN_LONGITUDE),
                    };
                    this.providerService.getServiceProviderById(this.currentOrder.providerid).subscribe((fullProvider:any)=>{
                        if(fullProvider){
                          this.providerData=fullProvider;
                          if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition((position) => {
                                  if (position) {
                                     
                                      
                                             
                                            this.providerData.locatioN_LATITUDE =
                                            position.coords.latitude.toString();
                                        this.providerData.locatioN_LONGITUDE =
                                            position.coords.longitude.toString();
                                            this.markers[1].position= {
                                                lat: parseInt(this.providerData.locatioN_LATITUDE),
                                                lng: parseInt(this.providerData.locatioN_LONGITUDE),
                                            };
                                            this.estimatedTime= this.getDistanceFromLatLonInKm(this.markers[0].position.lat,this.markers[0].position.lng,this.markers[1].position.lat,this.markers[1].position.lng);
                                            this.estimatedTime=parseInt(this.estimatedTime)
                                              
                                         
                                         
                                  }
                              });
                          } else {
                              alert("Geolocation is not supported by this browser.");
                          }
                        }
                      })
                }else {
                    this.providerService.getGetProviderStoreInfoByConsumerID(this.consumerData.consumerid).subscribe(provider=>{
                       if(provider){
                        this.providerData=provider;
                        if(res.filter(
                            (data) =>
                                data.providerid ==
                                this.providerData.providerid
                        ).length > 0){
                            this.currentUser = "provider"; 
                            this.currentOrder = res.filter(
                                (data) =>
                                    data.providerid ==
                                    this.providerData.providerid
                            )[0];
                           
                            this.providerService.getServiceProviderById(this.providerData.providerid).subscribe((fullProvider:any)=>{
                              if(fullProvider){
                                this.providerData=fullProvider;
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition((position) => {
                                        if (position) {
                                            this.providerData.locatioN_LATITUDE =
                                                position.coords.latitude.toString();
                                            this.providerData.locatioN_LONGITUDE =
                                                position.coords.longitude.toString();
                                               
                                                this.profileService.updateServiceProvider(this.providerData).subscribe(res=>{
                                                   
                                                        this.markers[0].position= {
                                                            lat: parseInt(this.currentOrder.locatioN_LATITUDE),
                                                            lng: parseInt(this.currentOrder.locatioN_LONGITUDE),
                                                        };
                                                        this.markers[1].position= {
                                                            lat: parseInt(this.providerData.locatioN_LATITUDE),
                                                            lng: parseInt(this.providerData.locatioN_LONGITUDE),
                                                        };
                                                        this.estimatedTime= this.getDistanceFromLatLonInKm(this.markers[0].position.lat,this.markers[0].position.lng,this.markers[1].position.lat,this.markers[1].position.lng);
                                                        this.estimatedTime=parseInt(this.estimatedTime)
                                                    
                                                });
                                               
                                        }
                                    });
                                } else {
                                    alert("Geolocation is not supported by this browser.");
                                }
                              }
                            })
                          
                        }
                       }
                    })
                }
               
            }
        });
    
        interval(8000) 
            .subscribe(() => {
                this.orderService.GetOrders().subscribe((res) => {
                    if (res) {
                        if( res.filter(
                            (data) =>
                                data.consumerid ==
                                this.consumerData.consumerid
                        ).length > 0){
                            this.currentOrder = res.filter(
                                (data) =>
                                    data.consumerid ==
                                    this.consumerData.consumerid
                            )[0];
                            this.currentUser = "consumer";
                            this.markers[0].position= {
                                lat: parseInt(this.currentOrder.locatioN_LATITUDE),
                                lng: parseInt(this.currentOrder.locatioN_LONGITUDE),
                            };
                            this.providerService.getServiceProviderById(this.currentOrder.providerid).subscribe((fullProvider:any)=>{
                                if(fullProvider){
                                  this.providerData=fullProvider;
                                  if (navigator.geolocation) {
                                      navigator.geolocation.getCurrentPosition((position) => {
                                          if (position) {
   
                                                        this.providerData.locatioN_LATITUDE =
                                                        position.coords.latitude.toString();
                                                    this.providerData.locatioN_LONGITUDE =
                                                        position.coords.longitude.toString();
                                                        
                                                        this.markers[1].position= {
                                                            lat: parseInt(this.providerData.locatioN_LATITUDE),
                                                            lng: parseInt(this.providerData.locatioN_LONGITUDE),
                                                        };
                                                        this.estimatedTime= this.getDistanceFromLatLonInKm(this.markers[0].position.lat,this.markers[0].position.lng,this.markers[1].position.lat,this.markers[1].position.lng);
                                                        this.estimatedTime=parseInt(this.estimatedTime)
                                                      
                                              
                                                 
                                          }
                                      });
                                  } else {
                                      alert("Geolocation is not supported by this browser.");
                                  }
                                }
                              })
                        }else {
                            this.providerService.getGetProviderStoreInfoByConsumerID(this.consumerData.consumerid).subscribe(provider=>{
                               if(provider){
                                this.providerData=provider;
                                if(res.filter(
                                    (data) =>
                                        data.providerid ==
                                        this.providerData.providerid
                                ).length > 0){
                                    this.currentUser = "provider"; 
                                    this.currentOrder = res.filter(
                                        (data) =>
                                            data.providerid ==
                                            this.providerData.providerid
                                    )[0];
                                   
                                    this.providerService.getServiceProviderById(this.providerData.providerid).subscribe((fullProvider:any)=>{
                                      if(fullProvider){
                                        this.providerData=fullProvider;
                                        if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition((position) => {
                                                if (position) {
                                                    this.providerData.locatioN_LATITUDE =
                                                        position.coords.latitude.toString();
                                                    this.providerData.locatioN_LONGITUDE =
                                                        position.coords.longitude.toString();
                                                        this.profileService.updateServiceProvider(this.providerData).subscribe(res=>{
                                                           
                                                                this.markers[0].position= {
                                                                    lat: parseInt(this.currentOrder.locatioN_LATITUDE),
                                                                    lng: parseInt(this.currentOrder.locatioN_LONGITUDE),
                                                                };
                                                                this.markers[1].position= {
                                                                    lat: parseInt(this.providerData.locatioN_LATITUDE),
                                                                    lng: parseInt(this.providerData.locatioN_LONGITUDE),
                                                                };
                                                                this.estimatedTime= this.getDistanceFromLatLonInKm(this.markers[0].position.lat,this.markers[0].position.lng,this.markers[1].position.lat,this.markers[1].position.lng);
                                                        this.estimatedTime=parseInt(this.estimatedTime)
                                                            
                                                        });
                                                       
                                                }
                                            });
                                        } else {
                                            alert("Geolocation is not supported by this browser.");
                                        }
                                      }
                                    })
                                  
                                }
                               }
                            })
                        }
                       
                    }
                });
            });
    }
    endOrder(){
        let finishedOrder;
        this.orderService.GetOrders().subscribe((res) => {
            if (res) {

                this.transactionService
                    .getAllBanks()
                    .subscribe((resBank) =>  {
                      if(resBank){
                        this.paymentCreditntails =resBank.filter(bank=>bank.consumerid==this.providerData.consumerid)[0];
                        finishedOrder=res.filter(order=>order.providerid==this.providerData.providerid)[0];
                        this.paymentCreditntails.balance =  parseFloat(this.paymentCreditntails.balance) + parseFloat(finishedOrder.totalamount);
                        this.transactionService.UpdateBank(this.paymentCreditntails);
                        this.orderService.deleteOrder(finishedOrder.orderid)
                      }
                    });

                    
            }
        });
    }
    updater() {
        this.orderService.GetOrders().subscribe((res) => {
            if (res) {
                this.transactionService
                    .getAllBanks()
                    .subscribe((res) =>  {
                      if(res){
                        this.paymentCreditntails =res.filter(bank=>bank.consumerid==this.consumerData.consumerid)[0];
                        this.paymentCreditntails.balance =  parseFloat(this.paymentCreditntails.balance) - parseFloat(this.totalPrice);
                        this.transactionService.UpdateBank(this.paymentCreditntails);
                      }
                        
                    });
            }
        });
    }
    getAllStores() {
        this.providerService.getAllStores().subscribe((storeRes) => {
            if (storeRes) {
                this.storeData = storeRes.filter(
                    (store) =>
                        store.storeid == this.allMerchandiseInCart[0].storeid
                )[0];
                this.getAllProviders();
            }
        });
    }
    getCart() {
        this.cartService.currentData.subscribe((data) => {
            if (data) {
                this.allMerchandiseInCart = data;
                this.allMerchandiseInCart.forEach((element) => {
                    this.totalPrice +=
                        parseFloat(element.price) *
                        parseFloat(element.quantity);
                });
                this.getAllStores();
            }
        });
    }
}
