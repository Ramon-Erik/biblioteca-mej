import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationState } from '@shared/interfaces/pagination.interface';
import { User, UserPageResponse } from '@shared/interfaces/user.interface';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

export interface UserFilters {
  page: number;
  size: number;
  role?: string;
  ativo?: boolean;
  loginBloqueado?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private readonly userUrl = `${environment.apiUrl}/usuarios`;

  private users$ = new BehaviorSubject<User[]>([]);
  private pagination$ = new BehaviorSubject<PaginationState>({
    pageNumber: 0,
    pageSize: 6,
    totalPages: 1,
    first: true,
    last: true,
  });

  private currentFilters: UserFilters = {
    page: 0,
    size: 6,
  };

  get usersList() {
    return this.users$.asObservable();
  }

  get pagination() {
    return this.pagination$.asObservable();
  }

  get usersListLength() {
    return this.users$.pipe(map((users) => users.length));
  }

  private reloadUsers() {
    return switchMap(() => this.getUsersList());
  }

  public getUsersList(filters?: Partial<UserFilters>) {
    if (filters) {
      this.currentFilters = { ...this.currentFilters, ...filters };
    }

    let params = new HttpParams()
      .set('page', this.currentFilters.page)
      .set('size', this.currentFilters.size);

    const ignoreKeys = ['page', 'size'];
    Object.entries(this.currentFilters).forEach(([key, value]) => {
      if (ignoreKeys.includes(key) || value === undefined || value === null) {
        return;
      }

      params = params.set(key, value);
    });
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

  public goToPage(page: number) {
    return this.getUsersList({ page });
  }

  public promoteToAdmin(id: string) {
    return this.http
      .patch<User>(`${this.userUrl}/${id}/promover-admin`, null)
      .pipe(this.reloadUsers());
  }

  public demoteToLeitor(id: string) {
    return this.http
      .patch<User>(`${this.userUrl}/${id}/rebaixar-leitor`, null)
      .pipe(this.reloadUsers());
  }

  public blockUser(id: string, motivoBloqueio: string) {
    return this.http
      .patch<User>(`${this.userUrl}/${id}/bloquear`, { motivoBloqueio })
      .pipe(this.reloadUsers());
  }

  public unblockUser(id: string) {
    return this.http
      .patch<User>(`${this.userUrl}/${id}/desbloquear`, null)
      .pipe(this.reloadUsers());
  }
}
