import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { Pizza } from '../model/pizza';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private currentOrder: Pizza[] = [];
  private previousOrders: Order[] = [];

  constructor() { }

  getCurrentOrder(): Pizza[] {
    return this.currentOrder;
  }

  getPreviousOrders() {
    return this.previousOrders;
  }

  addPizza(pizza: Pizza) {
    this.currentOrder.push(pizza);
  }

  deletePizza(i: number) {
    this.currentOrder.splice(i, 1);
  }

  resetOrder() {
    this.currentOrder = [];
  }

  placeCurrentOrder() {
    const order: Order = {
      pizzas: this.currentOrder,
      quantity: 0,
      price: 0,
      date: new Date()
    };
    this.currentOrder.forEach(pizza => {
      order.quantity += pizza.quantity;
      order.price += pizza.price;
    });
    this.previousOrders.push(order);
    this.currentOrder = [];
  }

}
