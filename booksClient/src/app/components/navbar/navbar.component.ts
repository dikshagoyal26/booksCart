import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
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
    private userService: UserService
  ) {}
  public cartItems: Number = 0;
  public userDataSubscription: Subscription;
  public user: User;

  ngOnInit(): void {
    this.cartService.cartItemcount$.subscribe((length: Number) => {
      this.cartItems = length;
    });
    this.userService.userData.subscribe((user: User) => {
      this.user = user;
      this.cartService.getCartItems(user._id).subscribe(
        (data: any) => {
          console.log(data);
          this.cartService.setCartItemCount(data.items);
        },
        (err) => {
          console.log(err);
          this.cartService.setCartItemCount([]);
        }
      );
    });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  isAdmin() {
    return this.userService.isAdmin();
  }
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  getFirstName() {
    return this.userService.getFirstName();
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
