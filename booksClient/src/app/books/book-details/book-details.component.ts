import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/books.model';
import { BooksService } from 'src/app/shared/books.service';
import { Response } from '../../shared/response.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param);
      if (param && param.id) {
        this.fetchDetails(param.id);
      }
    });
  }
  fetchDetails(BookId) {
    this.booksService.fetchBookById(BookId).subscribe((data: Response) => {
      this.book = data.record;
    });
  }
}
