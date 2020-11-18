import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksFormComponent } from './books/books-form/books-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    children: [
      { path: '', component: BooksListComponent, pathMatch: 'full' },
      { path: 'add', component: BooksFormComponent, pathMatch: 'full' },
      { path: 'update/:id', component: BooksFormComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
