import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
  UserData,
} from './../../../shared/interfaces/login.interface';
import {
  cadastroRequest,
  cadastroResponse,
  confirmarCadastroRequest,
} from './../../../modules/visitante/criar-conta/interfaces/cadastro';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  private userSubject = new BehaviorSubject<UserData | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = sessionStorage.getItem('token');
    const user = this.getUserData();

    if (token && user) {
      this.isAuthenticatedSubject.next(true);
      this.userSubject.next(user);
      this.userRoleSubject.next(user.role || null);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.userSubject.next(null);
      this.userRoleSubject.next(null);
    }
  }

  private validateRole(role: string | null): 'ADMIN' | 'LEITOR' | '' {
    if (role === 'ADMIN' || role === 'LEITOR') {
      return role;
    }
    return '';
  }

  private getUserData(): UserData {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');
    const userPhone = sessionStorage.getItem('userPhone');

    if (userId && userName && userEmail && userRole && userPhone) {
      return {
        id: userId,
        nomeCompleto: userName,
        email: userEmail,
        role: this.validateRole(userRole),
        telefoneWhatsapp: userPhone,
      };
    } else {
      return {
        id: '',
        nomeCompleto: '',
        email: '',
        role: '',
        telefoneWhatsapp: '',
      };
    }
  }

  public login(identificador: string, senha: string): Observable<LoginResponse> {
    const body: LoginRequest = {
      identificador: identificador,
      senha: senha,
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

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

    return this.http.post<cadastroResponse>(`${this.apiUrl}/cadastro`, body);
  }

  public confirmarCadastro(email: string, codigo: string): Observable<cadastroResponse> {
    const body: confirmarCadastroRequest = {
      email: email,
      codigo: codigo,
    };

    return this.http.post<cadastroResponse>(`${this.apiUrl}/cadastro/confirmar`, body);
  }

  public setUserData(response: LoginResponse): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('userId', response.id);
    sessionStorage.setItem('userName', response.nomeCompleto);
    sessionStorage.setItem('userEmail', response.email);
    sessionStorage.setItem('userRole', response.role);
    sessionStorage.setItem('userPhone', response.telefoneWhatsapp);

    this.isAuthenticatedSubject.next(true);
    const userData = this.getUserData();
    this.userSubject.next(userData);
    this.userRoleSubject.next(userData.role || null);
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userPhone');

    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    this.userRoleSubject.next(null);

    this.router.navigate(['']);
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  public isAdmin(): Observable<boolean> {
    return this.userRole$.pipe(map((role) => role === 'ADMIN'));
  }

  public isAdminSync(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}
