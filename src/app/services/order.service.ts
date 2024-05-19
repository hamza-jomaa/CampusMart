import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http:HttpClient) { }
  GetOrders(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Order/GetAllOrders`);
  }
}
