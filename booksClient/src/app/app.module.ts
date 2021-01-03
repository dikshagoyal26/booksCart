import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BookCardComponent } from './components/books/book-card/book-card.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartComponent } from './components/cart/cart.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpInterceptorInterceptor } from './shared/interceptors/http-interceptor.interceptor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ErrorInterceptorInterceptor } from './shared/interceptors/error-interceptor.interceptor';
import { BookFiltersComponent } from './components/books/book-filters/book-filters.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PasswordDirective } from './shared/directive/password.directive';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksListComponent,
    BookCardComponent,
    NavbarComponent,
    BookDetailsComponent,
    PageNotFoundComponent,
    SnackbarComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    AddToCartComponent,
    BookFiltersComponent,
    SearchBarComponent,
    OrdersComponent,
    CheckoutComponent,
    WishlistComponent,
    PasswordDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    AdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
