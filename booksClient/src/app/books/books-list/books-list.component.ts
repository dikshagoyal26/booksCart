import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Response } from 'src/app/shared/models/response.model';

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
    this.categoriesService.categories$.subscribe((categories: Response) => {
      this.categories = categories.record;
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
