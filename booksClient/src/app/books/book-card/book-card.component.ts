import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  addToCart() {
    this.cartService.addToCart(this.book);
  }
}
