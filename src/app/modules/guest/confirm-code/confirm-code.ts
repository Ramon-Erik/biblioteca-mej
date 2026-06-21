import { Component, inject, signal, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { InputDefault } from '@shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-code',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './confirm-code.html',
  styleUrl: './confirm-code.scss',
})
export class ConfirmCode implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly actRouter = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
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
      this.toastr.error('Preencha todos os campos corretamente.', 'Erro', { timeOut: 5000 });
      return;
    }

    const code = this.confCodeForm.get('code')?.value || '';
    const email = this.confCodeForm.get('email')?.value || '';

    this.isLoading.set(true);

    this.authService
      .confirmarCadastro(email, code)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.toastr.success('Cadastro criado com sucesso.', 'Sucesso', { timeOut: 5500 });
          this.authService.setUserData(response);
          this.router.navigate(['/catalogo-de-livros']);
        },
        error: (error) => {
          console.error('Erro ao confirmar cadastro:', error);
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }
}
