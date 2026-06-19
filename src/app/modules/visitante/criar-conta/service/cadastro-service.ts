import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import {
  cadastroRequest,
  cadastroResponse,
  confirmarCadastroRequest,
} from '../interfaces/cadastro';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiKey = `${environment.apiUrl}/auth/cadastro`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  public cadastro(
    nome: string,
    email: string,
    telefone: string,
    senha: string,
  ): Observable<cadastroResponse> {
    const body: cadastroRequest = {
      nomeCompleto: nome,
      email: email,
      telefoneWhatsaap: telefone,
      senha: senha,
    };

    return this.http.post<cadastroResponse>(this.apiKey, body);
  }

  public confirmarCadastro(email: string, codigo: string): Observable<cadastroResponse> {
    const body: confirmarCadastroRequest = {
      email: email,
      codigo: codigo,
    };

    return this.http.post<cadastroResponse>(`${this.apiKey}/confirmar`, body);
  }
}
