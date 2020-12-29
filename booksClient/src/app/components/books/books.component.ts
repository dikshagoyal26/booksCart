import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/shared/models/categories.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public selectedCategory: Categories;
  private categories: Categories[];

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
    this.route.queryParams.subscribe((params) => {
      if (params.category) {
        let category = this.getCategoryFromName(params.category);
        this.selectedCategory =
          !!category && category.length > 0 ? category[0] : null;
      } else {
        this.selectedCategory = null;
      }
    });
  }
  getCategoryFromName(categoryName: string) {
    return this.categories.filter(
      (category: Categories) => category.category_type == categoryName
    );
  }
}
