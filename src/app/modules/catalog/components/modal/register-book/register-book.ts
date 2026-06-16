import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';
import { CustomSelectComponent, SelectOption } from '@shared/components/select/select';
import { Category, RawBook } from '@shared/interfaces/book.interface';
import { map } from 'rxjs';
import { RegisterCategory } from '../register-category/register-category';
import { BlurOnClick } from '@shared/directives/blur-on-click';
import { DeleteCategory } from '../delete-category/delete-category';
import { CustomTextareaComponent } from '@shared/components/textarea/textarea';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-book',
  imports: [
    ReactiveFormsModule,
    InputDefault,
    CustomSelectComponent,
    AsyncPipe,
    BlurOnClick,
    CustomTextareaComponent,
  ],
  templateUrl: './register-book.html',
  styleUrl: './register-book.scss',
})
export class RegisterBook implements OnInit {
  private toastr = inject(ToastrService);
  private modalService = inject(NgbModal);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  public bookForm = this.fb.group({
    nomeObra: ['', [Validators.required]],
    autor: ['', [Validators.required]],
    editora: ['', [Validators.required]],
    volume: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    categoriasIds: [[] as string[]],
    quantidade: [1, [Validators.required]],
    fotoCapaUrl: ['', [Validators.required]],
  });

  public isFieldInvalid(field: string): boolean {
    const control = this.bookForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public createBook() {
    if (this.bookForm.invalid) return;

    const bookForm = this.bookForm.value;

    const rawBook: RawBook = {
      nomeObra: bookForm.nomeObra ?? '',
      autor: bookForm.autor ?? '',
      categoriasIds: bookForm.categoriasIds ?? [],
      descricao: bookForm.descricao ?? '',
      editora: bookForm.editora ?? '',
      fotoCapaUrl: bookForm.fotoCapaUrl ?? '',
      quantidade: bookForm.quantidade ?? 0,
      volume: bookForm.volume ?? '',
    };
    this.catalogService.createBook(rawBook).subscribe({
      next: () => {
        this.activeModal.close();
        this.toastr.success('Livro cadastrado com sucesso!');
      },
      error: (error) => {
        const title = error.error.erro || 'Erro ao realizar operação';
        const msg = error.error.mensagem || 'Problemas com o servidor';
        this.toastr.error(msg, title, { timeOut: 5500 });
      },
    });
  }

  private formatOptions(cat: Category[]): SelectOption[] {
    return cat.map((c) => ({ value: c.id, label: c.nome }));
  }

  public categories$ = this.catalogService.categoriesList.pipe(map(this.formatOptions));

  public openNewCategoryModal() {
    const modalRef = this.modalService.open(RegisterCategory, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });
    modalRef.result.then(
      (c) => {
        if (!c || !c.category || !c.mark) return;
        const categoriesControl = this.bookForm.get('categoriasIds');

        if (categoriesControl && c.mark) {
          const values = categoriesControl.value ?? [];
          categoriesControl.setValue([...values, c.category]);
          categoriesControl.markAllAsTouched();
        }
      },
      () => {
        /* angular placeholder*/
      },
    );
  }

  public openDeleteCategoryModal() {
    const modalRef = this.modalService.open(DeleteCategory, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });

    modalRef.result.then(
      (deletedIds: string[] | undefined) => {
        if (!deletedIds || deletedIds.length === 0) return;

        const categoriesControl = this.bookForm.get('categoriasIds');
        if (categoriesControl) {
          const currentValues = categoriesControl.value ?? [];

          // Filtra o formulário mantendo apenas os IDs que NÃO foram excluídos
          const remainingValues = currentValues.filter((c) => !deletedIds.includes(c));

          // Atualiza o formulário do livro de forma limpa e reativa
          categoriesControl.setValue(remainingValues);
          categoriesControl.markAsTouched();
        }
      },
      () => {
        /* angular placeholder */
      },
    );
  }

  ngOnInit() {
    this.catalogService.getCategoriesList().subscribe();
  }
}
