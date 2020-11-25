import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: any = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.books = data.record;
      } else {
        alert(data.message);
      }
    });
  }
}
