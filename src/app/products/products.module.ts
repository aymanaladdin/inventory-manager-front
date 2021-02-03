import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [ListProductsComponent, ViewProductDetailsComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class ProductsModule { }
