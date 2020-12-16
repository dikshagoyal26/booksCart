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
  public cart: Cart[] = [];
  public totalPrice: number = 0;
  public userDataSubscription: Subscription;
  public user: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.cart = this.cartService.getCartItems();
    this.getCartItems();
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  getCartItems() {
    if (!this.user) return;
    this.cartService.getCartItems(this.user._id).subscribe(
      (data: Cart[]) => {
        this.cart = data;
        this.getTotalPrice();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteOneItem(bookId: string) {
    this.cartService.deleteOneCartItem(this.user._id, bookId).subscribe(
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
    this.cartService.removeItem(this.user._id, bookId).subscribe(
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
    this.cart.forEach((item) => {
      this.totalPrice += item.book.price * item.quantity;
    });
  }
}
