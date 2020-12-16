import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './shared/services/categories.service';
import { SnackbarService } from './shared/services/snackbar.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'booksClient';
  constructor(private userService: UserService) {}
  ngOnInit() {
    const token = window.localStorage.getItem('token');
    this.userService.setUserDetails();
  }
}
