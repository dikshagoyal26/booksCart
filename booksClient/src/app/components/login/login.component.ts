import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  public showPassword: boolean = false;
  private returnUrl: string = null;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params && params.returnUrl) this.returnUrl = params.returnUrl;
    });
  }
  get LoginFormControl() {
    return this.loginForm.controls;
  }
  loginUser() {
    if (!this.loginForm.valid) return;
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data: { token: string }) => {
        window.localStorage.setItem('auth-token', data.token);
        this.userService.setUserDetails();
        if (this.returnUrl) this.router.navigate([this.returnUrl]);
        else this.router.navigate(['/books']);
      },
      (err) => {
        console.log(err);
        this.loginForm.reset();
        this.loginForm.setErrors({ invalidLogin: true });
      }
    );
  }
}
