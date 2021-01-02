import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminBooksComponent } from '../components/admin/admin-books/admin-books.component';
import { BooksFormComponent } from '../components/admin/books-form/books-form.component';

@NgModule({
  declarations: [AdminBooksComponent, BooksFormComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
