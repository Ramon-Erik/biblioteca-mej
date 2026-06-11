import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Book, PageResponse } from '@shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReaderCatalog {
  private apiKey = 'http://localhost:8080/livros';
  private http = inject(HttpClient);

  private books = new BehaviorSubject<Book[]>([]);

  get booksCatalog() {
    return this.books.asObservable();
  }

  get catalogLength() {
    return this.books.pipe(map((catalog) => catalog.length));
  }

  public updateCatalogList() {
    return this.http.get<PageResponse<Book>>(this.apiKey).pipe(
      tap((booksResponse) => {
        this.books.next(booksResponse.content);
      }),
    );
  }
}
