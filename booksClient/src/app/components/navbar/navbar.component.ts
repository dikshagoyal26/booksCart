import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { Cart } from 'src/app/shared/models/cart.model';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private wishlistService: WishlistService
  ) {}
  public cartItems: Number = 0;
  public wishlistItems: Number = 0;

  public userDataSubscription: Subscription;
  public user: User;

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.cartService.cartItemcount$.subscribe((length: Number) => {
      this.cartItems = length;
    });
    this.wishlistService.wishlistCount$.subscribe((length: Number) => {
      this.wishlistItems = length;
    });
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
      if (this.user && this.user.isLoggedIn) {
        this.fetchCartItems();
        this.fetchWishlistItems();
      }
    });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  fetchCartItems() {
    this.cartService.getCartItems(this.user._id).subscribe(
      (items: Cart[]) => {
        if (items && items.length > 0) this.cartService.setCartItemCount(items);
        else this.cartService.cartItemcount$.next(0);
      },
      (err) => {
        console.log(err);
        this.cartService.cartItemcount$.next(0);
      }
    );
  }
  fetchWishlistItems() {
    this.wishlistService
      .fetchWishlistedItems(this.user._id)
      .subscribe((books: Book[]) => {
        if (books) this.wishlistService.setWishlist(books);
        else this.wishlistService.setWishlist([]);
      });
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
