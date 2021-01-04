import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
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
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
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
      (items: Cart[]) => {
        this.cart = items;
        if (items && items.length > 0) this.cartService.setCartItemCount(items);
        else this.cartService.cartItemcount$.next(0);
        this.getTotalPrice();
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
  reduceItemQty(item: Cart) {
    if (item.quantity <= 1) return;
    this.cartService.reduceItemQty(this.user._id, item.book._id).subscribe(
      () => {
        this.getCartItems();
        this.snackbarService.show('One Item removed from Cart!');
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
  addOneItem(bookId: string) {
    this.cartService.addItemToCart(this.user._id, bookId);
  }
  deleteBookFromCart(bookId: string) {
    if (this.cart.length == 1) {
      this.clearCart();
      return;
    }
    this.cartService.deleteBookFromCart(this.user._id, bookId).subscribe(
      () => {
        this.getCartItems();
        this.snackbarService.show('Book Deleted from Cart.!');
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
  clearCart() {
    this.cartService.clearCart(this.user._id).subscribe(
      () => {
        this.getCartItems();
        this.snackbarService.show('Cart Cleared.!');
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.cart && this.cart && this.cart.length > 0)
      this.totalPrice = this.cartService.getTotalPrice(this.cart);
  }
}
