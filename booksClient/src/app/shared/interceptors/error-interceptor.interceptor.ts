import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500 || err.status == 401) {
          console.log(err);
          this.userService.logout();
          if (!request.url.includes('login')) {
            location.reload();
          }
        } else {
          this.router.navigate(['not-found']);
          const error = err.message || err.statusText;
          return throwError(error);
        }
      })
    );
  }
}
