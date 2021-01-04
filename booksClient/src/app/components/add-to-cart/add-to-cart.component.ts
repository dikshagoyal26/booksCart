import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  @Input() bookId: string;
  public user: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
    });
  }
  addToCart() {
    if (this.user._id && this.bookId) {
      this.cartService.addItemToCart(this.user._id, this.bookId);
    }
  }
}
