import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { Pizza } from '../model/pizza';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {

  ordersService: OrdersService;
  order: Pizza[];
  totalQuantity = 0;
  totalPrice = 0;

  constructor(public alertController: AlertController, private router: Router) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.ordersService = this.router.getCurrentNavigation().extras.state.service;
    }
    this.order = this.ordersService.getCurrentOrder();
    this.order.forEach(pizza => {
      this.totalPrice += pizza.price;
      this.totalQuantity += pizza.quantity;
    });
  }

  async placeOrder() {
    this.ordersService.placeCurrentOrder();
    this.order = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Order added',
      buttons: ['OK']
    });
    await alert.present();
  }

  async deletePizza(i: number) {
    this.ordersService.deletePizza(i);
    this.order = this.ordersService.getCurrentOrder();
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.order.forEach(pizza => {
      this.totalPrice += pizza.price;
      this.totalQuantity += pizza.quantity;
    });
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Order deleted',
      buttons: ['OK']
    });
    await alert.present();
  }

}
