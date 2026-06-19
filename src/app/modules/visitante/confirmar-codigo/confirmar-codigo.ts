import { Component, inject, signal, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { InputDefault } from '@shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../criar-conta/service/cadastro-service';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { LoginService } from '../login/service/login-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-confirmar-codigo',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './confirmar-codigo.html',
  styleUrl: './confirmar-codigo.scss',
})
export class ConfirmarCodigo implements OnInit {
  private readonly loginService = inject(LoginService);
  private readonly cadastroService = inject(CadastroService);
  private readonly router = inject(Router);
  private readonly actRouter = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  protected isLoading = signal(false);
  email = '';

  confCodeForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    this.actRouter.params.subscribe((params) => {
      this.email = params['email'];
      this.confCodeForm.patchValue({
        email: this.email,
      });
    });
  }

  protected confirmar(): void {
    if (this.confCodeForm.invalid) {
      this.confCodeForm.markAllAsTouched();
      return;
    }

    const code = this.confCodeForm.get('code')?.value || '';
    const email = this.confCodeForm.get('email')?.value || '';

    this.isLoading.set(true);

    this.cadastroService
      .confirmarCadastro(email, code)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.loginService.setUserData(response);
          this.router.navigate(['/catalogo-de-livros']);
        },
        error: (error) => {
          console.error('Erro ao confirmar cadastro:', error);
        },
      });
  }
}
