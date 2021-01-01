import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/backendUrl.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  createOrder(userId: string, order: Order) {
    return this.http.post<string>(
      this.backendUrl + `orders/add/${userId}`,
      order
    );
  }
  getOrders(userId: string) {
    return this.http.get<Order[]>(this.backendUrl + `orders/fetch/${userId}`);
  }
}
