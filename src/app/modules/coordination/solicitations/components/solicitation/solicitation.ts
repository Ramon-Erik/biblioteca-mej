import { Component, inject, input, signal } from '@angular/core';
import { AdminLoanItem, AdminLoansService } from '../../service/admin-loan.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-solicitation',
  imports: [DatePipe, ButtonDefault],
  templateUrl: './solicitation.html',
  styleUrl: './solicitation.scss',
})
export class Solicitation {
  private toastr = inject(ToastrService);
  private adminLoansService = inject(AdminLoansService);

  public soli = input.required<AdminLoanItem>();
  public loading = signal(false);

  public handleDisaprove() {
    this.loading.set(true);
    this.adminLoansService
      .disaproveLoan(this.soli().id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toastr.info('Solicitação cancelada!');
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }

  public handleApprove() {
    this.loading.set(true);
    this.adminLoansService
      .approveLoan(this.soli().id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toastr.success('Livro emprestado com sucesso!');
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }
}
