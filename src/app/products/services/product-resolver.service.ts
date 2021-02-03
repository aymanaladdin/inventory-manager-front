import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolverService {

  constructor(private productsService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.productsService.getProduct(route.params.id);
  }

}
