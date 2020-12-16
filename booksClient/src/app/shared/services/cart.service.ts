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
  constructor(
    private snackbarService: SnackbarService,
    private http: HttpClient
  ) {
    this.backendUrl = Url.backendUrl;
  }
  addToCart(userId: string, bookId: string) {
    return this.http.post(
      this.backendUrl + `cart/add/${userId}/${bookId}`,
      {},
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  setCartItemCount(value: number) {
    this.cartItemcount$.next(value);
  }
  deleteOneCartItem(userId: string, bookId: string) {
    return this.http.put(
      this.backendUrl + `cart/delete-one/${userId}/${bookId}`,
      {},
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  removeItem(userId, bookId) {
    return this.http.delete(
      this.backendUrl + `cart/delete-item/${userId}/${bookId}`,
      {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      }
    );
  }
  getCartItems(userId: String) {
    return this.http.get(this.backendUrl + `cart/getItems/${userId}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
  }
  clearCart(userId: string) {
    return this.http.delete(this.backendUrl + `cart/clear/${userId}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
  }
}
