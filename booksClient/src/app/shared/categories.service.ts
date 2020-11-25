import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from './backendUrl.model';
import { Response } from './response.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private backendUrl: string;
  private categories: [];
  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }

  fetchCategories() {
    this.http
      .get(this.backendUrl + 'category/fetch')
      .subscribe((data: Response) => {
        if (data.status == 200) {
          this.categories = data.record;
          console.log(data);
        } else {
          this.categories = [];
          // alert(data.message);
        }
      });
  }
  getCategoryById(id: string) {
    let category = this.categories.filter((category: any) => {
      if (category._id === id) {
        return category;
      }
    });
    return category && category.length == 1 ? category[0] : {};
  }
  getCategories() {
    return this.categories ? this.categories.slice() : [];
  }
}
