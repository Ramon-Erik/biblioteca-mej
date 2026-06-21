import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationState } from '@shared/interfaces/pagination.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { LoanItem, LoanPageResponse, ProfileFilters } from '../interface/profile.interface';
import { Book } from '@shared/interfaces/book.interface';

interface currentBookResponse {
  id: string;
  livroId: string;
  nomeObra: string;
  leitorId: string;
  nomeLeitor: string;
  dataPedido: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal: null;
  quantidadeRenovacoes: number;
  status: 'EMPRESTADO' | 'DISPONIVEL';
}
export type currentBook = currentBookResponse & Book;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/emprestimos`;

  private currentBook$ = new BehaviorSubject<currentBook | undefined>(undefined);

  // Gerenciamento Reativo de Solicitações
  private requests$ = new BehaviorSubject<LoanItem[]>([]);
  private requestsPagination$ = new BehaviorSubject<PaginationState>({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    first: true,
    last: true,
  });

  // Gerenciamento Reativo do Histórico
  private history$ = new BehaviorSubject<LoanItem[]>([]);
  private historyPagination$ = new BehaviorSubject<PaginationState>({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    first: true,
    last: true,
  });

  // Filtros locais em memória para cada listagem
  private requestsFilters: ProfileFilters = { page: 0, size: 10 };
  private historyFilters: ProfileFilters = { page: 0, size: 10 };

  get currentBook() {
    return this.currentBook$.asObservable();
  }

  // Getters Públicos para os componentes assistirem
  get myRequests() {
    return this.requests$.asObservable();
  }
  get requestsPagination() {
    return this.requestsPagination$.asObservable();
  }

  get myHistory() {
    return this.history$.asObservable();
  }
  get historyPagination() {
    return this.historyPagination$.asObservable();
  }

  public getMyCurrentBook() {
    return this.http.get<currentBookResponse | void>(`${this.baseUrl}/emprestimo-atual`).pipe(
      switchMap((res) => {
        console.log(res);

        if (res && res.livroId) {
          return this.http
            .get<Book>(`${environment.apiUrl}/livros/${res.livroId}`)
            .pipe(tap((book) => this.currentBook$.next({ ...book, ...res })));
        }

        this.currentBook$.next(undefined);
        return of(res);
      }),
    );
  }

  public renewMyLoan(loanId: string) {
    return this.http
      .patch<currentBookResponse | void>(`${this.baseUrl}/${loanId}/renovar`, {
        id: loanId,
      })
      .pipe(switchMap(() => this.getMyCurrentBook()));
  }

  public returnMyBorrowedBook(loanId: string) {
    return this.http
      .patch<currentBookResponse | void>(`${this.baseUrl}/${loanId}/devolver`, {
        id: loanId,
      })
      .pipe(switchMap(() => this.getMyCurrentBook()));
  }

  /**
   * GET /emprestimos/minhas-solicitacoes
   * Busca as solicitações atuais feitas pelo usuário logado
   */
  public getMyRequests(filters?: Partial<ProfileFilters>) {
    if (filters) {
      this.requestsFilters = { ...this.requestsFilters, ...filters };
    }

    // Configura os query params exigidos na especificação da API
    const params = new HttpParams()
      .set('page', this.requestsFilters.page.toString())
      .set('size', this.requestsFilters.size.toString())
      .set('sort', 'dataPedido,DESC'); // Valor padrão documentado na sua API

    return this.http.get<LoanPageResponse>(`${this.baseUrl}/minhas-solicitacoes`, { params }).pipe(
      tap((response) => {
        this.requests$.next(response.content);
        this.requestsPagination$.next({
          pageNumber: response.number,
          pageSize: response.size,
          totalPages: response.totalPages,
          first: response.first,
          last: response.last,
        });
      }),
    );
  }

  public disaproveRequest(id: string) {
    return this.http
      .patch<LoanItem>(`${this.baseUrl}/${id}/cancelar`, { id })
      .pipe(switchMap(() => this.getMyRequests()));
  }

  /**
   * Navegação de página para as Solicitações
   */
  public goToRequestsPage(page: number) {
    return this.getMyRequests({ page });
  }

  /**
   * GET /emprestimos/emprestimos-historico/meus
   * Busca o histórico completo de empréstimos passados/devolvidos do usuário logado
   */
  public getMyHistory(filters?: Partial<ProfileFilters>) {
    if (filters) {
      this.historyFilters = { ...this.historyFilters, ...filters };
    }

    const params = new HttpParams()
      .set('page', this.historyFilters.page.toString())
      .set('size', this.historyFilters.size.toString())
      .set('sort', 'dataPedido,DESC');

    return this.http
      .get<LoanPageResponse>(`${this.baseUrl}/emprestimos-historico/meus`, { params })
      .pipe(
        tap((response) => {
          this.history$.next(response.content);
          this.historyPagination$.next({
            pageNumber: response.number,
            pageSize: response.size,
            totalPages: response.totalPages,
            first: response.first,
            last: response.last,
          });
        }),
      );
  }

  /**
   * Navegação de página para o Histórico
   */
  public goToHistoryPage(page: number) {
    return this.getMyHistory({ page });
  }
}
