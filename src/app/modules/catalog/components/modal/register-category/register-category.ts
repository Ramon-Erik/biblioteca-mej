import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';

@Component({
  selector: 'app-register-category',
  imports: [ReactiveFormsModule, InputDefault],
  templateUrl: './register-category.html',
  styleUrl: './register-category.scss',
})
export class RegisterCategory {
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
      this.catalogService
        .createCategory(params.name)
        .subscribe((c) => this.activeModal.close({ category: c, mark: params.mark }));
    }
  }
}
