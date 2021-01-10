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
export class BooksComponent implements OnInit {
  public selectedFilter: Filter;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.route.queryParams.subscribe((params) => {
      this.selectedFilter = { ...params };
    });
  }
}
