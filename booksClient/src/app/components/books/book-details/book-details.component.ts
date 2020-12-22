import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { Cart } from 'src/app/shared/models/cart.model';
import { Categories } from 'src/app/shared/models/categories.model';
import { User } from 'src/app/shared/models/user';
import { BooksService } from 'src/app/shared/services/books.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  private categories: Categories[] = [];
  public userDataSubscription: Subscription;
  public user: User;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private categoryService: CategoriesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.fetchDetails(param.id);
      }
    });
    this.categoryService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  fetchDetails(BookId) {
    this.booksService.fetchBookById(BookId).subscribe((data: Book) => {
      this.book = data;
    });
  }
}
