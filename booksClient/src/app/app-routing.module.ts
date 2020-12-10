import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookCartComponent } from './books/book-cart/book-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminBooksComponent, pathMatch: 'full' },
      { path: 'books/add', component: BooksFormComponent },
      {
        path: 'books/update/:id',
        component: BooksFormComponent,
      },
    ],
  },
  {
    path: 'books',
    children: [
      { path: '', component: BooksListComponent, pathMatch: 'full' },
      {
        path: 'details/:id',
        component: BookDetailsComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: 'cart', component: BookCartComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
