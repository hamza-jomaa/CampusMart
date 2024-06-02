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
import { TransactionService } from "src/app/services/transaction.service";
@Component({
    selector: "app-payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
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
        public orderService: OrderService, private transactionService: TransactionService
    ) { }
    activeIndex: number = -1;  // Initialize with -1 or any invalid index
    paymentMethods = [
        { imgSrc: 'assets/img/3.png', altText: 'Visa' },
        { imgSrc: 'assets/img/1.png', altText: 'PayPal' },
        { imgSrc: 'assets/img/2.png', altText: 'Master Card' }
    ];
    paymentCreditntails: any = {};
    setActive(index: number): void {
        this.activeIndex = index;

    }
    ngOnInit(): void {

        this.checkoutService.userData$.subscribe((res) => {
            if (res) {
                this.consumerData = res;
                this.paymentCreditntails.consumerid = res.consumerid;
                if (this.consumerData.banks.length == 0) {
                    //this.paymentCreditntails.balance = 500;
                }
                else {
                    this.transactionService.getAllBanks().subscribe((result) => {
                        this.paymentCreditntails = result.filter((bank: any) => bank.consumerid == this.consumerData.consumerid)[0];
                    })
                }
                //  this.getCart();
            }
        });

    }
    submitForm() {
        if (this.consumerData.banks.length == 0) {
            this.paymentCreditntails.username = this.paymentMethods[this.activeIndex].altText;
            this.transactionService.CreateBank(this.paymentCreditntails);

        }
        else {
            //handle 
            this.transactionService.getAllBanks().subscribe((allBanks: any) => {
                this.paymentCreditntails.bankid = allBanks.filter(bankFil => bankFil.consumerid == this.consumerData.consumerid)[0].bankid;
                this.transactionService.UpdateBank(this.paymentCreditntails);
            })
        }
    }

}


