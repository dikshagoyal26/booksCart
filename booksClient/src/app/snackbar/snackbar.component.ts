import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  public showSnackbar: boolean = false;
  public message: string = 'this is a test snackbar';
  public type: string = 'success';
  public timer: any;
  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbar$.subscribe((state) => {
      if (state) {
        this.type = state.type || 'success';
        this.message = state.message;
        this.showSnackbar = state.show;
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showSnackbar = false;
        }, 1000);
      }
    });
  }
  closeSnackbar() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.showSnackbar = false;
    }
  }
}
