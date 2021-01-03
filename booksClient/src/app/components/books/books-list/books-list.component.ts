import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Filter } from 'src/app/shared/models/filter.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnChanges {
  @Input() selectedFilter: Filter;
  books: Book[];
  categories: any;
  returnedArray: Book[];
  constructor(
    private booksService: BooksService,
    private snackBarService: SnackbarService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
      this.getSelectedCategoryId();
      this.fetchBooks();
    });
    if (this.books) this.returnedArray = this.books.slice(0, 10);
    this.fetchBooks();
  }
  ngOnChanges() {
    this.getSelectedCategoryId();
    this.fetchBooks();
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.books.slice(startItem, endItem);
  }
  private fetchBooks() {
    if (!this.selectedFilter) {
      this.fetchAllBooks();
    } else {
      this.fetchBooksByCategories();
    }
  }
  private fetchBooksByCategories() {
    this.booksService.fetchBooksByFilter(this.selectedFilter).subscribe(
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
  private fetchAllBooks() {
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
  private getSelectedCategoryId() {
    if (this.categories) {
      let category = this.getCategoryFromName(this.selectedFilter.category);
      let selectCategory =
        !!category && category.length > 0 ? category[0]._id : '';
      this.selectedFilter.category = selectCategory;
      console.log(this.selectedFilter);
    }
  }
  private getCategoryFromName(categoryName: string) {
    return this.categories.filter(
      (category: Categories) => category.category_type == categoryName
    );
  }
}
