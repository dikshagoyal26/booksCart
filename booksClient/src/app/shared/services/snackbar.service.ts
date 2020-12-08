import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public snackbar$ = new BehaviorSubject<any>(null);

  constructor() {}
  show(message: string, type?: string) {
    this.snackbar$.next({ show: true, message, type });
  }
}
