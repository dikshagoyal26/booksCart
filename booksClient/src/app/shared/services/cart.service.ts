import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Url } from '../models/backendUrl.model';
import { Cart } from '../models/cart.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];
  private backendUrl: string;
  cartItemcount$: Subject<number> = new Subject<number>();
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.backendUrl = Url.backendUrl;
  }
  private addToCart(userId: string, bookId: string) {
    return this.http.post<Cart[]>(
      this.backendUrl + `cart/add/${userId}/${bookId}`,
      {}
    );
  }
  setCartItemCount(items: any[]) {
    let count = 0;
    for (let i = 0; i < items.length; i++) count += items[i].quantity;
    this.cartItemcount$.next(count);
  }
  reduceItemQty(userId: string, bookId: string) {
    return this.http.put<Cart[]>(
      this.backendUrl + `cart/reduce-qty/${userId}/${bookId}`,
      {}
    );
  }
  deleteBookFromCart(userId, bookId) {
    return this.http.delete<Cart[]>(
      this.backendUrl + `cart/delete-item/${userId}/${bookId}`
    );
  }
  getCartItems(userId: String) {
    return this.http.get<Cart[]>(this.backendUrl + `cart/getItems/${userId}`);
  }
  clearCart(userId: string) {
    return this.http.delete<string>(this.backendUrl + `cart/clear/${userId}`);
  }
  addItemToCart(userId: string, bookId: string) {
    return new Promise((resolve) => {
      this.addToCart(userId, bookId).subscribe(
        (items: Cart[]) => {
          if (items) this.setCartItemCount(items);
          else this.cartItemcount$.next(0);
          this.snackbarService.show('Book Added to Cart!');
          resolve(null);
        },
        () => {
          this.snackbarService.show('Something Went Wrong!', 'danger');
          resolve(null);
        }
      );
    });
  }
  getTotalPrice(cart: Cart[]) {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += +item.book.price * item.quantity;
    });
    return totalPrice;
  }
}
