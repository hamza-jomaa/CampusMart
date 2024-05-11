import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-food-collection',
  templateUrl: './food-collection.component.html',
  styleUrls: ['./food-collection.component.scss']
})
export class FoodCollectionComponent implements OnInit {

  storeId?: number;
  allMerchandise: any[] = [];
  constructor(private route: ActivatedRoute,private merchandise:MerchandiseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storeId = +params['storeId'];

      console.log('storeId:', this.storeId);

      if (this.storeId) {
        this.getAllMerchandiseByStoreId();
      } else {
        console.error('Book ID is not defined');
        // Handle the error, e.g., redirect or show a message
      }
    });
  }

  getAllMerchandiseByStoreId(){
    this.merchandise.getAllMerchandiseByStoreId(this.storeId).subscribe(
      (data) => {
        console.log('All Merchindise:', data); 
        this.allMerchandise = data;
      },
      (error) => {
        console.error('Error fetching pending testimonials:', error);
      }
    );
  }
}
