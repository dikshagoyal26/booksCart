import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminBooksComponent } from '../components/admin/admin-books/admin-books.component';
import { BooksFormComponent } from '../components/admin/books-form/books-form.component';
import { FilterPipe } from '../shared/filters/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminBooksComponent, BooksFormComponent, FilterPipe],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
