import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService :CartService ,private router: Router, private location: Location,private dialog:MatDialog ,private dialogService:DialogService ,private toastr: ToastrService) { }
  
  allMerchandiseInCart:any;
  localData:any;
  consumerId:any;
  ngOnInit(): void {
     
      this.initLocalData();
      this.consumerId=this.localData?.login_ConsumerID || '';
      this.GetMerchanidseInCart();
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
  GetMerchanidseInCart()
  {
    this.cartService.GetMerchanidseInCart(this.consumerId).subscribe(
      (data) => {
        console.log('All Merchindise In Cart:', data); 
        this.allMerchandiseInCart = data;
      },
      (error) => {
        console.error('Error ', error);
      }
    );
  }
  // refreshPage() {
  //   window.location.reload();
  // }
  deleteItem(cartId: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this item from the cart?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cartService.deleteCartItem(cartId).subscribe(
          () => {
            console.log('Item deleted successfully');
            this.GetMerchanidseInCart(); 
            this.toastr.success('Item Deleted Successfully!', 'Success', {
              positionClass: 'toast-top-right', 
              closeButton:true,
              progressBar: true,
              enableHtml: true,
              timeOut: 5000,
              extendedTimeOut: 2000,
            });
          },
          (error) => {
            console.error('Error deleting item:', error);
          }
        );
      } else {
        console.log('User canceled the action');
      }
    });
  }
  
  
}
