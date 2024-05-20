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
    storeId?: number;
    allMerchandise: any[] = [];
    localData: any;
    quantity: number = 1;
    quantities: { [productId: number]: number } = {};
    carts: any[]=[];
    itemFromGroup: FormGroup;

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
        this.route.params.subscribe((params) => {
            this.storeId = +params["storeId"];
            if (this.storeId) {
                this.getAllMerchandiseByStoreId();
            } else {
                console.error("Store ID is not defined");
            }
        });
        //  this.getCartItems();
       
    }

    getAllMerchandiseByStoreId() {
        this.storeId;
        this.providerService.getAllMerchandise().subscribe(
            (data) => {
                this.allMerchandise = data.filter(
                    (merch) => merch.storeid == this.storeId
                );
                console.log("this.allMerchandise", this.allMerchandise);
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
      this.merchandiseService.getMerchandiseById(merchandiseId).subscribe(res=>{
        // this.carts.push(res);
        this.cartService.addItem(res);
        
      })
      
        // const previousProductId = this.itemFromGroup.value.productid;
        // const previousConsumerId = this.itemFromGroup.value.consumerId;
        // const productId = merchandiseId || previousProductId;
        // const consumerId =
        //     this.localData?.login_ConsumerID || previousConsumerId;
        // const existingQuantity = this.quantities[merchandiseId];
        // const quantity =
        //     existingQuantity != null ? existingQuantity : this.quantity;
        // const updatedQuantity =
        //     existingQuantity != null
        //         ? quantity
        //         : this.itemFromGroup.value.quantity;

        // // Find the merchandise item to get the price
        // const merchandiseItem = this.allMerchandise.find(
        //     (item) => item.productid === productId
        // );

        // if (merchandiseItem && merchandiseItem.price !== undefined) {
        //     const price = merchandiseItem.price;
        //     const total = updatedQuantity * price;

        //     this.itemFromGroup.patchValue({
        //         productid: productId,
        //         consumerId: consumerId,
        //         quantity: updatedQuantity,
        //     });

        //     this.cartService.GetMerchanidseInCart(consumerId).subscribe(
        //         (cartItems: any[]) => {
        //             const existingCartItem = cartItems.find(
        //                 (item) => item.productID === productId
        //             );

        //             if (existingCartItem) {
        //                 const updatedQuantity = quantity + 1;
        //                 const updatedTotal = updatedQuantity * price;

        //                 this.cartService
        //                     .updateCartItem(
        //                         existingCartItem.cartID,
        //                         updatedQuantity,
        //                         updatedTotal,
        //                         existingCartItem.consumerID,
        //                         existingCartItem.productID
        //                     )
        //                     .subscribe(
        //                         (resp: any) => {
        //                             console.log(resp);
        //                             window.location.reload();
        //                         },
        //                         (error: any) => {
        //                             console.error(error);
        //                         }
        //                     );
        //             } else {
        //                 const newCartItem = {
        //                     ...this.itemFromGroup.value,
        //                     total: total,
        //                 };

        //                 this.cartService
        //                     .CreateCartRecord(newCartItem)
        //                     .subscribe(
        //                         (resp: any) => {
        //                             console.log(resp);
        //                             window.location.reload();
        //                         },
        //                         (error: any) => {
        //                             console.error(error);
        //                         }
        //                     );
        //             }
        //         },
        //         (error) => {
        //             console.error("Error fetching cart items:", error);
        //         }
        //     );
        // } else {
        //     console.error("Price is undefined for the merchandise item");
        // }
    }

    decreaseQuantity(productId: number): void {
        if (this.quantities[productId] > 1) {
            this.quantities[productId]--;
        }
    }

    increaseQuantity(productId: number): void {
        this.quantities[productId] = (this.quantities[productId] || 0) + 1;
    }

    getCartItems() {
        const consumerId = this.localData?.login_ConsumerID || "";
        this.cartService.GetMerchanidseInCart(consumerId).subscribe(
            (cartItems: any[]) => {
                console.log("Cart Items:", cartItems);
            },
            (error) => {
                console.error("Error fetching cart items:", error);
            }
        );
    }
}
