import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart.model';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
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
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  private user: User;
  public cart: Cart[];
  public totalPrice: number = 0;
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
      this.getTotalPrice();
    });
  }
  get addressFormControl() {
    return this.addressForm.controls;
  }
  checkout() {
    if (this.addressForm.invalid) return;
    let totalPrice = 0;
    if (this.cart && this.cart.length > 0)
      totalPrice = this.cartService.getTotalPrice(this.cart);
    let order: Order = {
      user_id: this.user._id,
      items: this.cart,
      total: totalPrice,
      address: this.addressForm.value,
    };
    this.placeOrder(order);
  }
  private placeOrder(order: Order) {
    this.orderService.createOrder(this.user._id, order).subscribe(
      () => {
        this.cartService.cartItemcount$.next(0);
        this.snackbarService.show('Order Placed SuccessFully!!');
        this.router.navigate(['/myorders']);
      },
      () => {
        this.snackbarService.show('Oops! Something went wrong..', 'danger');
      }
    );
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.cart && this.cart && this.cart.length > 0)
      this.totalPrice = this.cartService.getTotalPrice(this.cart);
  }
}
