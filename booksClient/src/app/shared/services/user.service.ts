import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Url } from '../models/backendUrl.model';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl: string = Url.backendUrl;
  public userData: BehaviorSubject<any> = new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient) {}
  registerUser(user) {
    return this.http.post<string>(this.backendUrl + 'user/register', user);
  }
  loginUser(user) {
    return this.http.post<{ token: string }>(
      this.backendUrl + 'user/login',
      user
    );
  }
  validateUsername(userName) {
    return this.http.get<string>(
      this.backendUrl + 'user/validate-username?username=' + userName
    );
  }
  setUserDetails() {
    let token = localStorage.getItem('auth-token');
    if (token) {
      const userDetails = new User();
      const decodeDetails = JSON.parse(atob(token.split('.')[1]));
      userDetails._id = decodeDetails.user_id;
      userDetails.userName = decodeDetails.userName;
      userDetails.user_type = decodeDetails.userType;
      userDetails.firstName = decodeDetails.firstName;
      userDetails.isLoggedIn = true;
      this.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.userData.next(new User());
  }
}
