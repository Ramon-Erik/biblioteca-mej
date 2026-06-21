import { Component, inject, input, signal } from '@angular/core';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-borrow-book',
  imports: [ButtonDefault],
  templateUrl: './borrow-book.html',
  styleUrl: './borrow-book.scss',
})
export class BorrowBook {
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private toastr = inject(ToastrService);

  public book = input.required<Book>();
  public loading = signal(false);

  public confirm(): void {
    this.loading.set(true);
    this.catalogService
      .borrowBook(this.book().id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.activeModal.close({ confirmado: true });
          this.toastr.success('Pedido feito', 'Verifique no seu perfil!');
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }
}
