import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {

  constructor(private http:HttpClient) { }

  display_image: any;

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
}
