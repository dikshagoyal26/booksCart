import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  public books: any;
  public currentFocus: number = -1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {}
  searchBooks(event) {
    if (event.keyCode == 13) {
      this.showBooks(this.searchControl.value);
    } else {
      this.activeSuggestion(event);
      this.showSuggestions(this.searchControl.value);
    }
  }
  private showBooks(item) {
    if (!item) {
      return;
    }
    item = item.trim();
    if (!item) return;
    this.books = [];
    this.searchControl.setValue(item);
    if (!this.router.url.startsWith('/books'))
      this.router.navigate(['/search'], {
        queryParams: { item: item.toLowerCase() },
      });
    else
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          item: item,
        },
        queryParamsHandling: 'merge',
      });
  }
  private async showSuggestions(item: string) {
    if (!item) {
      this.books = [];
      return;
    }
    item = item.trim();
    if (!item) {
      this.books = [];
      return;
    }
    this.books = await this.booksService.showBookSuggestions(item);
  }
  closeSuggestions() {
    this.books = [];
    this.searchControl.setValue('');
  }
  activeSuggestion(event) {
    if (event.keyCode == 40) {
      this.currentFocus++;
      if (this.currentFocus >= this.books.length) this.currentFocus = 0;
    } else if (event.keyCode == 38) {
      if (this.currentFocus < 0) this.currentFocus = this.books.length - 1;
      this.currentFocus--;
    } else if (event.keyCode == 13) {
      this.showBooks(this.searchControl.value);
    }
  }
}
