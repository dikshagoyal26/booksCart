import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500) {
          this.snackbarService.show('Something Went Wrong!!');
          return throwError(err.message || err.statusText);
        } else {
          return;
        }
      })
    );
  }
}
