import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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


}
