import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}
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
