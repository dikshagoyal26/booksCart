import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: any;
  public userDataSubscription: Subscription;
  public user: User;
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userService.userData
      .asObservable()
      .subscribe((data: User) => {
        this.user = data;
      });
  }
  addToCart() {
    this.cartService
      .addToCart(this.user._id, this.book._id)
      .subscribe(() => {});
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
