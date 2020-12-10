import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/books.model';
import { Cart } from '../models/cart.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];
  cartItemcount$: Subject<number> = new Subject<number>();
  constructor(private snackbarService: SnackbarService) {}
  addToCart(book: Book) {
    let bookFound: boolean = false;
    let length: number = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].book?._id == book?._id) {
        bookFound = true;
        this.cart[i].quantity++;
      }
      length += this.cart[i].quantity;
    }
    if (!bookFound) {
      this.cart.push({ book: book, quantity: 1 });
      length++;
    }
    this.setCartItemCount(length);
    this.snackbarService.show('One Item Added to Cart');
  }
  setCartItemCount(value: number) {
    this.cartItemcount$.next(value);
  }
  removeFromCart() {}
  getFromCart() {
    return this.cart.slice();
  }
}
