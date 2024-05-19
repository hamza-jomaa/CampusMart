import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  searchText: string = '';
  constructor(private router: Router,public storeService:StoreService) { }
  ngOnInit(): void {
   this.storeService.GetAllStoresFromAllProviders();
  }
  navigateToShopDetail(storeId: number) {
      this.router.navigate(['/food-collection', storeId]);
  }
}
