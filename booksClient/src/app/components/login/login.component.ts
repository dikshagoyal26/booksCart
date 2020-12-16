import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  public showPassword: boolean = false;
  public canDisplayError: boolean = false;
  public errorMessage: string = '';
  ngOnInit(): void {}
  get LoginFormControl() {
    return this.loginForm.controls;
  }
  loginUser() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data: { token: string }) => {
        window.localStorage.setItem('auth-token', data.token);
        this.userService.setUserDetails();
        this.router.navigate(['/books']);
      },
      (err) => {
        this.errorMessage = 'Username or Password is incorrect.';
        this.loginForm.patchValue({
          userName: '',
          password: '',
        });
        this.canDisplayError = true;
      }
    );
  }
}
