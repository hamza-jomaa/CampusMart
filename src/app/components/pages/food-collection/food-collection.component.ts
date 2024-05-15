import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-food-collection',
  templateUrl: './food-collection.component.html',
  styleUrls: ['./food-collection.component.scss']
})
export class FoodCollectionComponent implements OnInit {

  storeId?: number;
  allMerchandise: any[] = [];
  localData: any;
  quantity: number = 1;
  quantities: { [productId: number]: number } = {};
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private merchandise: MerchandiseService, 
    private cartService: CartService
  ) {
    this.itemFromGroup = new FormGroup({
      productid: new FormControl(""),
      consumerId: new FormControl(""),
      quantity: new FormControl("")
    });
  }
  itemFromGroup: FormGroup;
  
  ngOnInit(): void {
    this.initLocalData();
    this.route.params.subscribe(params => {
      this.storeId = +params['storeId'];

      console.log('storeId:', this.storeId);

      if (this.storeId) {
        this.getAllMerchandiseByStoreId();
      } else {
        console.error('Store ID is not defined');
      }
    });
    
    this.getCartItems();
  }

  getAllMerchandiseByStoreId() {
    this.merchandise.getAllMerchandiseByStoreId(this.storeId).subscribe(
      (data) => {
        console.log('All Merchindise:', data);
        this.allMerchandise = data;
      },
      (error) => {
        console.error('Error fetching All Merchindise:', error);
      }
    );
  }

  initLocalData(): void {
    const localDataString = localStorage.getItem('user');
    if (localDataString) {
      this.localData = JSON.parse(localDataString);
      console.log(this.localData.login_ConsumerID);
    } else {
      console.error('No local data found');
    }
  }

  addToCart(merchandiseId: number) {
    const previousProductId = this.itemFromGroup.value.productid;
    const previousConsumerId = this.itemFromGroup.value.consumerId;
    const productId = merchandiseId || previousProductId;
    const consumerId = this.localData?.login_ConsumerID || previousConsumerId;
    const existingQuantity = this.quantities[merchandiseId];
    const quantity = existingQuantity != null ? existingQuantity : this.quantity;
    const updatedQuantity = existingQuantity != null ? quantity : this.itemFromGroup.value.quantity;
    this.itemFromGroup.patchValue({
      productid: productId,
      consumerId: consumerId,
      quantity: updatedQuantity
    });

    this.cartService.GetMerchanidseInCart(consumerId).subscribe(
      (cartItems: any[]) => {
        const existingCartItem = cartItems.find(item => item.productID === productId);
        if (existingCartItem) {
          const updatedQuantity = quantity + 1; //existingCartItem.quantity +
          this.cartService.updateCartItem(existingCartItem.cartID, updatedQuantity, existingCartItem.consumerID, existingCartItem.productID).subscribe(
            (resp: any) => {
              console.log(resp);
              window.location.reload();
            },
            (error: any) => {
              console.error(error);
            }
          );
        }
        else {
          this.cartService.CreateCartRecord(this.itemFromGroup.value).subscribe(
            (resp: any) => {
              console.log(resp);
              window.location.reload();
            },
            (error: any) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
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
    const consumerId = this.localData?.login_ConsumerID || '';
    this.cartService.GetMerchanidseInCart(consumerId).subscribe(
      (cartItems: any[]) => {
        console.log('Cart Items:', cartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }
}
