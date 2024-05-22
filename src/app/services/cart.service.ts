import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  currentData = this.dataSubject.asObservable();
  private storeId= new BehaviorSubject<any>(null);
  storeID = this.storeId.asObservable();
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  GetMerchanidseInCart(consumerId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Cart/GetCartMerchandiseByConsumerID?consumerId=${consumerId}`);
  }

  CreateCartRecord(body: any[]): Observable<any> {
  return this.http.post(environment.backendAPI+environment.Cart.base+environment.Cart.CreateCart, body)
  }
  GetAllCarts(){
    return this.http.get(environment.backendAPI+environment.Cart.base+environment.Cart.GetAllCarts);
  }
  updateCartItem(cartId: number, quantity: number, total: number, consumerId: number, productId: number): Observable<any> {
    const body = {
      cartId: cartId,
      quantity: quantity,
      total:total,
      consumerId: consumerId,
      productId: productId
    };
    return this.http.put<any>('https://localhost:7173/api/Cart/UpdateCart', body);
}

deleteCartItem(cartId: number): Observable<any> {
  return this.http.delete<any>(`https://localhost:7173/api/Cart/DeleteCart/${cartId}`);
}
setData(data: any[]) {
  this.dataSubject.next(data);
}
setStoreId(data: any) {
  this.storeId.next(data);
}
getStoreId() { 
  return this.storeId.value;
}
addItem(item: any) {
  const currentData = this.dataSubject.value;
  currentData.push(item);
  this.dataSubject.next(currentData);
}
removeItem(item: any) {
  const currentData = this.dataSubject.value;
  const updatedData = currentData.filter(i => i !== item);
  this.dataSubject.next(updatedData);
}
getData() {
  return this.dataSubject.value;
}
}
