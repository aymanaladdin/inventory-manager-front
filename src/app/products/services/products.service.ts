import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  listProducts(pagingOptions: any) {
    console.log(pagingOptions);

    return this.http.get<IProduct[]>(`${this.baseUrl}/api/products`);
  }

  getProduct(key: string) {
    return this.http.get<IProduct[]>(`${this.baseUrl}/api/products/${key}`);
  }

  createProduct(info: Pick<IProduct, 'name' | 'category' | 'price' | 'quantity' | 'description'>) {
    return this.http.post<IProduct[]>(`${this.baseUrl}/api/products`, info);
  }
}
