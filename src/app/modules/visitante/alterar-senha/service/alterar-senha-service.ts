import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../../../../shared/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AlterarSenhaService {
  private apiKey = '/auth/login';
  private http = inject(HttpClient);

  public login(identificador: string, senha: string): Observable<LoginResponse> {
    const body: LoginRequest = {
      identificador: identificador,
      senha: senha,
    };

    return this.http.post<LoginResponse>(this.apiKey, body);
  }
}
