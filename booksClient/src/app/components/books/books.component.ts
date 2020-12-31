import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/shared/models/categories.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnChanges {
  public selectedCategory: Categories;
  private categories: Categories[];
  private param: string = null;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
      this.getSelectedCategory();
    });
    this.route.queryParams.subscribe((params) => {
      if (params.category) {
        this.param = params.category;
        if (this.categories && this.categories.length > 0)
          this.getSelectedCategory();
      } else {
        this.selectedCategory = null;
      }
    });
  }
  ngOnChanges() {
    this.getSelectedCategory();
  }
  private getSelectedCategory() {
    let category = this.getCategoryFromName(this.param);
    this.selectedCategory =
      !!category && category.length > 0 ? category[0] : null;
  }
  private getCategoryFromName(categoryName: string) {
    return this.categories.filter(
      (category: Categories) => category.category_type == categoryName
    );
  }
}
