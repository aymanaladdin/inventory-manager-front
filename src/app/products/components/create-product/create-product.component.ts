import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  productControls: any;

  constructor(private productsService: ProductsService, private router: Router, private alertService: AlertService) {

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    });
    this.productControls = this.productForm.controls;
  }

  ngOnInit(): void {
  }
  createProduct(): void {
    this.productsService.createProduct(this.productForm.value).toPromise()
      .then(res => {
        this.router.navigate(['./products']);
        this.alertService.snackbar(`Product created successfully.`, null, 3000);
      })
      .catch(err => {
        this.alertService.snackbar(`Failed to login. Error ${err.status} - ${JSON.stringify(err.error)}`, null, 3000);
      })
  }

}
