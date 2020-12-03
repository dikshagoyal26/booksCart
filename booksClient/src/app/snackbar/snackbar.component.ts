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
  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbarSubject.subscribe((state) => {
      console.log(state);
      //show,message,type
      // this.type = state.type || 'success';
      // this.message = state.message;
      // this.showSnackbar = state.show;
      // setTimeout(() => {
      //   this.showSnackbar = false;
      // }, 3000);
    });
  }
}
