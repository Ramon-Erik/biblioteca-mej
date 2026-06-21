import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationState } from '@shared/interfaces/pagination.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

export interface AdminLoanItem {
  id: string;
  livroId: string;
  nomeObra: string;
  leitorId: string;
  nomeLeitor: string;
  dataPedido: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal: string;
  quantidadeRenovacoes: number;
  status: 'SOLICITADO' | 'EMPRESTADO' | 'DEVOLVIDO' | 'RECUSADO';
}

export interface AdminLoanPageResponse {
  content: AdminLoanItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface LoanFilters {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminLoansService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/emprestimos`;

  private requests$ = new BehaviorSubject<AdminLoanItem[]>([]);
  private pagination$ = new BehaviorSubject<PaginationState>({
    pageNumber: 0,
    pageSize: 6,
    totalPages: 1,
    first: true,
    last: true,
  });

  private currentFilters: LoanFilters = {
    page: 0,
    size: 6,
  };

  get requestsList() {
    return this.requests$.asObservable();
  }

  get pagination() {
    return this.pagination$.asObservable();
  }

  private reloadRequests() {
    return switchMap(() => this.getRequestsList());
  }

  /**
   * GET /emprestimos/solicitacoes
   */
  public getRequestsList(filters?: Partial<LoanFilters>) {
    if (filters) {
      this.currentFilters = { ...this.currentFilters, ...filters };
    }

    const params = new HttpParams()
      .set('page', this.currentFilters.page.toString())
      .set('size', this.currentFilters.size.toString());

    return this.http.get<AdminLoanPageResponse>(`${this.baseUrl}/solicitacoes`, { params }).pipe(
      tap((response) => {
        this.requests$.next(response.content);

        this.pagination$.next({
          pageNumber: response.number,
          pageSize: response.size,
          totalPages: response.totalPages,
          first: response.first,
          last: response.last,
        });
      }),
    );
  }

  public goToPage(page: number) {
    return this.getRequestsList({ page });
  }

  /**
   * POST /emprestimos/{id}/emprestar
   * Efetiva a liberação do livro e recarrega a lista reativamente
   */
  public approveLoan(id: string) {
    return this.http
      .post<AdminLoanItem>(`${this.baseUrl}/${id}/emprestar`, null)
      .pipe(this.reloadRequests());
  }
}
