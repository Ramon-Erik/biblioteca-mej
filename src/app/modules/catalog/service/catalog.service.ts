import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Book,
  CatalogFilters,
  Category,
  PageResponse,
  RawBook,
} from '@shared/interfaces/book.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, forkJoin, map, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http = inject(HttpClient);
  private readonly bookUrl = `${environment.apiUrl}/livros`;
  private readonly categoryUrl = `${environment.apiUrl}/categorias`;

  private currentFilters: CatalogFilters = {
    page: 0,
    size: 10,
    sort: 'criadoEm,DESC',
  };

  private books$ = new BehaviorSubject<Book[]>([]);
  private categories$ = new BehaviorSubject<Category[]>([]);

  get booksList() {
    return this.books$.asObservable();
  }

  get catalogLength() {
    return this.books$.pipe(map((catalog) => catalog.length));
  }

  get categoriesList() {
    return this.categories$.asObservable().pipe(shareReplay(1));
  }

  private reloadCatalog() {
    return switchMap(() => this.getCatalogList());
  }

  private reloadCategories() {
    return switchMap(() => this.getCategoriesList());
  }

  public createBook(book: RawBook) {
    console.warn('criar livro', book);

    return this.http.post(this.bookUrl, book).pipe(this.reloadCatalog());
  }

  public getCatalogList(filters?: Partial<CatalogFilters>) {
    if (filters) {
      this.currentFilters = { ...this.currentFilters, ...filters };
    }

    let params = new HttpParams()
      .set('page', this.currentFilters.page.toString())
      .set('size', this.currentFilters.size.toString())
      .set('sort', this.currentFilters.sort);

    if (this.currentFilters.categoriaId) {
      params = params.set('categoriaId', this.currentFilters.categoriaId);
    }

    return this.http.get<PageResponse<Book>>(this.bookUrl, { params }).pipe(
      tap((booksResponse) => {
        this.books$.next(booksResponse.content);
      }),
    );
  }

  public deleteBook(bookId: string) {
    const book = `${this.bookUrl}/${bookId}`;
    return this.http.delete<void>(book).pipe(this.reloadCatalog());
  }

  public updateBook(id: string, book: RawBook) {
    const bookId = `${this.bookUrl}/${id}`;
    console.log(book);

    return this.http.put<void>(bookId, book).pipe(this.reloadCatalog());
  }

  public getCategoriesList() {
    return this.http
      .get<Category[]>(this.categoryUrl)
      .pipe(tap((categoriesResponse) => this.categories$.next(categoriesResponse)));
  }

  public createCategory(name: string) {
    return this.http
      .post<Category>(this.categoryUrl, { nome: name, decricao: 'Descrição padrão' })
      .pipe(this.reloadCategories());
  }

  public deleteCategories(ids: string | string[]) {
    const idList = Array.isArray(ids) ? ids : [ids];

    const deleteRequests = idList.map((id) => this.http.delete<void>(`${this.categoryUrl}/${id}`));

    return forkJoin(deleteRequests).pipe(this.reloadCategories());
  }
}
