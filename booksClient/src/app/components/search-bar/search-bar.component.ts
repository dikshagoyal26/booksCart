import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  public searchControl: FormControl;
  public books: any;
  public currentFocus: number = -1;
  constructor(private router: Router, private booksService: BooksService) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {}
  searchBooks(event) {
    if (event.keyCode == 13) {
      this.handleEnterKey();
      return;
    }
    this.showSuggestions();
    this.activeSuggestion(event);
  }
  showBooks(item: string) {
    item = this.getItem(item);
    if (!item) {
      this.closeSuggestions();
      return;
    }
    this.searchControl.setValue(item);
    this.router.navigate(['/search'], {
      queryParams: { item: item },
    });
    this.closeSuggestions();
    this.searchInput.nativeElement.blur();
  }
  closeSuggestions() {
    this.books = [];
    this.searchControl.setValue('');
  }
  activeSuggestion(event) {
    if (event.keyCode == 40) {
      this.handleDownKey();
    } else if (event.keyCode == 38) {
      this.handleUpKey();
    } else if (event.keyCode == 13) {
      this.handleEnterKey();
    }
  }
  private handleDownKey() {
    if (this.currentFocus < this.books.length - 1) {
      this.currentFocus++;
    }
    document
      .querySelector('#autocomplete-list')
      .scrollBy({ top: 10 * this.currentFocus });
  }
  private handleUpKey() {
    if (this.currentFocus > 0) {
      this.currentFocus--;
    }
    document
      .querySelector('#autocomplete-list')
      .scrollBy({ top: -10 * (this.books.length - this.currentFocus) });
  }
  private handleEnterKey() {
    this.showBooks(this.searchControl.value);
  }
  private async showSuggestions() {
    let item = this.getItem(this.searchControl.value);
    if (!item) {
      this.closeSuggestions();
      return;
    }
    this.books = await this.booksService.showBookSuggestions(item);
  }
  private getItem(item: string) {
    return item && item.toLowerCase().trim() ? item.toLowerCase().trim() : null;
  }
}
