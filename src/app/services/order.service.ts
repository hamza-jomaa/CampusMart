import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http:HttpClient, private toastr: ToastrService) { }
  GetOrders(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Order/GetAllOrders`);
  }
  CreateOrder(order:any){
    console.log('order',order)
    this.http.post(environment.backendAPI+environment.Order.base+environment.Order.CreateOrder, order).subscribe(
        (res: any) => {
          this.toastr.success('Order Added successfully', res);
        },
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
  }
}
