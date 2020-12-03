import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/books.model';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Response } from 'src/app/shared/models/response.model';

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
    this.fetchBooks();
  }
  fetchBooks() {
    this.booksService.fetchBooks().subscribe((res: Response) => {
      if (res.status == 200) {
        this.books = res.record;
      }
    });
  }
  editBook(i: number) {
    this.router.navigate([`/admin/books/update/${this.books[i]._id}`]);
  }
  getCategory(categoryId: string) {
    let category: any = this.categoryService.getCategoryById(categoryId);
    if (category && category.category_type) {
      return category.category_type;
    }
    return '-';
  }
  deleteBook(bookId) {
    if (confirm('Are you sure you want to delete the book')) {
      this.booksService.deleteBook(bookId).subscribe((res: Response) => {
        if (res.status == 200) {
          alert('book deleted successfully');
          this.fetchBooks();
        } else {
          alert('error while deleting book');
        }
      });
    }
  }
}
