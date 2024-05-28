import { Component, OnInit } from "@angular/core";
import {
    faCcVisa,
    faCcAmex,
    faCcMastercard,
    faCcDiscover,
} from "@fortawesome/free-brands-svg-icons";
import { Observable } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { CheckoutService } from "src/app/services/checkout.service";
import { OrderService } from "src/app/services/order.service";
import { ProfileService } from "src/app/services/profile.service";
import { ProviderService } from "src/app/services/provider.service";
import { StoreService } from "src/app/services/store.service";
@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
    allMerchandiseInCart: any;
    consumerData: any = {};
    providerData: any;
    storeData: any;
    order: any;
    totalPrice: any = 0;
    cartIDSFromDb: any;

    constructor(
        private cartService: CartService,
        private profileService: ProfileService,
        private providerService: ProviderService,
        public storeService: StoreService,
        private checkoutService: CheckoutService,
        public orderService: OrderService
    ) {}
    activeIndex: number = -1;  // Initialize with -1 or any invalid index
    paymentMethods = [
      { imgSrc: 'assets/img/3.png', altText: 'Visa' },
      { imgSrc: 'assets/img/1.png', altText: 'PayPal' },
      { imgSrc: 'assets/img/2.png', altText: 'Master Card' }
    ];
  
    setActive(index: number): void {
      this.activeIndex = index;
    }
    ngOnInit(): void {
        //this.consumerFun();
    }

   
}


