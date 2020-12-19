import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: any;
  public userDataSubscription: Subscription;
  public user: User;
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  addToCart() {
    this.cartService.addToCart(this.user._id, this.book._id).subscribe(
      (items: Cart[]) => {
        if (items) this.cartService.setCartItemCount(items);
        else this.cartService.setCartItemCount([]);
        this.snackbarService.show('Book Added to Cart!');
      },
      () => {
        this.snackbarService.show('Something Went Wrong!', 'danger');
      }
    );
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
