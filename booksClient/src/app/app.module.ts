import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookCardComponent } from './books/book-card/book-card.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookCartComponent } from './books/book-cart/book-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksListComponent,
    BookCardComponent,
    NavbarComponent,
    BooksFormComponent,
    AdminBooksComponent,
    BookDetailsComponent,
    BookCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
