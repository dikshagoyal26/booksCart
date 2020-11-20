import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { CategoriesService } from 'src/app/shared/categories.service';
@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {
  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    cover: [''],
    currency: ['', Validators.required],
  });
  categories: any = [];
  constructor(
    private categoriesService: CategoriesService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  private id: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params && params.id) {
        this.id = params.id;
        this.initEditBook(params.id);
      }
    });
    this.fetchCategories();
  }
  fetchCategories() {
    this.categories = this.categoriesService.getCategories();
  }
  initEditBook(bookId) {
    this.booksService.fetchBookById(bookId).subscribe((data: any) => {
      this.bookForm.patchValue({
        title: data.record.title,
        author: data.record.author,
        category: data.record.category,
        price: data.record.price,
        cover: data.record.cover,
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
            this.router.navigate(['/books']);
          } else {
            alert('issue in book add');
          }
        });
    } else {
      this.booksService.addBook(this.bookForm.value).subscribe((data: any) => {
        if (data.status == 'S') {
          alert('book updated successfully');
          this.router.navigate(['/books']);
        } else {
          alert('issue in book update');
        }
      });
    }
  }
}
