import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { CategoriesService } from 'src/app/shared/categories.service';

@Component({
  selector: 'app-books-upsert',
  templateUrl: './books-upsert.component.html',
  styleUrls: ['./books-upsert.component.scss'],
})
export class BooksUpsertComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    cover: new FormControl(''),
    currency: new FormControl(''),
  });
  categories: any = [];
  constructor(
    private categoriesService: CategoriesService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  private id: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      if (params && params.id) {
        this.id = params.id;
        this.initEditBook(params.id);
      }
    });
    this.categoriesService.fetchCategories().subscribe((data: any) => {
      if (data.status == 'S') {
        this.categories = data.record;
      } else {
        alert(data.message);
      }
    });
  }
  initEditBook(bookId) {
    this.booksService.fetchBookById(bookId).subscribe((data: any) => {
      console.log(data);
      this.bookForm.patchValue({
        title: data.record.title,
        author: data.record.author,
        category: data.record.category,
        price: data.record.price,
        cover: data.record.cover,
        currency: data.record.currency,
      });
    });
  }
  saveBook() {
    console.log(this.bookForm.value);
    if (this.id) {
      this.booksService
        .updateBook(this.id, this.bookForm.value)
        .subscribe((data: any) => {
          if (data.status == 'S') {
            alert('book added successfully');
            this.bookForm.patchValue({
              title: '',
              author: '',
              category: '',
              price: '',
              cover: '',
              currency: '',
            });
            this.router.navigate(['/books'])
          } else {
            alert('issue in book add');
          }
        });
    } else {
      this.booksService.addBook(this.bookForm.value).subscribe((data: any) => {
        console.log(data);
        if (data.status == 'S') {
          alert('book updated successfully');
          this.bookForm.patchValue({
            title: '',
            author: '',
            category: '',
            price: '',
            cover: '',
            currency: '',
          });
          this.router.navigate(['/books'])
        } else {
          alert('issue in book update');
        }
      });
    }
  }
}
