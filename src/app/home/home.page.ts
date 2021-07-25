import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/order';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Pizza } from '../model/pizza';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  toppings = ['Vegetables', 'Meet Balls', 'Pepperoni', 'Mushrooms'];
  sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  topping: string;
  size: string;
  quantity = '0';

  constructor(public alertController: AlertController, private ordersService: OrdersService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.ordersService = this.router.getCurrentNavigation().extras.state.service;
    }
  }

  onNumberClick(event: any) {
    if (this.quantity === '0') {
      this.quantity = '';
    }
    this.quantity += event.target.textContent;
  }

  reset() {
    this.quantity = '0';
  }

  async addOrder() {
    let msg = '';
    let alert;
    if (!this.topping || !this.size) {
      msg = 'Please select topping and size';
    } else if (this.getQuantity() === 0) {
      msg = 'Please enter quantity';
    }
    if (msg !== '') {
      alert = await this.alertController.create({
        header: 'Fail!!',
        message: msg,
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
    const pizza: Pizza = {
      topping: this.topping,
      size: this.size,
      quantity: this.getQuantity(),
      price: this.getPrice()
    };
    this.ordersService.addPizza(pizza);
    alert = await this.alertController.create({
      header: 'Success',
      message: 'Pizza added',
      buttons: ['OK']
    });
    await alert.present();
    this.quantity = '0';
    this.topping = null;
    this.size = null;
  }

  goNav() {
    const navigationExtras: NavigationExtras = {
      state: {
        service: this.ordersService
      }
    };
    this.router.navigate(['nav'], navigationExtras);
  }

  private getQuantity() {
    return Number.parseInt(this.quantity, 10);
  }

  private getPrice() {
    let price = 0;
    switch (this.size) {
      case 'Small':
        price = 7.99;
        break;
      case 'Medium':
        price = 9.99;
        break;
      case 'Large':
        price = 11.99;
        break;
      case 'X-Large':
        price = 14.99;
        break;
    }
    return price * this.getQuantity();
  }

}
