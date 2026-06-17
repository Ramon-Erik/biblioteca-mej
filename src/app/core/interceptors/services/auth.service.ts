import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { ReenviarCodeResponse } from 'app/core/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    
    private apiUrl = `${environment.apiUrl}/auth`;
    
    private dadosSubject = new BehaviorSubject<any[]>([]);
    public dados$ = this.dadosSubject.asObservable();
    
    public reenviarCodigo(email: string): Observable<ReenviarCodeResponse> {
        const body = {email: email};
        return this.http.post<ReenviarCodeResponse>(
            `${this.apiUrl}/reenviar-codigo`, body
        );
    }
}