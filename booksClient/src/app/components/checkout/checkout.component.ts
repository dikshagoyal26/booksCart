import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/models/cart.model';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrdersService,
    private fb: FormBuilder
  ) {}
  private user: User;
  public cart: Cart[];
  public addressForm = this.fb.group({
    name: ['', Validators.required],
    line_1: ['', Validators.required],
    line_2: ['', Validators.required],
    pincode: ['', Validators.required],
    state: ['', Validators.required],
  });
  ngOnInit(): void {
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
    });
    this.cartService.getCartItems(this.user._id).subscribe((cart: Cart[]) => {
      this.cart = cart;
    });
  }
  get addressFormControl() {
    return this.addressForm.controls;
  }
  checkout() {
    console.log('checkout');
    if (this.addressForm.invalid) return;
    let order: Order = {
      user_id: this.user._id,
      items: this.cart,
      total: 100,
      address: this.addressForm.value,
    };
    console.log(order);
    this.placeOrder(order);
  }
  private placeOrder(order: Order) {
    this.orderService.createOrder(this.user._id, order).subscribe(() => {});
  }
}
