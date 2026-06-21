import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, input, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';
import { CustomSelectComponent } from '@shared/components/select/select';
import { CustomTextareaComponent } from '@shared/components/textarea/textarea';
import { Book, Category, RawBook } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize, map } from 'rxjs';
import { ButtonDefault } from '@shared/components/button-default/button-default';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputDefault,
    CustomSelectComponent,
    CustomTextareaComponent,
    AsyncPipe,
    ButtonDefault,
  ],
  templateUrl: './edit-book.html',
})
export class EditBook implements OnInit {
  private toastr = inject(ToastrService);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  public book = input<Book>();
  public loading = signal(false);

  private readonly cloudinaryWebpRegex = /^https:\/\/res\.cloudinary\.com\/.*\.webp$/;
  public bookForm = this.fb.group({
    nomeObra: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],

    autor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    editora: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    volume: [0, [Validators.min(0)]],

    descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],

    categoriasIds: [[] as string[], [Validators.required, Validators.minLength(1)]],

    quantidade: [1, [Validators.required, Validators.min(1)]],

    fotoCapaUrl: ['', [Validators.required, Validators.pattern(this.cloudinaryWebpRegex)]],
  });

  public categories$ = this.catalogService.categoriesList.pipe(
    map((cats: Category[]) => cats.map((c) => ({ value: c.id, label: c.nome }))),
  );

  ngOnInit(): void {
    this.catalogService.getCategoriesList().subscribe(() => {
      const currentBook = this.book();

      if (currentBook && currentBook.volume) {
        const categoriasIds = currentBook.categorias.map((c) => c.id) ?? [];
        const vol = Number.parseInt(currentBook.volume[currentBook.volume.length - 1]);
        const volume = isNaN(vol) ? 0 : vol;

        this.bookForm.patchValue({
          nomeObra: currentBook.nomeObra,
          autor: currentBook.autor,
          editora: currentBook.editora,
          volume,
          descricao: currentBook.descricao,
          categoriasIds: categoriasIds,
          quantidade: currentBook.quantidade,
          fotoCapaUrl: currentBook.fotoCapaUrl,
        });
      }
    });
  }

  public updateBook(): void {
    if (this.bookForm.invalid) return;
    this.loading.set(true);

    const currentBook = this.bookForm.value;
    const payload: RawBook = {
      nomeObra: currentBook.nomeObra ?? '',
      autor: currentBook.autor ?? '',
      editora: currentBook.editora ?? '',
      volume: currentBook.volume ?? 0,
      descricao: currentBook.descricao ?? '',
      categoriasIds: currentBook.categoriasIds ?? [],
      quantidade: currentBook.quantidade ?? 0,
      fotoCapaUrl: currentBook.fotoCapaUrl ?? '',
    };

    const bookId = this.book()?.id ?? 'notFound';

    this.catalogService
      .updateBook(bookId, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.activeModal.close();
          this.toastr.success('Livro editado com sucesso!');
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
    console.log(32);
  }

  public getControl(controlName: string): FormControl {
    const control = this.bookForm.get(controlName);
    if (!control) {
      throw new Error(`Controle '${controlName}' não encontrado no formulário`);
    }
    return control as FormControl;
  }
}
