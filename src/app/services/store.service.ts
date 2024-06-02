import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteReuseStrategy, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 

  constructor(private http: HttpClient, private toastr:ToastrService, private router:Router) { }

  All_Stores_From_All_Providers: any=[{}]; 
  All_Stores: any=[{}]; 
  display_image: any;
  private storeData= new BehaviorSubject<any>(null);
  storeData$ = this.storeData.asObservable();
  GetAllStoresFromAllProviders() {
   
  this.http.get('https://localhost:7173/api/Store/GetAllStoresFromAllProviders').subscribe((resp:any) => { 
        this.All_Stores_From_All_Providers = resp;
      },
      (error) => {
        console.error("Failed to fetch GetAllStoresFromAllProviders: ", error); 
      }
    );

  }


  GetAllStores() {
   
    this.http.get('https://localhost:7173/api/Store/GetAllStores').subscribe((resp:any) => { 
          this.All_Stores = resp;
        },
        (error) => {
          console.error("Failed to fetch GetAllStores: ", error); 
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

setStoreData(storeData:any){
  this.storeData.next(storeData);
}

createStore(Store:any){
Store.image=this.display_image
  this.http.post(environment.backendAPI+environment.Store.base+environment.Store.CreateStore, Store).subscribe(
    (resp: any) => {
      this.toastr.success('Store request sent successfully', resp);
      this.toastr.warning('Wait admin acceptance');
     
      
    },
    (error: any) => {
      this.toastr.error('Error Occurred');
    }
  );
}

UpdateStore(Store:any){
 
  if(this.display_image!=undefined)
Store.image=this.display_image
  this.http.put(environment.backendAPI+environment.Store.base+environment.Store.UpdateStore, Store).subscribe(
    (resp: any) => {
      this.toastr.success('Store Updated successfully', resp);
      window.location.reload();
      
    },
    (error: any) => {
      this.toastr.error('Error Occurred');
    }
  );
}

GetAllCategoriesByStoreID (id:number): Observable<any[]>
{
  return this.http.get<any[]>(environment.backendAPI+environment.Store.base+environment.Store.GetAllCategoriesByStoreID+'?storeID='+id);
}

}
