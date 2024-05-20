import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  currentData = this.dataSubject.asObservable();
  constructor(private http: HttpClient) { }

  GetMerchanidseInCart(consumerId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7173/api/Cart/GetCartMerchandiseByConsumerID?consumerId=${consumerId}`);
  }

  CreateCartRecord(body: any): Observable<any> {
    return this.http.post('https://localhost:7173/api/Cart/CreateCart', body);
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
addItem(item: any) {
  const currentData = this.dataSubject.value;
  currentData.push(item);
  this.dataSubject.next(currentData);
}
getData() {
  return this.dataSubject.value;
}
}
