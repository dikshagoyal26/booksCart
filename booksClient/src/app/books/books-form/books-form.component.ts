import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {
  books: any = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe((data: any) => {
      console.log(data);
      if (data.status == 'S') {
        this.books = data.record;
      } else {
        alert(data.message);
      }
    });
  }
}
