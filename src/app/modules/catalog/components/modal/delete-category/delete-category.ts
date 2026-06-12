import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomSelectComponent, SelectOption } from '@shared/components/select/select';
import { Category } from '@shared/interfaces/book.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [ReactiveFormsModule, CustomSelectComponent, AsyncPipe],
  templateUrl: './delete-category.html',
})
export class DeleteCategory {
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    categoriasIds: [[] as string[], [Validators.required]],
  });

  private formatOptions(cat: Category[]): SelectOption[] {
    return cat.map((c) => ({ value: c.id, label: c.nome }));
  }

  // Consome a mesma lista do pai reativamente
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

    // Dispara a exclusão no servidor
    this.catalogService.deleteCategories(idsParaDeletar).subscribe({
      next: () => {
        // Fecha o modal devolvendo a lista de IDs que foram apagados com sucesso
        this.activeModal.close(idsParaDeletar);
      },
      error: (err) => {
        console.error('Erro ao apagar categorias:', err);
      },
    });
  }
}
