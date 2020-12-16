import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BooksFormComponent } from './components/books/books-form/books-form.component';
import { AdminBooksComponent } from './components/admin/admin-books/admin-books.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';

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
  { path: 'cart', component: CartComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
