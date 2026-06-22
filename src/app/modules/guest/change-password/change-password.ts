import { AuthService } from 'app/core/services/auth/auth.service';
import { Component, inject, signal, OnDestroy } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { passwordStrengthValidator } from 'app/core/validators/password-strength.validator';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  protected isLoading = signal(false);
  protected counter = signal(0);
  protected codeEnviado = signal(false);
  protected isFirstTime = signal(true);
  protected emailEnviado = signal('');

  private timerInterval?: number;

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  passwordForm = this.fb.group(
    {
      newPassword: [
        '',
        [Validators.required, Validators.minLength(8), passwordStrengthValidator()],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordMatchValidator },
  );

  get email(): FormControl {
    return this.recoverForm.get('email') as FormControl;
  }

  get code(): FormControl {
    return this.recoverForm.get('code') as FormControl;
  }

  get newPassword(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  get isEmailInvalid(): boolean {
    return this.email?.invalid ?? false;
  }

  get isCodeInvalid(): boolean {
    return this.code?.invalid ?? false;
  }

  get isFormInvalid(): boolean {
    return this.isLoading() || this.isEmailInvalid;
  }

  get isPasswordFormInvalid(): boolean {
    return this.isLoading() || this.passwordForm.invalid;
  }

  get passwordControl(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  }

  hasMinLength(): boolean {
    return this.passwordControl?.value?.length >= 8 || false;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.passwordControl?.value || '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordControl?.value || '');
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.passwordControl?.value || '');
  }

  hasSymbol(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordControl?.value || '');
  }

  get underLinkMensage(): string {
    if (this.isFirstTime()) {
      return '';
    } else {
      if (this.counter() > 0) {
        return `Reenviar código em ${this.counter()} segundos.`;
      }
      return 'Reenviar código';
    }
  }

  get canResendCode(): boolean {
    return this.counter() === 0 && this.codeEnviado();
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  protected enviarCodigo(): void {
    if (this.email?.invalid) {
      this.email?.markAsTouched();
      this.toastr.error('Preencha um e-mail válido.', 'Erro', { timeOut: 5000 });
      return;
    }

    this.isLoading.set(true);

    const email = this.email?.value || '';

    this.authService
      .solicitarAlteracaoSenha(email)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          if (this.isFirstTime()) {
            this.isFirstTime.set(false);
          }

          if (this.codeEnviado()) {
            this.code?.reset();
            this.toastr.success('Um novo código foi enviado para seu email.', 'Código reenviado', {
              timeOut: 5000,
            });
          } else {
            this.codeEnviado.set(true);
            this.toastr.info(
              'Se o e-mail estiver cadastrado, um código foi enviado para sua caixa de entrada.',
              'Código enviado',
              { timeOut: 5000 },
            );
          }

          this.emailEnviado.set(email);
          this.counter.set(60);
          this.iniciarContador();

          setTimeout(() => {
            document.getElementById('code-verify')?.focus();
          }, 100);
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }
  protected setNewPassword(): void {
    if (!this.codeEnviado()) {
      this.toastr.warning('Solicite um código primeiro.', 'Atenção');
      return;
    }
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    if (this.code?.invalid) {
      this.code?.markAsTouched();
      return;
    }

    this.isLoading.set(true);

    const email = this.email?.value || '';
    const code = this.code?.value || '';
    const newPassword = this.newPassword?.value || '';

    this.authService
      .confirmarAlteracaoSenha(email, code, newPassword)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastr.success('Senha alterada com sucesso.', 'Sucesso', { timeOut: 5500 });
          this.router.navigate(['/catalogo-de-livros']);
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }

  private iniciarContador(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.counter.update((value) => {
        if (value <= 1) {
          clearInterval(this.timerInterval);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }

  protected backToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
