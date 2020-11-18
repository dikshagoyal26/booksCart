import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from './backendUrl.model';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  fetchBooks() {
    return this.http.get(this.backendUrl + 'books/fetch');
  }
  fetchBookById(id) {
    return this.http.get(this.backendUrl + 'books/fetch/' + id);
  }
  addBook(bookObj) {
    return this.http.post(this.backendUrl + 'books/add', { book: bookObj });
  }
  updateBook(bookId, bookObj) {
    return this.http.post(this.backendUrl + 'books/update', {
      book: bookId,
      data: bookObj,
    });
  }
}
