import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  constructor(private router: Router) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {}
  searchBooks() {
    let item = this.searchControl.value.trim();
    if (!item) return;
    this.router.navigate(['/search'], {
      queryParams: { item: item.toLowerCase() },
    });
  }
}
