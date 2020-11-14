import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private backendUrl = 'http://localhost:5000/';

  constructor(private http:HttpClient) { }
  fetchCategories() {
    return this.http.get(this.backendUrl + 'category/fetch');
  }
}
