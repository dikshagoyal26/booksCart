import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/books.model';
import { Categories } from 'src/app/shared/models/categories.model';
import { BooksService } from 'src/app/shared/services/books.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Response } from '../../shared/models/response.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  private categories: Categories[] = [];
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param);
      if (param && param.id) {
        this.fetchDetails(param.id);
      }
    });
    this.categoryService.categories$.subscribe((categories: Response) => {
      this.categories = categories.record;
    });
  }
  fetchDetails(BookId) {
    this.booksService.fetchBookById(BookId).subscribe((data: Response) => {
      this.book = data.record[0];
    });
  }
  addToCart() {
    this.cartService.addToCart(this.book);
  }
  getCategory(categoryId: string) {
    let category: Categories[] = [];
    if (this.categories)
      category = this.categories.filter((category: Categories) => {
        if (category._id === categoryId) {
          return category;
        }
      });
    return category && category.length == 1 ? category[0].category_type : {};
  }
}
