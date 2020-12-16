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
  setUserDetails() {
    let token = localStorage.getItem('auth-token');
    console.log(token);
    if (token) {
      const userDetails = new User();
      const decodeDetails = JSON.parse(atob(token.split('.')[1]));
      userDetails._id = decodeDetails.user_id;
      userDetails.userName = decodeDetails.userName;
      userDetails.user_type = decodeDetails.userType;
      userDetails.isLoggedIn = true;
      console.log(userDetails);
      this.userData.next(userDetails);
    }
  }
  logout() {
    localStorage.clear();
    this.userData.next(new User());
  }
}
