import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationsService } from 'src/app/shared/services/custom-validations.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Response } from '../../shared/models/response.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private customValidators: CustomValidationsService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  public registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      userName: [
        '',
        [
          Validators.required,
          this.customValidators.usernameValidator.bind(this.customValidators),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          this.customValidators.passwordValidator.bind(this.customValidators),
        ],
      ],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
    },
    {
      validators: [this.customValidators.passwordMatchValidator],
    }
  );
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  categories: any = [];

  private id: string = '';
  ngOnInit(): void {}

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(
      (res: Response) => {
        console.log(res);
        if (res.status == 200) {
          this.snackbarService.show('User Registered Successfully!');
          this.router.navigate(['/login']);
        }
      },
      (err) => {}
    );
  }
}
