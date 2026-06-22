import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpErrorResponse } from '@shared/interfaces/api-error.interface';
import { Book } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ButtonDefault } from '@shared/components/button-default/button-default';
import { CustomTextareaComponent } from '@shared/components/textarea/textarea';

@Component({
  selector: 'app-hide-book',
  imports: [ReactiveFormsModule, ButtonDefault, CustomTextareaComponent],
  templateUrl: './hide-book.html',
  styleUrl: './hide-book.scss',
})
export class HideBook {
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  public loading = signal(false);

  public book = input.required<Book>();

  public hideForm = this.fb.group({
    motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
  });

  public confirmHiding(): void {
    const { motivo } = this.hideForm.value;
    if (!motivo) return;

    this.loading.set(true);
    this.catalogService
      .hideBook(this.book().id, motivo)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
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
