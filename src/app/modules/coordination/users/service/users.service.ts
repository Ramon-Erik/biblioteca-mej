import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationState } from '@shared/interfaces/pagination.interface';
import { User, UserPageResponse, UserRole } from '@shared/interfaces/user.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

export interface UserFilters {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private readonly userUrl = `${environment.apiUrl}/usuarios`;

  // Gerenciadores de Estado Reativo
  private users$ = new BehaviorSubject<User[]>([]);
  private pagination$ = new BehaviorSubject<PaginationState>({
    pageNumber: 0,
    pageSize: 6, // Mantive o mesmo padrão de 6 do seu catálogo atual
    totalPages: 1,
    first: true,
    last: true,
  });

  // Filtros locais em memória para manter o estado da listagem
  private currentFilters: UserFilters = {
    page: 0,
    size: 6,
  };

  // Getters Públicos Assíncronos para os Componentes Assistirem
  get usersList() {
    return this.users$.asObservable();
  }

  get pagination() {
    return this.pagination$.asObservable();
  }

  get usersListLength() {
    return this.users$.pipe(map((users) => users.length));
  }

  // Pipeline para recarregar a listagem automaticamente após mutações
  private reloadUsers() {
    return switchMap(() => this.getUsersList());
  }

  /**
   * Busca a lista paginada de usuários na API
   */
  public getUsersList(filters?: Partial<UserFilters>) {
    if (filters) {
      this.currentFilters = { ...this.currentFilters, ...filters };
    }

    const params = new HttpParams()
      .set('page', this.currentFilters.page.toString())
      .set('size', this.currentFilters.size.toString());

    return this.http.get<UserPageResponse>(this.userUrl, { params }).pipe(
      tap((response) => {
        this.users$.next(response.content);

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

  /**
   * Navega para uma página específica mantendo os filtros
   */
  public goToPage(page: number) {
    return this.getUsersList({ page });
  }

  /**
   * Obtém os dados do perfil do usuário atualmente logado
   */
  public getMyProfile() {
    return this.http.get<User>(`${this.userUrl}/me`);
  }

  /**
   * Altera manualmente o papel (Role) de um usuário
   */
  public changeUserRole(id: string, role: UserRole) {
    return this.http
      .patch<void>(`${this.userUrl}/${id}/role`, null, {
        params: new HttpParams().set('role', role),
      })
      .pipe(this.reloadUsers());
  }

  /**
   * Promove o usuário para o papel de Administrador
   */
  public promoteToAdmin(id: string) {
    return this.http
      .patch<void>(`${this.userUrl}/${id}/promover-admin`, null)
      .pipe(this.reloadUsers());
  }

  /**
   * Rebaixa um administrador de volta para Leitor
   */
  public demoteToLeitor(id: string) {
    return this.http
      .patch<void>(`${this.userUrl}/${id}/rebaixar-leitor`, null)
      .pipe(this.reloadUsers());
  }

  /**
   * Bloqueia o acesso/login de um usuário no sistema
   */
  public blockUser(id: string) {
    return this.http.patch<void>(`${this.userUrl}/${id}/bloquear`, null).pipe(this.reloadUsers());
  }

  /**
   * Desbloqueia o acesso/login de um usuário no sistema
   */
  public unblockUser(id: string) {
    return this.http
      .patch<void>(`${this.userUrl}/${id}/desbloquear`, null)
      .pipe(this.reloadUsers());
  }
}
