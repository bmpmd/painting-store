import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  apiurl = environment.apiUrl + '/cart';
  constructor(private httpClient: HttpClient) {}

  getCart(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiurl);
  }

  addToCart(product: Product):Observable<Product[]>{
    return this.httpClient.post<Product[]>(this.apiurl, product)
  }

  clearCart(): Observable<void>{
    return this.httpClient.delete<void>(this.apiurl)
  }
}
