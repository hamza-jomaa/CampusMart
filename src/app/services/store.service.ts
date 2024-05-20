import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  All_Stores_From_All_Providers: any=[{}]; 
  All_Stores: any=[{}]; 
  display_image: any;

  GetAllStoresFromAllProviders() {
   
  this.http.get('https://localhost:7173/api/Store/GetAllStoresFromAllProviders').subscribe((resp:any) => { 
        this.All_Stores_From_All_Providers = resp;
      },
      (error) => {
        console.error("Failed to fetch GetAllStoresFromAllProviders: ", error); 
        console.log(error.message);
        console.log(error.status);
      }
    );

  }
  GetAllStores() {
   
    this.http.get('https://localhost:7173/api/Store/GetAllStores').subscribe((resp:any) => { 
          this.All_Stores = resp;
        },
        (error) => {
          console.error("Failed to fetch GetAllStores: ", error); 
          console.log(error.message);
          console.log(error.status);
        }
      );
  
    }
  uploadStoreImage(file: FormData) {
    this.http.post('https://localhost:7173/api/Store/uploadStoreImage', file).subscribe((resp: any) => {
  this.display_image = resp.image;
//   this.toastr.success("Image Uploaded Successfully");
},
  (error: any) => {
   // this.toastr.error("Error Occured");
  })
}
}
