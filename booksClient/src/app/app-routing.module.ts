import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksUpsertComponent } from './books/books-upsert/books-upsert.component';

const routes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: BooksListComponent },
      { path: 'upsert', component: BooksUpsertComponent },
      { path: 'upsert/:id', component: BooksUpsertComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
