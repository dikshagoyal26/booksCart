import { Categories } from './categories.model';

export class Book {
  _id: string;
  title: string;
  author: string;
  category: Categories;
  price: string;
  cover?: string;
}
