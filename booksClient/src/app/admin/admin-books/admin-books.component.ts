import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/books.model';
import { BooksService } from 'src/app/shared/books.service';
import { Response } from './../../shared/response.model';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {
  public books: Book[];
  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe((res: Response) => {
      if (res.status == 'S') {
        this.books = res.record;
      }
    });
  }
  editBook(i) {
    this.router.navigate([`/admin/books/update/${this.books[i]._id}`]);
  }
}
