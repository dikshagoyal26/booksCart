import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Url } from '../models/backendUrl.model';
import { User } from '../models/user';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl: string = Url.backendUrl;
  public userData: BehaviorSubject<any> = new BehaviorSubject<User>(new User());
  private userDetails: any;
  constructor(private http: HttpClient, private cartSercice: CartService) {}
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
      userDetails.firstName = decodeDetails.firstName;
      userDetails.isLoggedIn = true;
      console.log(userDetails);
      this.userDetails = userDetails;
      // this.cartSercice.cartItemcount$
      this.userData.next(userDetails);
    }
  }
  isAdmin() {
    if (this.userDetails && this.userDetails.user_type == 2) return true;
    return false;
  }
  isLoggedIn() {
    if (this.userDetails && this.userDetails.isLoggedIn) return true;
    return false;
  }
  getFirstName() {
    return this.userDetails.firstName;
  }
  logout() {
    localStorage.clear();
    this.userData.next(new User());
  }
}
