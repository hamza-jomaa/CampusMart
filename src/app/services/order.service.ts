import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http:HttpClient, private toastr: ToastrService,private router:Router) { }
  GetOrders(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Order/GetAllOrders`);
  }
  CreateOrder(order:any){
    return this.http.post(environment.backendAPI+environment.Order.base+environment.Order.CreateOrder, order)
  }

  GetConsumerOrdersbyProviderId (id:number): Observable<any[]>
{
  return this.http.get<any[]>(environment.backendAPI+environment.Order.base+environment.Order.GetConsumerOrdersbyProviderId+'?providerID='+id);
}

AcceptOrder (id:number)
{
 
   this.http.put(environment.backendAPI+environment.Order.base+environment.Order.AcceptOrder+'?orderID='+id,id).subscribe(
    (res: any) => {
      this.toastr.success('Order Accepted successfully', res);
    },
    (error: any) => {
      this.toastr.error('Error Occurred');
    }
  );
}

deleteOrder(id:number){
 
    this.http.delete(environment.backendAPI+environment.Order.base+environment.Order.DeleteOrder+'/'+id).subscribe(
        (res: any) => {
          this.toastr.success('Order finished successfully', res);
         
                }, 
        (error: any) => {
          this.toastr.error('Error Occurred');
        }
      );
}
}
