import { Component, inject, signal } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  protected isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected fazerLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const identificador = this.loginForm.controls['email'].value || '';
      const senha = this.loginForm.controls['password'].value || '';

      this.authService
        .login(identificador, senha)
        .pipe(
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (response) => {
            this.authService.setUserData(response);
            this.router.navigate(['catalogo-de-livros']);
          },
          error: (error) => {
            console.error('Erro no login:', error);
            if (error.status === 401) {
              alert('Email ou senha inválidos!');
            } else if (error.status === 0) {
              alert('Erro de conexão com o servidor. Verifique se a API está rodando.');
            } else {
              alert('Erro ao tentar fazer login. Tente novamente.');
            }
          },
        });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  protected routeToAlterarSenha(): void {
    this.router.navigate(['mudar-senha']);
  }

  protected routeToCriarConta(): void {
    this.router.navigate(['cadastrar-se']);
  }
}
