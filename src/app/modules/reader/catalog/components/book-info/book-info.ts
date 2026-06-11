import { Component, input, OnChanges, signal } from '@angular/core';
import { Book } from '../../../../../shared/interfaces/book.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-book-info',
  imports: [NgClass],
  templateUrl: './book-info.html',
  styleUrl: './book-info.scss',
})
export class BookInfo implements OnChanges {
  public book = input.required<Book>();
  public alt = signal('');
  public isAvalible = signal(false);

  ngOnChanges() {
    this.alt.set(`Capa de ${this.book().nomeObra}`);
  }
}
