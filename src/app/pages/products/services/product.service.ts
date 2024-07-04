import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // getProduct(): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseUrl);
  // }

  getAllProducts(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.baseUrl);
  }

  getSingleProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getProductsByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
