import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {
  bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    category: ['', Validators.required],
    price: ['', [Validators.required]],
    cover: [''],
    currency: ['INR', Validators.required],
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
  }
  ngAfterViewInit() {
    this.fetchCategories();
  }
  get bookFormControl() {
    return this.bookForm.controls;
  }
  fetchCategories() {
    this.categories = this.categoriesService.getCategories();
  }
  initEditBook(bookId) {
    this.booksService.fetchBookById(bookId).subscribe((data: any) => {
      if (data.status == 200) {
        let record = data.record[0];
        this.bookForm.patchValue({
          title: record.title,
          author: record.author,
          category: record.category,
          price: record.price,
          cover: record.cover,
        });
      }
    });
  }
  saveBook() {
    console.log(this.bookForm.value);
    if (this.id) {
      this.booksService
        .updateBook(this.id, this.bookForm.value)
        .subscribe((data: any) => {
          if (data.status == 200) {
            alert('book added successfully');
            this.router.navigate(['/books']);
          } else {
            alert('issue in book add');
          }
        });
    } else {
      this.booksService.addBook(this.bookForm.value).subscribe((data: any) => {
        if (data.status == 200) {
          alert('book updated successfully');
          this.router.navigate(['/books']);
        } else {
          alert('issue in book update');
        }
      });
    }
  }
}
