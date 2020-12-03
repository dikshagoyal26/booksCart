import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  categories: any = [];
  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categorySubject.subscribe((categories) => {
      this.categories = categories;
    });
    this.booksService.fetchBooks().subscribe((data: any) => {
      if (data.status == 200) {
        this.books = data.record;
      } else {
        alert(data.message);
      }
    });
  }
  fetchBooksByCategories(categoryId: string) {
    this.booksService
      .fetchBooksByCategoryId(categoryId)
      .subscribe((data: any) => {
        if (data.status == 200) {
          this.books = data.record;
        } else {
          alert(data.message);
        }
      });
  }
}
