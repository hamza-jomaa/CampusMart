import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from "src/app/mat-confirm-dialog/mat-confirm-dialog.component";
@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
    constructor(
        private cartService: CartService,
        private router: Router,
        private location: Location,
        private dialog: MatDialog,
        private dialogService: DialogService,
        private toastr: ToastrService
    ) {}
    allMerchandiseInCart: any;
    localData: any;
    consumerId: any;
    storeData: any='';
    ngOnInit(): void {
        this.cartService.storeID.subscribe((res) => {
            this.storeData = res;//.storeid
        });
        this.initLocalData();
        this.consumerId = this.localData?.login_ConsumerID || "";
        //   this.GetMerchanidseInCart();
        this.cartService.currentData.subscribe((data) => {
            this.allMerchandiseInCart = data;
            
        });
    }
    initLocalData(): void {
        const localDataString = localStorage.getItem("user");
        if (localDataString) {
            this.localData = JSON.parse(localDataString);
        } else {
            console.error("No local data found");
        }
    }
    GetMerchanidseInCart() {
        this.cartService.GetMerchanidseInCart(this.consumerId).subscribe(
            (data) => {
            },
            (error) => {
                console.error("Error ", error);
            }
        );
    }
    deleteItem(merchandise: any) {
        this.cartService.removeItem(merchandise.productid);
        const index = this.allMerchandiseInCart.findIndex(item => item === merchandise);
        if (index !== -1) {
        this.allMerchandiseInCart.splice(index, 1);
    }
        this.toastr.success('Item Removed from Cart', 'Success');
    }

    calculateTotal(): number {
        let total = 0;
        if (this.allMerchandiseInCart) {
            for (let item of this.allMerchandiseInCart) {
                total += item.price * item.quantity;
            }
        }
        return total;
    }

    increaseCartQuantity(merchandise: any): void {
        if (merchandise.quantity < 10) { // Example limit check
            merchandise.quantity += 1;
          
        }
    }

    decreaseCartQuantity(merchandise: any): void {
        if (merchandise.quantity > 1) {
            merchandise.quantity -= 1;
            
        }
    }

   

}
