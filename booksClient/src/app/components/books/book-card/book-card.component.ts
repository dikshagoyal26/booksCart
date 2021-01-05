import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Url } from 'src/app/shared/models/backendUrl.model';
import { Book } from 'src/app/shared/models/books.model';
import { BooksService } from 'src/app/shared/services/books.service';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  public coverImage: string;
  constructor(private booksService: BooksService) {}
  ngOnInit() {
    this.coverImage = this.booksService.getCoverImage(this.book);
  }
}
