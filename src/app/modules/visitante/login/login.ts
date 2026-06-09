import { Component, inject } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { LoginService } from './service/login-service';

@Component({
  selector: 'app-login',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailControl(): FormControl {
    return this.loginForm.controls.email;
  }

  get passwordControl(): FormControl {
    return this.loginForm.controls.password;
  }

  protected fazerLogin(): void {
    if (this.loginForm.valid) {
      const identificador = this.emailControl.value || '';
      const senha = this.passwordControl.value || '';

      this.loginService.login(identificador, senha).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.id);
          sessionStorage.setItem('userName', response.nomeCompleto);
          sessionStorage.setItem('userEmail', response.email);
          sessionStorage.setItem('userRole', response.role);
          sessionStorage.setItem('userPhone', response.telefoneWhatsapp);

          //if (response.role === 'ADMIN') {
          this.router.navigate(['catalogo-de-livros']);
          //} else {
          //  this.router.navigate(['catalogo-de-livros']);
          //}
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
    this.router.navigate(['alterar-senha']);
  }
}
