import { Component, OnInit } from '@angular/core';
import { Url } from 'src/app/shared/models/backendUrl.model';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  public imageUrl: string;
  constructor() {
    this.imageUrl = Url.backendUrl + 'uploads/not-found.png';
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }
}
