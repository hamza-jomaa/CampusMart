import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  
  constructor(public storeService:StoreService) { }

  ngOnInit(): void {
    
   this.storeService.GetAllStoresFromAllProviders();
  }

}
