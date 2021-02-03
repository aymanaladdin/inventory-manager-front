import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent implements OnInit {
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.data;
  }

  formatDate(date: string) {
    return moment(date).format('DD, MMM YYYY, hh:mm A');
  }

  timeAgo(date: string) {
    return moment(date).fromNow();
  }

}
