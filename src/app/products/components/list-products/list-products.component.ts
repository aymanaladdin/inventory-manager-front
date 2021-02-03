import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IProduct } from '../../interfaces';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] | undefined;
  dataSource: IProduct[] | undefined;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['key', 'name', 'price', 'category', 'quantity', 'createdAt', 'updatedAt', 'actions'];

    this.productsService.listProducts({})
      .subscribe((response: any) => {
        this.dataSource = response;
      })
  }

  deleteRowData(key: string) {
    console.log(key)
  }

  formatDate(date: string) {
    return moment(date).format('DD, MMM YYYY, hh:mm A');
  }

}

