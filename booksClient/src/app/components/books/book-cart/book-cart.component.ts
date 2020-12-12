import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss'],
})
export class BookCartComponent implements OnInit {
  public cart: Cart[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getFromCart();
  }
}
