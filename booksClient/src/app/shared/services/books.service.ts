import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/backendUrl.model';
import { Book } from '../models/books.model';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  fetchBooks() {
    return this.http.get<Book[]>(this.backendUrl + 'books/fetch');
  }
  fetchBookById(id: string) {
    return this.http.get<Book>(this.backendUrl + 'books/fetch/' + id);
  }
  fetchBooksByCategoryId(categoryId: string) {
    return this.http.get<Book[]>(
      this.backendUrl + 'books/fetch?category=' + categoryId
    );
  }
  addBook(bookObj) {
    return this.http.post<string>(this.backendUrl + 'books/add', bookObj);
  }
  updateBook(bookId, bookObj) {
    return this.http.post<string>(
      this.backendUrl + `books/update/${bookId}`,
      bookObj
    );
  }
  deleteBook(bookId) {
    return this.http.delete<string>(this.backendUrl + 'books/delete/' + bookId);
  }
}
