import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.page.html',
  styleUrls: ['./previous-order.page.scss'],
})
export class PreviousOrderPage implements OnInit {

  ordersService: OrdersService;
  orders: Order[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.ordersService = this.router.getCurrentNavigation().extras.state.service;
    }
    this.orders = this.ordersService.getPreviousOrders();
  }

}
