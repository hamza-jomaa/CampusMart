import { Component ,OnInit} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProfileService } from '../services/profile.service';
import { ProviderService } from '../services/provider.service';
import { StoreService } from '../services/store.service';
import { OrderService } from '../services/order.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.scss']
})
export class TrackorderComponent implements OnInit{
  allMerchandiseInCart: any;
  consumerData: any = {};
  providerData: any;
  storeData: any;
  order: any;
  totalPrice: any = 0;
  cartIDSFromDb: any;
constructor(  private cartService: CartService,
  private profileService: ProfileService,
  private providerService: ProviderService,
  public storeService: StoreService,
  private checkoutService: CheckoutService,
  public orderService: OrderService){}
markers: any[] = [];
location: any[] = [sessionStorage.getItem('LAT'), sessionStorage.getItem('LONG')];
ngOnInit(): void {
  this.consumerFun();
  this.markers = [
    {
      position: { lat: parseInt(this.location[0]), lng: parseInt(this.location[1]) },
      visible: true,
      opacity: 1,

      title: 'You',
      options: {
        draggable: true,
        icon: '../assets/img/loc1.png'
      }
    },
    // {
    //   position: { lat: this.data.latitude, lng: this.data.longitude },
    //   visible: true,
    //   opacity: 1,

    //   title: this.data.name,
    //   options: {
    //     draggable: false,
    //     icon: '../assets/img/loc2.png'
    //   }
    // }
  ]
}
display:any;
center: google.maps.LatLngLiteral={lat :32.494162 , lng :35.991040 };
zoom=14;
moveMap(event: google.maps.MapMouseEvent){
  if(event.latLng!=null)
  this.center=(event.latLng.toJSON());
}
move(event:google.maps.MapMouseEvent){
  if(event.latLng!=null)
  this.display=event.latLng.toJSON();

}
consumerFun() {
  this.checkoutService.userData$.subscribe((res) => {
      if (res) {
          this.consumerData = res;
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
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
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
      reject('Geolocation is not supported by this browser.');
    }
  });
}

getAllProviders() {

  this.providerService
      .GetAllServiceProviders()
      .subscribe((providerRes: any) => {
    if(providerRes){
   
      this.providerData = providerRes.filter(
          (provider) =>
              provider.providerid == this.storeData.providerid
      )[0];
      
      if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition((position) => {
            if(position){
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
                  merchandiseReviews: merchandise.merchandiseReviews,
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
          const createCartObservable = this.cartService.CreateCartRecord(this.allMerchandiseInCart[i]);
          createCartPromises.push(observableToPromise(createCartObservable));
      }
      Promise.all(createCartPromises)
      .then((results) => {
          const anyNull = results.some(res => res == null);
          if (anyNull) {
              this.orderFun();
          }
      })
      .catch((error) => {
          console.error('Error creating cart records:', error);
      });
  }
      });
}
orderFun(){
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
  this.cartService.GetAllCarts().subscribe(res=>{
      if(res){
          this.cartIDSFromDb=res;
          this.cartIDSFromDb=this.cartIDSFromDb.filter(cart=>cart.consumerid==this.consumerData.consumerid&&cart.storeid==this.storeData.storeid);
          for (let i = 0; i < this.allMerchandiseInCart.length; i++) {
              this.allMerchandiseInCart[i].cartid = this.cartIDSFromDb[i].cartid;
          }
      }
      
     });
      this.order = {
          consumerid: this.consumerData.consumerid,
          providerid: this.providerData?.providerid,
          totalamount: this.totalPrice,
          consumer: {
              locationLatitude: this.consumerData.locationLatitude.toString(),
              locationLongitude: this.consumerData.locationLongitude.toString(),
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
              campusserviceproviders: this.consumerData.campusserviceproviders,
              carts: this.consumerData.carts,
              logins: this.consumerData.logins,
              merchandiseReviews: this.consumerData.merchandiseReviews,
              orders: this.consumerData.orders,
              specialrequests: this.consumerData.specialrequests,
              storeReviews: this.consumerData.storeReviews,
              testimonials: this.consumerData.testimonials
          },
          provider: this.providerData,
          location: null,
          locationLatitude: this.consumerData.locationLatitude.toString(),
          locationLongitude: this.consumerData.locationLongitude.toString(),
          deliveryaddress: null,
          orderdate: formattedDate,
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
        this.orderService.CreateOrder(this.order);
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
