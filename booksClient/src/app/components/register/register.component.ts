import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationsService } from 'src/app/shared/services/custom-validations.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      console.log(this.registerForm, this.registerForm.value);
      return;
    }
    this.userService.registerUser(this.registerForm.value).subscribe(
      () => {
        this.snackbarService.show('User Registered Successfully!');
        this.router.navigate(['/login']);
      },
      (err) => {}
    );
  }
}
