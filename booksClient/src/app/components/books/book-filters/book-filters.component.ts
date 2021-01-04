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
  public selectedPrice: number;
  public minPrice: number = 100;
  public maxPrice: number = 10000;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedPrice = this.maxPrice;
  }

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
    this.selectedPrice = +this.selectedFilter.price || 10000;
  }
  selectCategory(category: string = null) {
    this.navigate({ category }, true);
  }
  selectPrice() {
    this.navigate({ price: this.selectedPrice }, true);
  }
  canClear() {
    return Object.keys(this.selectedFilter).length > 0;
  }
  clearFilters(key: string = null) {
    if (key) this.selectedFilter[key] = null;
    else {
      this.selectedFilter = {};
    }
    this.navigate(this.selectedFilter, false);
  }
  private navigate(param: Filter, handleQueryparam: boolean) {
    if (this.router.url.startsWith('/search')) {
      this.router.navigate(['/books'], {
        queryParams: param,
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: param,
        queryParamsHandling: handleQueryparam ? 'merge' : '',
      });
    }
  }
}
