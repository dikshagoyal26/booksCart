import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Url } from '../models/backendUrl.model';
import { Book } from '../models/books.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  public wishlistCount$: Subject<number> = new Subject<number>();
  fetchWishlistedItems(userId: string) {
    return this.http.get<Book[]>(this.backendUrl + `wishlist/fetch/${userId}`);
  }
  addItemToWishlist(userId: string, bookId: string) {
    return this.http.post<Book[]>(
      this.backendUrl + `wishlist/add/${userId}/${bookId}`,
      {}
    );
  }
  removeItemFromWishlist(userId: string, bookId: string) {
    return this.http.delete<Book[]>(
      this.backendUrl + `wishlist/remove/${userId}/${bookId}`,
      {}
    );
  }
  clearWishlist(userId: string) {
    return this.http.delete<null>(
      this.backendUrl + `wishlist/clear/${userId}`,
      {}
    );
  }
  setWishlistCount(val: number) {
    this.wishlistCount$.next(val);
  }
}
