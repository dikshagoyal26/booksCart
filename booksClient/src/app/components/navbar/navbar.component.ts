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
  public cartItems: Number;
  public userDataSubscription: Subscription;
  public user: User;

  ngOnInit(): void {
    this.cartService.cartItemcount$.subscribe((length: Number) => {
      this.cartItems = length;
    });
  }
  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
  isAdmin() {
    return true;
  }
  isLoggedIn() {
    return true;
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
