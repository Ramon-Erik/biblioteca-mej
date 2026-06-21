import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';
import { CustomSelectComponent, SelectOption } from '@shared/components/select/select';
import { Category, RawBook } from '@shared/interfaces/book.interface';
import { finalize, map } from 'rxjs';
import { RegisterCategory } from '../register-category/register-category';
import { BlurOnClick } from '@shared/directives/blur-on-click';
import { DeleteCategory } from '../delete-category/delete-category';
import { CustomTextareaComponent } from '@shared/components/textarea/textarea';
import { ToastrService } from 'ngx-toastr';
import { ButtonDefault } from '@shared/components/button-default/button-default';

@Component({
  selector: 'app-register-book',
  imports: [
    ReactiveFormsModule,
    InputDefault,
    CustomSelectComponent,
    AsyncPipe,
    BlurOnClick,
    CustomTextareaComponent,
    ButtonDefault,
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

  public loading = signal(false);

  private readonly cloudinaryWebpRegex = /^https:\/\/res\.cloudinary\.com\/.*\.webp$/;
  public bookForm = this.fb.group({
    nomeObra: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],

    autor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    editora: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    volume: [null],

    descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],

    categoriasIds: [[] as string[], [Validators.required, Validators.minLength(1)]],

    quantidade: [1, [Validators.required, Validators.min(1)]],

    fotoCapaUrl: ['', [Validators.required, Validators.pattern(this.cloudinaryWebpRegex)]],
  });

  public isFieldInvalid(field: string): boolean {
    const control = this.bookForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public createBook() {
    if (this.bookForm.invalid) return;

    this.loading.set(true);

    const bookForm = this.bookForm.value;

    const rawBook: RawBook = {
      nomeObra: bookForm.nomeObra ?? '',
      autor: bookForm.autor ?? '',
      categoriasIds: bookForm.categoriasIds ?? [],
      descricao: bookForm.descricao ?? '',
      editora: bookForm.editora ?? '',
      fotoCapaUrl: bookForm.fotoCapaUrl ?? '',
      quantidade: bookForm.quantidade ?? 0,
      volume: bookForm.volume && bookForm.volume > 0 ? bookForm.volume : null,
    };
    this.catalogService
      .createBook(rawBook)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
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

          const remainingValues = currentValues.filter((c) => !deletedIds.includes(c));

          categoriesControl.setValue(remainingValues);
          categoriesControl.markAsTouched();
        }
      },
      () => {
        /* angular placeholder */
      },
    );
  }

  public getControl(controlName: string): FormControl {
    const control = this.bookForm.get(controlName);
    if (!control) {
      throw new Error(`Controle '${controlName}' não encontrado no formulário`);
    }
    return control as FormControl;
  }

  ngOnInit() {
    this.catalogService.getCategoriesList().subscribe();
  }
}
