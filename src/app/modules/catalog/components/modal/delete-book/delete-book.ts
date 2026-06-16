import { Component, inject, input } from '@angular/core';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpErrorResponse } from '@shared/interfaces/api-error.interface';
import { Book } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-book',
  imports: [],
  templateUrl: './delete-book.html',
  styleUrl: './delete-book.scss',
})
export class DeleteBook {
  private toastr = inject(ToastrService);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);

  public book = input<Book>();

  public confirmDelete(): void {
    const bookC = this.book();
    if (!bookC) return;
    this.catalogService.deleteBook(bookC.id).subscribe({
      next: () => {
        this.activeModal.close();
        this.toastr.success('Livro apagado com sucessso!');
      },
      error: (error: ApiHttpErrorResponse) => {
        const title = error.error.erro || 'Erro ao realizar operação';
        const msg = error.error.mensagem || 'Problemas com o servidor';
        this.toastr.error(msg, title, { timeOut: 5500 });
      },
    });
  }
}
