import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: Order[];
  private user: User;
  constructor(
    private orderService: OrdersService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
    });
    this.orderService.getOrders(this.user._id).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }
}
