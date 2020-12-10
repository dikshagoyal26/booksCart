import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartItems: Number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItemcount$.subscribe((length: Number) => {
      this.cartItems = length;
    });
  }
  isAdmin() {
    return true;
  }
  isLoggedIn() {
    return true;
  }
}
