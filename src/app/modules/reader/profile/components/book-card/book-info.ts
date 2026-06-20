import { Component, input, signal } from '@angular/core';
import { currentBook } from '../../service/profile.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-info',
  imports: [DatePipe],
  templateUrl: './book-info.html',
})
export class BookInfo {
  public book = input.required<currentBook>();
  public alt = signal('');
}
