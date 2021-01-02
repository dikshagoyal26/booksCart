import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/shared/models/categories.model';
import { Filter } from 'src/app/shared/models/filter.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnChanges {
  public selectedFilter: Filter;
  private categories: Categories[];
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
      if (this.selectedFilter && this.selectedFilter.category)
        this.getSelectedCategoryId();
    });
    this.route.queryParams.subscribe((params) => {
      this.selectedFilter = { ...params };
      // if (params && params.category) {
      //   this.getSelectedCategoryId();
      // }
    });
  }
  ngOnChanges() {
    this.getSelectedCategoryId();
  }
  private getSelectedCategoryId() {
    if (this.categories) {
      let category = this.getCategoryFromName(this.selectedFilter.category);
      let selectCategory =
        !!category && category.length > 0 ? category[0]._id : '';
      this.selectedFilter.category = selectCategory;
      console.log(this.selectedFilter);
    }
  }
  private getCategoryFromName(categoryName: string) {
    return this.categories.filter(
      (category: Categories) => category.category_type == categoryName
    );
  }
}
