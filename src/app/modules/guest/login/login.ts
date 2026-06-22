import { Component, inject, signal } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private toastr = inject(ToastrService);
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
            const title = error.error.erro || 'Erro ao realizar operação';
            const msg = error.error.mensagem || 'Problemas com o servidor';
            this.toastr.error(msg, title, { timeOut: 5500 });
          },
        });
    } else {
      this.toastr.error('Erro', 'Preencha todos os campos corretamente.', { timeOut: 5500 });
    }
  }

  protected routeToAlterarSenha(): void {
    this.router.navigate(['mudar-senha']);
  }

  protected routeToCriarConta(): void {
    this.router.navigate(['cadastrar-se']);
  }
}
