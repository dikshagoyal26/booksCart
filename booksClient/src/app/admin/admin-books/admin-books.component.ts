import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/books.model';
import { BooksService } from 'src/app/shared/books.service';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Response } from './../../shared/response.model';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {
  public books: Book[];
  constructor(
    private booksService: BooksService,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe((res: Response) => {
      if (res.status == 'S') {
        this.books = res.record;
      }
    });
  }
  editBook(i: number) {
    this.router.navigate([`/admin/books/update/${this.books[i]._id}`]);
  }
  getCategory(categoryId: string) {
    let category: any = this.categoryService.getCategoryById(categoryId);
    console.log({ category });
    if (category && category.cat_type) {
      return category.cat_type;
    }
    console.log({ category, categoryId });
    return '-';
  }
}
