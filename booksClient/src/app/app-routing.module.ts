import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'books',
  // },
  {
    path: 'admin',
    component: AdminBooksComponent,
    children: [
      // { path: '', component: AdminBooksComponent, pathMatch: 'full' },
      { path: 'books/add', component: BooksFormComponent },
      {
        path: 'books/update/:id',
        component: BooksFormComponent,
      },
    ],
  },
  {
    path: 'books',
    component: BooksListComponent,
    // children: [{ path: '', component: BooksListComponent, pathMatch: 'full' }],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
