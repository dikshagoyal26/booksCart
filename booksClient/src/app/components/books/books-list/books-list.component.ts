import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  categories: any = [];
  selectedCategory: string;
  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.category) {
        this.selectedCategory = params.category;
        this.fetchBooksByCategories(this.selectedCategory);
      } else {
        this.fetchBooks();
      }
    });
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
  }
  fetchBooksByCategories(categoryId: string = null) {
    if (categoryId) {
      this.booksService.fetchBooksByCategoryId(categoryId).subscribe(
        (books: Book[]) => {
          this.books = books;
        },
        (err) => {
          this.snackBarService.show(err, 'danger');
        }
      );
    } else {
      this.fetchBooks();
    }
  }
  fetchBooks() {
    this.booksService.fetchBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (err) => {
        this.snackBarService.show(err, 'danger');
      }
    );
  }
}
