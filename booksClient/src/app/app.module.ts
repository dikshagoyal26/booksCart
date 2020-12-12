import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BookCardComponent } from './components/books/book-card/book-card.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooksFormComponent } from './components/books/books-form/books-form.component';
import { AdminBooksComponent } from './components/admin/admin-books/admin-books.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookCartComponent } from './components/books/book-cart/book-cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterPipe } from './shared/filter.pipe';

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
    PageNotFoundComponent,
    SnackbarComponent,
    LoginComponent,
    RegisterComponent,
    PaginationComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
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
