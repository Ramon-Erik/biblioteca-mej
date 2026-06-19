import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  SolicitarAlteracaoResponse,
  SolicitarAlteracaoRequest,
  AlterarSenhaResponse,
  AlterarSenhaRequest,
} from '../interfaces/alterar-senha';

@Injectable({
  providedIn: 'root',
})
export class AlterarSenhaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth/senha`;

  public solicitarAlteracao(email: string): Observable<SolicitarAlteracaoResponse> {
    const body: SolicitarAlteracaoRequest = { email };
    return this.http.post<SolicitarAlteracaoResponse>(`${this.apiUrl}/solicitar-alteracao`, body);
  }

  public confirmarAlteracao(
    token: string,
    novaSenha: string,
    confirmarSenha: string,
  ): Observable<AlterarSenhaResponse> {
    const body: AlterarSenhaRequest = {
      token,
      novaSenha,
      confirmarSenha,
    };
    return this.http.post<AlterarSenhaResponse>(`${this.apiUrl}/confirmar-alteracao`, body);
  }

  public validarToken(token: string): Observable<{ valido: boolean }> {
    return this.http.get<{ valido: boolean }>(`${this.apiUrl}/validar-token/${token}`);
  }
}
