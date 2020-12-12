import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationsService {
  constructor(private userService: UserService) {}
  private timer: any;
  customValidator(control: AbstractControl) {
    if (this.timer) clearTimeout(this.timer);
    return new Promise((resolve) => {
      this.timer = setTimeout(() => {
        this.userService.validateUsername(control.value).subscribe(
          (result) => {
            if (result) resolve({ notAvailable: true });
            resolve(null);
          },
          (err) => {
            resolve({ notAvailable: true });
          }
        );
      }, 1000);
    });
  }
}
