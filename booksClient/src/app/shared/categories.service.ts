import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from './backendUrl.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = Url.backendUrl;
  }

  fetchCategories() {
    return this.http.get(this.backendUrl + 'category/fetch');
  }
}
