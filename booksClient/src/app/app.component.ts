import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './shared/services/categories.service';
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'booksClient';
  constructor(
    private categoriesService: CategoriesService,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit() {
    this.categoriesService.fetchCategories();
    this.snackbarService.show('app started');
  }
}
