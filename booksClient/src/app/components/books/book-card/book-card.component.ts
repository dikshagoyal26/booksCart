import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  public userDataSubscription: Subscription;
  public user: User;
  constructor(
    private userService: UserService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  toggleWishlist(bookId) {
    this.wishlistService
      .addItemToWishlist(this.user._id, bookId)
      .subscribe((books: Book[]) => {
        if (books) this.wishlistService.setWishlistCount(books.length);
      });
  }
}
