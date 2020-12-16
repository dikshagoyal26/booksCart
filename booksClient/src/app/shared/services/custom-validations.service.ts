import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { rejects } from 'assert';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationsService {
  constructor(private userService: UserService) {}
  private timer: any;
  usernameValidator(control: AbstractControl) {
    if (!control.value) return null;
    if (this.timer) clearTimeout(this.timer);
    // return new Promise((resolve) => {
    this.timer = setTimeout(() => {
      this.userService.validateUsername(control.value).subscribe(
        (result) => {
          if (result) control.setErrors({ notAvailable: false });
          // resolve(false);
        },
        (err) => {
          control.setErrors({ notAvailable: true });
          // return false;
          // resolve(true);
        }
      );
    }, 500);
    // });
  }
  passwordMatchValidator(control: AbstractControl) {
    let password: string = control.value.password;
    let confirmPassword: string = control.value.confirmPassword;
    if (password != confirmPassword) {
      control.get('confirmPassword').setErrors({ passwordMismatch: true });
    }
  }
  passwordValidator(control: AbstractControl) {
    if (!control.value) return null;
    const regexExp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    return regexExp.test(control.value) ? null : { invalidPassword: true };
  }
}
