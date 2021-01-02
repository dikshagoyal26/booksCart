import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBooksComponent } from '../components/admin/admin-books/admin-books.component';
import { BooksFormComponent } from '../components/admin/books-form/books-form.component';

const routes: Routes = [
  { path: '', component: AdminBooksComponent, pathMatch: 'full' },
  { path: 'books/add', component: BooksFormComponent },
  {
    path: 'books/update/:id',
    component: BooksFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
