import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Url } from '../models/backendUrl.model';
import { Categories } from '../models/categories.model';
import { Response } from '../models/response.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private backendUrl: string = Url.backendUrl;
  private categories: [];
  public categorySubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}
  categories$ = this.http
    .get<Response>(this.backendUrl + 'category/fetch')
    .pipe(shareReplay(1));

  // fetchCategories() {
  //   this.http
  //     .get(this.backendUrl + 'category/fetch')
  //     .subscribe((data: Response) => {
  //       if (data.status == 200) {
  //         this.categories = data.record;
  //         this.categorySubject.next(this.categories);
  //         console.log(data);
  //       } else {
  //         this.categories = [];
  //       }
  //     });
  // }
  getCategoryById(id: string) {
    let category;
    if (this.categories)
      category = this.categories.filter((category: any) => {
        if (category._id === id) {
          return category;
        }
      });
    return category && category.length == 1 ? category[0] : {};
  }
}