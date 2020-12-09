import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../models/backendUrl.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl: string = Url.backendUrl;
  constructor(private http: HttpClient) {}
  registerUser(user) {
    user.user_type = 1;
    return this.http.post(this.backendUrl + 'user/register', { user });
  }
}
