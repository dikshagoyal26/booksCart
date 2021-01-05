import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Url } from 'src/app/shared/models/backendUrl.model';
import { Book } from 'src/app/shared/models/books.model';
import { User } from 'src/app/shared/models/user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  public coverImage: string;
  constructor() {}
  ngOnInit() {
    this.coverImage = this.getCover();
  }
  getCover() {
    if (this.book && this.book.cover) {
      if (
        this.book.cover.startsWith('https://') ||
        this.book.cover.startsWith('http://')
      ) {
        return this.book.cover;
      } else {
        return Url.backendUrl + 'uploads/' + this.book.cover;
      }
    } else {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxa-H7vHgjDI9F3X1dNDtq_u5B6fGCluebxA&usqp=CAU';
    }
  }
}
