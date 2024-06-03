import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {

  constructor(private http:HttpClient, private toastr:ToastrService) { }

  display_image: any;

  createMerchandise(merchandise:any){
    merchandise.image=this.display_image;
    this.http.post(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.CreateMerchandise, merchandise).subscribe(
      (resp: any) => {
        this.toastr.success('Merchandise Request sent to admon successfully', resp);
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
      }
    );
  }
  getAllMerchandiseByStoreId(storeId:number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Merchandise/GetMerchandiseInfoByStoreID?storeId=${storeId}`);
  }
 
  uploadMerchandiseImage(file: FormData) {
    this.http.post('https://localhost:7173/api/Merchandise/uploadMerchandiseImage', file).subscribe((resp: any) => {
  
    this.display_image = resp.image;
//   this.toastr.success("Image Uploaded Successfully");
},
  (error: any) => {
   // this.toastr.error("Error Occured");
  })
}
getMerchandiseById(id:number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7173/api/Merchandise/GetMerchandiseById/${id}`);
}
GetMerchandiseByStoreID(id:number): Observable<any[]>
{
  return this.http.get<any[]>(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.GetMerchandiseByStoreID+'?storeId='+id);
}
updateMerchandise(merchandise:any){
  if(this.display_image!=undefined)
    merchandise.image=this.display_image
  this.http.put(environment.backendAPI+environment.Merchandise.base+environment.Merchandise.UpdateMerchandise, merchandise).subscribe(
      (res: any) => {
        this.toastr.success('Merchandise updated successfully', res);
      },
      (error: any) => {
        this.toastr.error('Error Occurred');
      }
    );
}
}
