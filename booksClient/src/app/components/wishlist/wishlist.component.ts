import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/books.model';
import { User } from 'src/app/shared/models/user';
import { BooksService } from 'src/app/shared/services/books.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  public books: Book[];
  private user: User;
  constructor(
    private userService: UserService,
    private wishlistService: WishlistService,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
    });
    this.wishlistService.wishlist$.subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  clearWishlist() {
    this.wishlistService.clearWishlist(this.user._id).subscribe(() => {
      this.wishlistService.setWishlist([]);
    });
  }
  removeItem(bookId: string) {
    this.wishlistService
      .removeItemFromWishlist(this.user._id, bookId)
      .subscribe((books: Book[]) => {
        this.books = books;
        this.wishlistService.setWishlist(books);
      });
  }
  getCover(book) {
    return this.booksService.getCoverImage(book);
  }
}
