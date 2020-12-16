import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/backendUrl.model';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  fetchBooks() {
    return this.http.get<any>(this.backendUrl + 'books/fetch');
  }
  fetchBookById(id: string) {
    return this.http.get<any>(this.backendUrl + 'books/fetch/' + id);
  }
  fetchBooksByCategoryId(categoryId: string) {
    return this.http.get<any>(
      this.backendUrl + 'books/fetch?category=' + categoryId
    );
  }
  addBook(bookObj) {
    return this.http.post<any>(this.backendUrl + 'books/add', {
      book: bookObj,
    });
  }
  updateBook(bookId, bookObj) {
    return this.http.post<any>(this.backendUrl + 'books/update', {
      book: bookId,
      data: bookObj,
    });
  }
  deleteBook(bookId) {
    return this.http.delete<any>(this.backendUrl + 'books/delete/' + bookId);
  }
}
