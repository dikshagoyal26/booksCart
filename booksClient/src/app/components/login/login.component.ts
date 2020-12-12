import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '../../shared/models/response.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) {}
  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  public showPassword: boolean = false;

  ngOnInit(): void {}
  get LoginFormControl() {
    return this.loginForm.controls;
  }
  loginUser() {
    this.userService
      .loginUser(this.loginForm.value)
      .subscribe((res: Response) => {
        console.log(res);
        if (res.status == 200) {
          window.localStorage.setItem('token', res.token);
          window.localStorage.setItem('user', res.user);
        }
      });
  }
}
