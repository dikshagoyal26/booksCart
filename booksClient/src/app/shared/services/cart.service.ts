import { Injectable } from '@angular/core';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public books: Book[] = [];
  constructor() {}
  addToCart(book: Book) {
    this.books.push(book);
    alert('book added to cart');
  }
  removeFromCart() {}
  getFromCart() {
    return this.books.slice();
  }
}
