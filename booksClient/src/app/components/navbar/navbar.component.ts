import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cartService: CartService) {}
  public cartItems: Number;

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
