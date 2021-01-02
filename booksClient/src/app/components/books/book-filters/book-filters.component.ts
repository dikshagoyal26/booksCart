import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/shared/models/categories.model';
import { Filter } from 'src/app/shared/models/filter.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.scss'],
})
export class BookFiltersComponent implements OnInit, OnChanges {
  @Input() selectedFilter: Filter;
  public categories: any = [];
  public selectedCategory: string = null;
  public priceRange: number = 10000;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
    this.initFilters();
  }
  ngOnChanges() {
    this.initFilters();
  }
  initFilters() {
    this.selectedCategory = this.selectedFilter
      ? this.selectedFilter.category
      : null;
    this.priceRange = +this.selectedFilter.price || 10000;
  }
  selectCategory(category: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: category,
      },
      queryParamsHandling: 'merge',
    });
  }
  selectPrice() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price: this.priceRange,
      },
      queryParamsHandling: 'merge',
    });
  }
}
