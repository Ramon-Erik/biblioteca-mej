import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../../../../shared/interfaces/login.interface';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiKey = `${environment.apiUrl}/auth/login`;
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private userSubject = new BehaviorSubject<any>(null);
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
    } else {
      this.isAuthenticatedSubject.next(false);
      this.userSubject.next(null);
    }
  }

  private getUserData(): any {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');
    const userPhone = sessionStorage.getItem('userPhone');

    if (userId && userName) {
      return {
        id: userId,
        nomeCompleto: userName,
        email: userEmail,
        role: userRole,
        telefoneWhatsapp: userPhone
      };
    }
    return null;
  }

  public login(identificador: string, senha: string): Observable<LoginResponse> {
    const body: LoginRequest = {
      identificador: identificador,
      senha: senha,
    };

    return this.http.post<LoginResponse>(this.apiKey, body);
  }

  public setUserData(response: LoginResponse): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('userId', response.id);
    sessionStorage.setItem('userName', response.nomeCompleto);
    sessionStorage.setItem('userEmail', response.email);
    sessionStorage.setItem('userRole', response.role);
    sessionStorage.setItem('userPhone', response.telefoneWhatsapp);

    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(this.getUserData());
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

  public isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}