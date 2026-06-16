import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomSelectComponent, SelectOption } from '@shared/components/select/select';
import { ApiHttpErrorResponse } from '@shared/interfaces/api-error.interface';
import { Category } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [ReactiveFormsModule, CustomSelectComponent, AsyncPipe],
  templateUrl: './delete-category.html',
})
export class DeleteCategory {
  private toastr = inject(ToastrService);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    categoriasIds: [[] as string[], [Validators.required]],
  });

  private formatOptions(cat: Category[]): SelectOption[] {
    return cat.map((c) => ({ value: c.id, label: c.nome }));
  }

  public categories$ = this.catalogService.categoriesList.pipe(map(this.formatOptions));

  public isFieldInvalid(): boolean {
    const control = this.form.get('categoriasIds');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public confirmDelete(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const idsParaDeletar = this.form.value.categoriasIds as string[];

    this.catalogService.deleteCategories(idsParaDeletar).subscribe({
      next: () => {
        this.activeModal.close(idsParaDeletar);
        this.toastr.success('categoria apagada com sucesso');
      },
      error: (error: ApiHttpErrorResponse) => {
        const title = error.error.erro || 'Erro ao realizar operação';
        const msg = error.error.mensagem || 'Problemas com o servidor';
        this.toastr.error(msg, title, { timeOut: 5500 });
      },
    });
  }
}
