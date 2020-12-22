import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  @Input() bookId: string;
  @Input() user: User;

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}
  addToCart() {
    if (this.user._id && this.bookId) {
      this.addItemToCart();
    }
  }
  private addItemToCart() {
    this.cartService.addToCart(this.user._id, this.bookId).subscribe(
      (items: Cart[]) => {
        if (items) this.cartService.setCartItemCount(items);
        else this.cartService.cartItemcount$.next(0);
        this.snackbarService.show('Book Added to Cart!');
      },
      () => {
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
}
