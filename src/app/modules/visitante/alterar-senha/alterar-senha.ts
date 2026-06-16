import { Component, inject, signal, OnDestroy } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { AlterarSenhaService } from './service/alterar-senha-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alterar-senha',
  imports: [CommonModule, PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './alterar-senha.html',
  styleUrl: './alterar-senha.scss',
})
export class AlterarSenha implements OnDestroy {
  private readonly alterarSenhaService = inject(AlterarSenhaService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  
  protected loading = signal(false);
  protected counter = signal(0);
  protected codeEnviado = signal(false);
  protected emailEnviado = signal('');
  
  private timerInterval: any;

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email(): FormControl {
    return this.recoverForm.get('email') as FormControl;
  }

  get code(): FormControl {
    return this.recoverForm.get('code') as FormControl;
  }
  
  get underLinkMensage(): string {
    if (this.counter() > 0) {
      return `Reenviar código em ${this.counter()} segundos.`;
    }
    return 'Reenviar código';
  }

  get canResendCode(): boolean {
    return this.counter() === 0 && this.codeEnviado();
  }
  get isEmailInvalid(): boolean {
    return this.email?.invalid ?? false;
  }

  get isCodeInvalid(): boolean {
    return this.code?.invalid ?? false;
  }

  get isFormInvalid(): boolean {
    return this.loading() || this.isEmailInvalid;
  }

  get isCodeFormInvalid(): boolean {
    return this.loading() || this.isCodeInvalid;
  } 

  protected enviarCodigo(): void {
    console.log('clicked');
    if (this.recoverForm.get('email')?.invalid) {
      this.email?.markAsTouched();
      return;
    }

    this.loading.set(true);

    const email = this.email?.value || '';

    this.alterarSenhaService.solicitarAlteracao(email).subscribe({
      next: () => {
        this.loading.set(false);
        this.codeEnviado.set(true);
        this.emailEnviado.set(email);
        
        this.counter.set(60);
        this.iniciarContador();
        
        setTimeout(() => {
          document.getElementById('code-verify')?.focus();
        }, 100);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Erro ao enviar código:', error);
      }
    });
  }

  protected reenviarCodigo(): void {
    if (this.canResendCode) {
      this.enviarCodigo();
    }
  }

  protected verificarCode(): void {
    if (this.code?.invalid) {
      this.code?.markAsTouched();
      return;
    }

    this.loading.set(true);

    const token = this.code?.value || '';
    const email = this.emailEnviado();

    this.alterarSenhaService.validarToken(token).subscribe({
      next: (response) => {
        this.loading.set(false);
        
        if (response.valido) {
          this.router.navigate(['/confirmar-alteracao-senha'], {
            queryParams: { token: token }
          });
        }
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Erro ao validar código:', error);
      }
    });
  }

  private iniciarContador(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.counter.update(value => {
        if (value <= 1) {
          clearInterval(this.timerInterval);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  protected voltarParaLogin(): void {
    this.router.navigate(['/perfil']);
  }
}