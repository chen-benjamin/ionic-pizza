import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {

  ordersService: OrdersService;
  orders: Order[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.ordersService = this.router.getCurrentNavigation().extras.state.service;
    }
  }

  goCurrentOrder(event: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        service: this.ordersService
      }
    };
    this.router.navigate(['current-order'], navigationExtras);
  }

  goPreviousOrder(event: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        service: this.ordersService
      }
    };
    this.router.navigate(['previous-order'], navigationExtras);
  }

  goUpdateOrder(event: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        service: this.ordersService
      }
    };
    this.router.navigate(['home'], navigationExtras);
  }

  goNewOrder(event: any) {
    this.ordersService.resetOrder();
    const navigationExtras: NavigationExtras = {
      state: {
        service: this.ordersService
      }
    };
    this.router.navigate(['home'], navigationExtras);
  }

}
