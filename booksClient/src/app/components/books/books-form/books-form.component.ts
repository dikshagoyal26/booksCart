import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  public bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    category: ['', Validators.required],
    price: ['', [Validators.required]],
    cover: [''],
    currency: ['INR', Validators.required],
  });
  public categories: any = [];
  public formTitle: string = 'Add';
  private id: string = '';
  ngOnInit(): void {
    this.categoriesService.categories$.subscribe((categories: Categories[]) => {
      this.categories = categories;
    });
    this.route.params.subscribe((params: any) => {
      if (params?.id) {
        this.formTitle = 'Edit';
        this.id = params.id;
        this.initEditBook(params.id);
      } else {
        this.formTitle = 'Add';
      }
    });
  }

  get bookFormControl() {
    return this.bookForm.controls;
  }

  initEditBook(bookId) {
    this.booksService.fetchBookById(bookId).subscribe((book: Book) => {
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price,
        cover: book.cover,
      });
    });
  }
  saveBook() {
    if (!this.bookForm.value.cover) {
      this.bookForm.patchValue({
        cover:
          'https://www.forewordreviews.com/books/covers/not-for-profit.jpg',
      });
    }

    if (this.id) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }
  addBook() {
    this.booksService.addBook(this.bookForm.value).subscribe(
      () => {
        this.snackbarService.show('book added successfully');
        this.router.navigate(['/books']);
      },
      () => {
        this.snackbarService.show('issue in book add', 'danger');
      }
    );
  }
  updateBook() {
    this.booksService.updateBook(this.id, this.bookForm.value).subscribe(
      () => {
        this.snackbarService.show('book updated successfully');
        this.router.navigate(['/books']);
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('issue in book update', 'danger');
      }
    );
  }
}
