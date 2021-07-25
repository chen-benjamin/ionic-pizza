import { Pizza } from './pizza';

export interface Order {
    pizzas: Pizza[];
    quantity: number;
    price: number;
    date: Date;
}
