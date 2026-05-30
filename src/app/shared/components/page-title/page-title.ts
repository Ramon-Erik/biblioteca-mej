import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  imports: [],
  templateUrl: './page-title.html',
})
export class PageTitle {
  public title = input.required<string>();
  public subtitle = input<string>();
}
