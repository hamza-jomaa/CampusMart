import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  All_Stores_From_All_Providers: any=[{}]; 
  

  GetAllStoresFromAllProviders() {
   
  this.http.get('https://localhost:7173/api/Store/GetAllStoresFromAllProviders').subscribe((resp:any) => { 
        this.All_Stores_From_All_Providers = resp;
        console.log(this.All_Stores_From_All_Providers);
      },
      (error) => {
        console.error("Failed to fetch GetAllStoresFromAllProviders: ", error); 
        console.log(error.message);
        console.log(error.status);
      }
    );

  }

}
