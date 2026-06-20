import { Component, inject, input } from '@angular/core';
import { AdminLoanItem, AdminLoansService } from '../../service/admin-loan.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitation',
  imports: [DatePipe],
  templateUrl: './solicitation.html',
  styleUrl: './solicitation.scss',
})
export class Solicitation {
  private toastr = inject(ToastrService);
  private adminLoansService = inject(AdminLoansService);

  public soli = input.required<AdminLoanItem>();

  public handleApprove() {
    this.adminLoansService.approveLoan(this.soli().id).subscribe({
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
