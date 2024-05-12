import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {

  constructor(private http:HttpClient) { }
  getAllMerchandiseByStoreId(storeId:number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Merchandise/GetMerchandiseInfoByStoreID?storeId=${storeId}`);
  }
}
