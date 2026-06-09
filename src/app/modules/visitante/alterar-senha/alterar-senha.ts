import { Component, inject, signal } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';
import { Router } from '@angular/router';
import { AlterarSenhaService } from './service/alterar-senha-service';

@Component({
  selector: 'app-alterar-senha',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './alterar-senha.html',
  styleUrl: './alterar-senha.scss',
})
export class AlterarSenha {
  private readonly alterarSenhaService = inject(AlterarSenhaService);
  private readonly router = inject(Router);
  protected alderyClicked = signal(false);

  protected counter = 0;

  recoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl(),
  });

  get emailControl(): FormControl {
    return this.recoverForm.controls.email;
  }

  get codeControl(): FormControl {
    return this.recoverForm.controls.code;
  }

  get underLinkMensage(): string {
    if (this.counter > 0) {
      return 'Reenviar código em ' + this.counter + ' segundos.';
    } else {
      return '';
    }
  }

  protected enviarCodigo(): void {
    this.counter = 60;
    this.decrementarContador();
  }

  private decrementarContador(): void {
    if (this.counter > 0) {
      this.counter--;
      setTimeout(() => this.decrementarContador(), 1000);
    }
  }
}
