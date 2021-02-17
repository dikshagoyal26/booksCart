import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/books.model';
import { BooksService } from 'src/app/shared/services/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
})
export class AdminBooksComponent implements OnInit {
  public books: Book[];
  public searchData: string = '';
  public modalRef: BsModalRef;
  public selectedBook: Book;
  public isLoading: boolean = true;
  public itemsPerPage: number = 15;
  public returnedArray: Book[] = [];
  public endIndex: number = 0;
  constructor(
    private booksService: BooksService,
    private router: Router,
    private snackbarService: SnackbarService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.fetchBooks();
  }
  fetchBooks() {
    this.booksService.fetchBooks().subscribe((books: Book[]) => {
      this.books = books;
      if (this.books)
        this.returnedArray = this.books.slice(0, this.itemsPerPage);
      this.isLoading = false;
    });
  }
  editBook(id: string) {
    this.router.navigate([`/admin/books/update/${id}`]);
  }
  deleteBook(bookId) {
    this.booksService.deleteBook(bookId).subscribe(
      () => {
        this.modalRef.hide();
        this.snackbarService.show('book deleted successfully');
        this.fetchBooks();
      },
      () => {
        this.snackbarService.show('error while deleting book', 'danger');
      }
    );
  }
  showDeleteBookModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    window.scrollTo({ top: 0 });
    this.returnedArray = this.books.slice(startItem, endItem);
    this.endIndex = startItem;
  }
}
