import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';
import { ApiHttpErrorResponse } from '@shared/interfaces/api-error.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-category',
  imports: [ReactiveFormsModule, InputDefault],
  templateUrl: './register-category.html',
  styleUrl: './register-category.scss',
})
export class RegisterCategory {
  private toastr = inject(ToastrService);
  private catalogService = inject(CatalogService);
  public activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nome: ['', Validators.required],
    markOnSave: [true],
  });

  public saveCategory() {
    if (this.form.valid) {
      const params = {
        name: this.form.value.nome ?? '',
        mark: this.form.value.markOnSave ?? false,
      };
      this.catalogService.createCategory(params.name).subscribe({
        next: (c) => {
          const newCategoryId = c.filter((cat) => cat.nome === params.name).map((cat) => cat.id);

          this.activeModal.close({
            category: newCategoryId[0],
            mark: params.mark,
          });

          this.toastr.success('Categoria criada com sucesso!');
        },
        error: (error: ApiHttpErrorResponse) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
    }
  }
}
