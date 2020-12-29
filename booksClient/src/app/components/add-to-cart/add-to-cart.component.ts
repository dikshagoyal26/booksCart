import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  @Input() bookId: string;
  @Input() user: User;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  addToCart() {
    if (this.user._id && this.bookId) {
      this.cartService.addItemToCart(this.user._id, this.bookId);
    }
  }
}
