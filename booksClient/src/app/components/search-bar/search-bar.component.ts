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
  constructor(private router: Router, private booksService: BooksService) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {}
  searchBooks(event) {
    if (event.keyCode == 13) {
      this.showBooks(this.searchControl.value);
    } else {
      this.showSuggestions();
    }
  }
  showBooks(item: string) {
    if (!item) {
      return;
    }
    item = item.trim();
    if (!item) return;
    item = item.toLowerCase();
    this.books = [];
    this.searchControl.setValue(item);
    this.router.navigate(['/search'], {
      queryParams: { item: item },
    });
  }
  private async showSuggestions() {
    let item = this.searchControl.value;
    if (!item) {
      this.books = [];
      return;
    }
    item = item.trim();
    if (!item) {
      this.books = [];
      return;
    }
    this.books = await this.booksService.showBookSuggestions(
      item.toLowerCase()
    );
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
