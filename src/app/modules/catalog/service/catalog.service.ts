import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book, Category, PageResponse, RawBook } from '@shared/interfaces/book.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, forkJoin, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http = inject(HttpClient);
  private readonly bookUrl = `${environment.apiUrl}/livros`;
  private readonly categoryUrl = `${environment.apiUrl}/categorias`;

  private books$ = new BehaviorSubject<Book[]>([]);
  private categories$ = new BehaviorSubject<Category[]>([]);

  get booksList() {
    return this.books$.asObservable();
  }

  get catalogLength() {
    return this.books$.pipe(map((catalog) => catalog.length));
  }

  get categoriesList() {
    return this.categories$.asObservable();
  }

  public createBook(book: RawBook) {
    console.warn('criar livro', book);

    return this.http.post(this.bookUrl, book).pipe(switchMap(() => this.getCatalogList()));
  }

  public getCatalogList() {
    console.log('up chamad');
    return this.http.get<PageResponse<Book>>(this.bookUrl).pipe(
      tap((booksResponse) => {
        this.books$.next(booksResponse.content);
      }),
    );
  }

  public getCategoriesList() {
    return this.http
      .get<Category[]>(this.categoryUrl)
      .pipe(tap((categoriesResponse) => this.categories$.next(categoriesResponse)));
  }

  public createCategory(name: string) {
    return this.http
      .post<Category>(this.categoryUrl, { nome: name, decricao: 'Descrição padrão' })
      .pipe(map((cat) => cat.id));
  }
  public deleteCategories(ids: string | string[]) {
    const idList = Array.isArray(ids) ? ids : [ids];

    const deleteRequests = idList.map((id) => this.http.delete<void>(`${this.categoryUrl}/${id}`));

    return forkJoin(deleteRequests).pipe(tap(() => this.getCategoriesList().subscribe()));
  }
}
