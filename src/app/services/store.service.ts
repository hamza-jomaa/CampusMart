import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  All_Stores_From_All_Providers: any=[{}]; 
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
  createStore(Store:any){
    Store.image=this.display_image
    console.log(Store.image)
    this.http.post(environment.backendAPI+environment.Store.base+environment.Store.CreateStore, Store).subscribe(
      (resp: any) => {
        this.toastr.success('Store added successfully', resp);
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
      }
    );
  }
  uploadStoreImage(file: FormData) {
   debugger
    this.http.post('https://localhost:7173/api/Store/uploadStoreImage', file).subscribe((resp: any) => {
  this.display_image = resp.image;
//   this.toastr.success("Image Uploaded Successfully");
},
  (error: any) => {
   // this.toastr.error("Error Occured");
  })
}
}
