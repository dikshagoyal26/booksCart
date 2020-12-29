import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { Url } from '../models/backendUrl.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private backendUrl: string = Url.backendUrl;
  constructor(private http: HttpClient) {}
  categories$ = this.http
    .get<any>(this.backendUrl + 'category/fetch')
    .pipe(shareReplay(1));
}
