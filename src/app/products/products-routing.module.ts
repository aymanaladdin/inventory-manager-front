import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { ProductResolverService } from './services/product-resolver.service';

const routes: Routes = [
  {
    path: '', component: ListProductsComponent,
  },
  {
    path: 'new', component: CreateProductComponent,
  },
  {
    path: ':id', component: ViewProductDetailsComponent,
    resolve: { data: ProductResolverService }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
