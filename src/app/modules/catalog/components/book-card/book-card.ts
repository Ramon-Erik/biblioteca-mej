import { Component, input, OnChanges, signal } from '@angular/core';
import { Book } from '@shared/interfaces/book.interface';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard implements OnChanges {
  public book = input.required<Book>();
  public alt = signal('');
  public isAvalible = signal(false);

  ngOnChanges() {
    this.alt.set(`Capa de ${this.book().nomeObra}`);
  }
}
