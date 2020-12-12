import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}
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
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
