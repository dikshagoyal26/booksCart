import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Url } from '../models/backendUrl.model';
import { Book } from '../models/books.model';
import { Cart } from '../models/cart.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];
  private backendUrl: string;
  cartItemcount$: Subject<number> = new Subject<number>();
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  addToCart(userId: string, bookId: string) {
    return this.http.post<Cart[]>(
      this.backendUrl + `cart/add/${userId}/${bookId}`,
      {},
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  setCartItemCount(items: any[]) {
    let count = 0;
    if (items)
      for (let i = 0; i < items.length; i++) {
        count += items[i].quantity;
      }
    this.cartItemcount$.next(count);
  }
  reduceItemQty(userId: string, bookId: string) {
    return this.http.put<Cart[]>(
      this.backendUrl + `cart/reduce-qty/${userId}/${bookId}`,
      {},
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  deleteBookFromCart(userId, bookId) {
    return this.http.delete<Cart[]>(
      this.backendUrl + `cart/delete-item/${userId}/${bookId}`,
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  getCartItems(userId: String) {
    return this.http.get<Cart[]>(this.backendUrl + `cart/getItems/${userId}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
  }
  clearCart(userId: string) {
    return this.http.delete<string>(this.backendUrl + `cart/clear/${userId}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
  }
}
