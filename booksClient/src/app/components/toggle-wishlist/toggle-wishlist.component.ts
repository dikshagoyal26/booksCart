import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { User } from 'src/app/shared/models/user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-toggle-wishlist',
  templateUrl: './toggle-wishlist.component.html',
  styleUrls: ['./toggle-wishlist.component.scss'],
})
export class ToggleWishlistComponent implements OnInit {
  @Input() bookId: string;
  @Input() showButton: boolean = false;

  public userDataSubscription: Subscription;
  public user: User;
  public isWishlisted: boolean = true;
  public btnText: string;
  constructor(
    private wishlistService: WishlistService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
    this.wishlistService.wishlist$.subscribe((books: Book[]) => {
      this.setBookState(books);
    });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  setBookState(books: Book[]) {
    const favBook = books.find((book) => book._id == this.bookId);
    if (favBook) {
      this.isWishlisted = true;
      this.btnText = 'Remove from Wishlist';
    } else {
      this.isWishlisted = false;
      this.btnText = 'Add to Wishlist';
    }
  }
  toggleWishlist() {
    if (this.isWishlisted) {
      this.removeFromWhitelist();
    } else {
      this.addToWhitelist();
    }
  }
  private addToWhitelist() {
    this.wishlistService
      .addItemToWishlist(this.user._id, this.bookId)
      .subscribe((books: Book[]) => {
        this.snackbarService.show('book added to wishlist');
        if (books) this.wishlistService.setWishlist(books);
      });
  }
  private removeFromWhitelist() {
    this.wishlistService
      .removeItemFromWishlist(this.user._id, this.bookId)
      .subscribe((books: Book[]) => {
        this.snackbarService.show('book removed from wishlist');
        if (books) this.wishlistService.setWishlist(books);
      });
  }
}
