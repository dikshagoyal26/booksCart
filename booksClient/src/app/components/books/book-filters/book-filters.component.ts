import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/shared/models/books.model';
import { Categories } from 'src/app/shared/models/categories.model';
import { Filter } from 'src/app/shared/models/filter.model';
import { BooksService } from 'src/app/shared/services/books.service';
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
  public isLoading: boolean = true;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    this.selectedPrice = this.maxPrice;
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
    this.fetchAllBooks();
  }
  ngOnChanges() {
    this.initFilters();
  }
  initFilters() {
    this.selectedCategory = this.selectedFilter
      ? this.selectedFilter.category
      : null;
    this.selectedPrice = +this.selectedFilter.price || this.maxPrice;
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
  private fetchAllBooks() {
    this.booksService.fetchBooks().subscribe(
      (books: Book[]) => {
        this.setMinPrice(books);
        this.setMaxPrice(books);
        this.isLoading = false;
        this.initFilters();
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  private setMinPrice(books: Book[]) {
    this.minPrice = +books.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr
    ).price;
  }
  private setMaxPrice(books: Book[]) {
    this.maxPrice = +books.reduce((prev, curr) =>
      prev.price > curr.price ? prev : curr
    ).price;
  }
}
