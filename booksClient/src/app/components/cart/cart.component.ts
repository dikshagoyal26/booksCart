import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cart: any = [];
  public totalPrice: number = 0;
  public userDataSubscription: Subscription;
  public user: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.cart = this.cartService.getCartItems();
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
    this.getCartItems();
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  getCartItems() {
    if (!this.user) return;
    this.cartService.getCartItems(this.user._id).subscribe(
      (data: any) => {
        this.cart = data;
        console.log(data);
        this.getTotalPrice();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  reduceItemQty(bookId: string) {
    this.cartService.reduceItemQty(this.user._id, bookId).subscribe(
      () => {
        this.getCartItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addOneItem(bookId: string) {
    this.cartService.addToCart(this.user._id, bookId).subscribe(
      () => {
        this.getCartItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteBookFromCart(bookId: string) {
    if (this.cart.items.length == 1) {
      this.clearCart();
      return;
    }
    this.cartService.deleteBookFromCart(this.user._id, bookId).subscribe(
      () => {
        this.getCartItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  clearCart() {
    this.cartService.clearCart(this.user._id).subscribe(
      () => {
        this.getCartItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.cart && this.cart.items && this.cart.items.length > 0)
      this.cart.items.forEach((item) => {
        this.totalPrice += item.book.price * item.quantity;
      });
  }
}
