import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  @Input() selectedCategory: Categories;
  books: Book[];

  returnedArray: Book[];
  constructor(
    private booksService: BooksService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.books) this.returnedArray = this.books.slice(0, 10);
    if (!this.selectedCategory) {
      this.fetchBooks();
    } else {
      this.fetchBooksByCategories(this.selectedCategory._id);
    }
  }
  fetchBooksByCategories(categoryId: string) {
    this.booksService.fetchBooksByCategoryId(categoryId).subscribe(
      (books: Book[]) => {
        this.books = books;
        this.returnedArray = this.books.slice(0, 10);
      },
      (err) => {
        this.books = [];
        this.snackBarService.show(err, 'danger');
      }
    );
  }
  fetchBooks() {
    this.booksService.fetchBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.returnedArray = this.books.slice(0, 10);
      },
      (err) => {
        this.snackBarService.show(err, 'danger');
      }
    );
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.books.slice(startItem, endItem);
  }
}
