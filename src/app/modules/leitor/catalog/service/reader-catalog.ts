import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IBook } from '../../../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReaderCatalog {
  private apiKey = 'localhost:8080/livros';
  private http = inject(HttpClient);

  private books = new BehaviorSubject<IBook[]>([]);

  get booksCatalog() {
    return this.books.asObservable();
  }

  public updateCatalogList() {
    return this.http.get<IBook[]>(this.apiKey).pipe(
      tap((booksResponse) => {
        this.books.next(booksResponse);
      }),
    );
  }
}
