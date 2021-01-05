import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() bookId: string;
  public user: User;
  public isAdding: boolean = false;
  private userSubscription: Subscription;
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.userData.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }
  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  async addToCart() {
    if (this.user._id && this.bookId) {
      this.isAdding = true;
      await this.cartService.addItemToCart(this.user._id, this.bookId);
      this.isAdding = false;
    }
  }
}
