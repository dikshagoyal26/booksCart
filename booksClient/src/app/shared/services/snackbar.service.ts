import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public snackbarSubject = new BehaviorSubject<any>(null);
  public snackbarState = this.snackbarSubject.asObservable();

  constructor() {}
  show(message: string, type?: string) {
    this.snackbarSubject.next({ show: true, message, type });
  }
}
