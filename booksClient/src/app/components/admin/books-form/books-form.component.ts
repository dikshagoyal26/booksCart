import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Book } from 'src/app/shared/models/books.model';
import { Url } from 'src/app/shared/models/backendUrl.model';
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
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    cover: [''],
    currency: ['INR', Validators.required],
  });
  public categories: any = [];
  public formTitle: string = 'Add';
  public coverImagePath: any;
  private id: string = '';
  private file: any;
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
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookForm.patchValue({ cover: file });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (myevent: ProgressEvent) => {
        this.coverImagePath = (myevent.target as FileReader).result;
      };
    }
  }
  initEditBook(bookId) {
    this.booksService.fetchBookById(bookId).subscribe((book: Book) => {
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        category: book.category._id,
        price: book.price,
        cover: book.cover,
      });
      this.coverImagePath = this.getCover(book);
    });
  }
  getCover(book: Book) {
    if (book && book.cover) {
      if (
        book.cover.startsWith('https://') ||
        book.cover.startsWith('http://')
      ) {
        return book.cover;
      } else {
        return Url.backendUrl + 'uploads/' + book.cover;
      }
    } else {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxa-H7vHgjDI9F3X1dNDtq_u5B6fGCluebxA&usqp=CAU';
    }
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
  private addBook() {
    let bookObj = this.getFormData();
    console.log(bookObj);
    this.booksService.addBook(bookObj).subscribe(
      () => {
        this.snackbarService.show('book added successfully');
        this.bookForm.reset();
        this.router.navigate(['/admin']);
      },
      () => {
        this.snackbarService.show('issue in book add', 'danger');
      }
    );
  }
  private updateBook() {
    let bookObj = this.getFormData();
    this.booksService.updateBook(this.id, bookObj).subscribe(
      () => {
        this.snackbarService.show('book updated successfully');
        this.router.navigate(['/admin']);
      },
      (err) => {
        console.log(err);
        this.snackbarService.show('issue in book update', 'danger');
      }
    );
  }
  private getFormData() {
    var formdata = new FormData();
    formdata.append('title', this.bookForm.controls.title.value);
    formdata.append('author', this.bookForm.controls.author.value);
    formdata.append('category', this.bookForm.controls.category.value);
    formdata.append('price', this.bookForm.controls.price.value);
    formdata.append('cover', this.bookForm.controls.cover.value);
    return formdata;
  }
}
