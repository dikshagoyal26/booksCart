import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/backendUrl.model';
import { Book } from '../models/books.model';
import { Filter } from '../models/filter.model';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl: string;
  private timer: any;
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }
  showBookSuggestions(item: string) {
    return new Promise((resolve, reject) => {
      if (!item) return null;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.fetchBooksByFilter({ item }).subscribe((book: Book[]) => {
          resolve(book);
        });
      }, 100);
    });
  }
  fetchBooks() {
    return this.http.get<Book[]>(this.backendUrl + 'books/fetch');
  }
  fetchBookById(id: string) {
    return this.http.get<Book>(this.backendUrl + 'books/fetch/' + id);
  }
  fetchBooksByFilter(filter: Filter) {
    const serializedFilter = this.serialize(filter);
    return this.http.get<Book[]>(
      this.backendUrl + 'books/fetch?' + serializedFilter
    );
  }
  addBook(bookObj) {
    return this.http.post<string>(this.backendUrl + 'admin/book/add', bookObj);
  }
  updateBook(bookId, bookObj) {
    return this.http.post<string>(
      this.backendUrl + `admin/book/update/${bookId}`,
      bookObj
    );
  }
  deleteBook(bookId) {
    return this.http.delete<string>(
      this.backendUrl + 'admin/book/delete/' + bookId
    );
  }
  private serialize(obj) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
  getCoverImage(book: Book) {
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
}
