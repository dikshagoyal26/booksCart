import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../shared/models/response.model';
import { BooksService } from '../shared/services/books.service';
import { CategoriesService } from '../shared/services/categories.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) {}

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    gender: ['', Validators.required],
  });
  categories: any = [];

  private id: string = '';
  ngOnInit(): void {}

  get registerFormControl() {
    return this.registerForm.controls;
  }

  validateUsername() {}
  register() {
    console.log(this.registerForm.value);
    this.userService
      .registerUser(this.registerForm.value)
      .subscribe((data: Response) => {
        console.log(data);
      });
  }
}
