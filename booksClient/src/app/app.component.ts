import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './shared/services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'booksClient';
  constructor(private categoriesService: CategoriesService) {}
  ngOnInit() {
    this.categoriesService.fetchCategories();
  }
}
