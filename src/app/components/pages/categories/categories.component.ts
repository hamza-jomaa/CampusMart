import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  searchText: string = '';
  pickedStore:any;
  constructor(private router: Router,public storeService:StoreService,private cartService :CartService) { }
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
   this.storeService.GetAllStoresFromAllProviders();
   this.cartService.currentData.subscribe((res) => {
    console.log(res)
    if(res){
      this.pickedStore=res[0].storeid;
    }
    
   });
  }
  navigateToShopDetail(store: any) {
      this.router.navigate(['/food-collection', store.storeid]);
      this.cartService.setStore(store);

  }
}
