import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  categories: any = [];
  selectedCategory: string;
  returnedArray: Book[];
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
        this.selectedCategory = 'all';
        this.fetchBooks();
      }
    });
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
  }
  fetchBooksByCategories(categoryName: string = null) {
    if (!categoryName) this.fetchBooks();
    else {
      let category: Categories[] = this.getCategoryFromName(categoryName);
      if (category && category.length > 0) {
        this.booksService.fetchBooksByCategoryId(category[0]._id).subscribe(
          (books: Book[]) => {
            this.books = books;
            this.returnedArray = this.books.slice(0, 10);
          },
          (err) => {
            this.snackBarService.show(err, 'danger');
          }
        );
      } else {
        this.books = [];
      }
    }
  }
  getCategoryFromName(categoryName: string) {
    return this.categories.filter(
      (category: Categories) => category.category_type == categoryName
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
