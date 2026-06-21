import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '@modules/coordination/users/service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpErrorResponse } from '@shared/interfaces/api-error.interface';
import { User } from '@shared/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-block-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './block-user-modal.html',
  styleUrls: ['./block-user-modal.scss'],
})
export class BlockUserModal {
  public activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  public toastr = inject(ToastrService);

  // Input obrigatório utilizando Signal conforme solicitado
  public user = input.required<User>();

  // Formulário reativo para validação do motivo
  public blockForm = this.fb.group({
    motivo: ['', [Validators.required, Validators.minLength(5)]],
  });

  public get isInvalid(): boolean {
    const control = this.blockForm.get('motivo');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public onSubmit(): void {
    if (this.blockForm.invalid) {
      this.blockForm.markAllAsTouched();
      return;
    }

    const motivoConstatado = this.blockForm.value.motivo ?? '';

    this.usersService.blockUser(this.user().id, motivoConstatado).subscribe({
      next: () => {
        this.activeModal.close();
        this.toastr.success('Usuário bloqueado!');
      },
      error: (error: ApiHttpErrorResponse) => {
        const title = error.error.erro || 'Erro ao realizar operação';
        const msg = error.error.mensagem || 'Problemas com o servidor';
        this.toastr.error(msg, title, { timeOut: 5500 });
      },
    });
  }
}
