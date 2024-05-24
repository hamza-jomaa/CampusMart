import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { MerchandiseService } from "src/app/services/merchandise.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProviderService } from "src/app/services/provider.service";

@Component({
    selector: "app-food-collection",
    templateUrl: "./food-collection.component.html",
    styleUrls: ["./food-collection.component.scss"],
})
export class FoodCollectionComponent implements OnInit {
    storeData?: any;
    allMerchandise: any[] = [];
    allMerchandiseInCart: any[] = [];
    localData: any;
    quantities: { [key: number]: number } = {}; // Using an object to track quantities by merchandise ID
    carts: any[] = [];
    itemFromGroup: FormGroup;
    merchandise: any;
    showCart: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private merchandiseService: MerchandiseService,
        private cartService: CartService,
        private toastr: ToastrService,
        private providerService: ProviderService
    ) {
        this.itemFromGroup = new FormGroup({
            productid: new FormControl(""),
            consumerId: new FormControl(""),
            quantity: new FormControl(""),
        });
    }

    ngOnInit(): void {
        this.initLocalData();
        this.cartService.storeID.subscribe((res) => {
            this.storeData = res;
            if (this.storeData?.storeid) {
                this.getAllMerchandiseByStoreId();
            } else {
                console.error("Store ID is not defined");
            }
        });

        this.cartService.currentData.subscribe(data => {
            this.allMerchandiseInCart = data;
        });
    }

    getAllMerchandiseByStoreId() {
        this.providerService.getAllMerchandise().subscribe(
            (data) => {
                this.allMerchandise = data.filter(
                    (merch) => merch.storeid == this.storeData?.storeid
                );
                // Initialize quantities for each merchandise
                this.allMerchandise.forEach(merch => {
                    this.quantities[merch.productid] = 1;
                });
            },
            (error) => {
                console.error("Error fetching All Merchandise:", error);
            }
        );
    }

    initLocalData(): void {
        const localDataString = localStorage.getItem("user");
        if (localDataString) {
            this.localData = JSON.parse(localDataString);
        } else {
            console.error("No local data found");
        }
    }

    addToCart(merchandiseId: number) {
        this.merchandiseService.getMerchandiseById(merchandiseId).subscribe((res) => {
            if (res) {
                this.merchandise = res;
                this.merchandise.quantity = this.quantities[merchandiseId]; // Get quantity from object
                this.cartService.currentData.subscribe(res => {
                    if (res?.length > 0) {
                        if (!this.includesProductid(res, this.merchandise.productid)) {
                            this.cartService.addItem(this.merchandise);
                        }
                    } else {
                        this.cartService.addItem(this.merchandise);
                    }
                });
            }
        });
        this.showCart = true;
    }

    includesProductid(array, productid) {
        return array.some(item => item?.productid === productid);
    }

    decreaseQuantity(merchandiseId: number): void {
        if (this.quantities[merchandiseId] > 0) {
            this.quantities[merchandiseId] -= 1;
        }
    }

    increaseQuantity(merchandiseId: number): void {
        this.quantities[merchandiseId] += 1;
    }

    getCartItems() {
        const consumerId = this.localData?.login_ConsumerID || "";
        this.cartService.GetMerchanidseInCart(consumerId).subscribe(
            (cartItems: any[]) => {
                // Handle the cart items
            },
            (error) => {
                console.error("Error fetching cart items:", error);
            }
        );
    }
    
    deleteItem(merchandise: any): void {
        this.cartService.removeItem(merchandise.productid);
        const index = this.allMerchandiseInCart.findIndex(item => item === merchandise);
        if (index !== -1) {
        this.allMerchandiseInCart.splice(index, 1);
    }
        this.toastr.success('Item Removed from Cart', 'Success');
    }
    updateCart(merchandise: any): void {
        this.cartService.updateItem(merchandise);
    }
    
    calculateTotal(): number {
        return this.allMerchandiseInCart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
