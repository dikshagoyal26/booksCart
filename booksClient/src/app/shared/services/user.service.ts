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
  loginUser(user) {
    return this.http.post(this.backendUrl + 'user/login', { user });
  }
  validateUsername(userName) {
    return this.http.get(
      this.backendUrl + 'user/validate-username?username=' + userName
    );
  }
}
