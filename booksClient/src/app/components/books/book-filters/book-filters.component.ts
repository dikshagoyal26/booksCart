import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Categories } from 'src/app/shared/models/categories.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.scss'],
})
export class BookFiltersComponent implements OnInit {
  @Input() selectedCategory: Categories;
  public categories: any = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
  }
}
