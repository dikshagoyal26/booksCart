import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {}
  searchBooks(event) {
    if (event.keyCode == 13) {
      this.showBooks();
    } else {
      this.showSuggestions();
    }
  }
  private showBooks() {
    let item = this.searchControl.value.trim();
    if (!item) return;
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
  private showSuggestions() {}
}
