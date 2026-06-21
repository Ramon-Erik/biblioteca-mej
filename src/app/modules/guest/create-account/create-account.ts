import { Component, inject, signal } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { InputDefault } from '@shared/components/input/input';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { finalize } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  protected isLoading = signal(false);

  cadastroForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$'), Validators.min(0)]],
      password: ['', [Validators.required]],
      passwordConf: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConf = group.get('passwordConf')?.value;

    if (password && passwordConf && password !== passwordConf) {
      return { passwordMismatch: true };
    }
    return null;
  }

  protected realizarCadastro(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    const password = this.cadastroForm.get('password')?.value;
    const passwordConf = this.cadastroForm.get('passwordConf')?.value;

    if (password !== passwordConf) {
      this.cadastroForm.get('passwordConf')?.setErrors({ passwordMismatch: true });
      return;
    }

    this.isLoading.set(true);

    const name = this.cadastroForm.get('name')?.value || '';
    const email = this.cadastroForm.get('email')?.value || '';
    const phone = this.cadastroForm.get('phone')?.value || '';
    const senha = this.cadastroForm.get('password')?.value || '';

    this.authService
      .cadastro(name, email, phone, senha)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          const email = this.cadastroForm.get('email')?.value || '';
          this.router.navigate([`/confirm-code/${email}`]);
        },
        error: (error) => {
          console.error('Erro ao realizar cadastro:', error);
        },
      });
  }

  protected backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
