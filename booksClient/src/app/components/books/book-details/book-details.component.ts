import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { User } from 'src/app/shared/models/user';
import { BooksService } from 'src/app/shared/services/books.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  public userDataSubscription: Subscription;
  public user: User;
  public coverImage: string;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.fetchDetails(param.id);
      }
    });
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  getCover() {
    this.coverImage = this.booksService.getCoverImage(this.book);
  }
  getNoImageUrl() {
    this.coverImage = this.booksService.getNoImageUrl();
  }
  private fetchDetails(BookId) {
    this.booksService.fetchBookById(BookId).subscribe((data: Book) => {
      if (data) this.book = data;
      else this.router.navigate(['not-found']);
    });
  }
}
