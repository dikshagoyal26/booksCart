import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/books.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss'],
})
export class BookCartComponent implements OnInit {
  public books: Book[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.books = this.cartService.getFromCart();
  }
}
