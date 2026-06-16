import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';
import { CustomSelectComponent } from '@shared/components/select/select';
import { CustomTextareaComponent } from '@shared/components/textarea/textarea';
import { Book, Category, RawBook } from '@shared/interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputDefault,
    CustomSelectComponent,
    CustomTextareaComponent,
    AsyncPipe,
  ],
  templateUrl: './edit-book.html',
})
export class EditBook implements OnInit {
  private toastr = inject(ToastrService);
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  public book = input<Book>();

  public bookForm = this.fb.group({
    id: [''],
    nomeObra: [''],
    autor: [''],
    editora: [''],
    volume: [''],
    descricao: [''],
    categoriasIds: [[] as string[]],
    quantidade: [0],
    fotoCapaUrl: [''],
  });

  public categories$ = this.catalogService.categoriesList.pipe(
    map((cats: Category[]) => cats.map((c) => ({ value: c.id, label: c.nome }))),
  );

  ngOnInit(): void {
    this.catalogService.getCategoriesList().subscribe(() => {
      const currentBook = this.book();
      console.log('livro recebido', this.book());

      if (currentBook) {
        const categoriasIds = currentBook.categorias.map((c) => c.id) ?? [];
        this.bookForm.patchValue({
          nomeObra: currentBook.nomeObra,
          autor: currentBook.autor,
          editora: currentBook.editora,
          volume: currentBook.volume,
          descricao: currentBook.descricao,
          categoriasIds: categoriasIds,
          quantidade: currentBook.quantidade,
          fotoCapaUrl: currentBook.fotoCapaUrl,
        });
      }
    });
  }

  public updateBook(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const currentBook = this.bookForm.value;
    const payload: RawBook = {
      nomeObra: currentBook.nomeObra ?? '',
      autor: currentBook.autor ?? '',
      editora: currentBook.editora ?? '',
      volume: currentBook.volume ?? null,
      descricao: currentBook.descricao ?? '',
      categoriasIds: currentBook.categoriasIds ?? [],
      quantidade: currentBook.quantidade ?? 0,
      fotoCapaUrl: currentBook.fotoCapaUrl ?? '',
    };

    const bookId = this.book()?.id ?? 'notFound';

    this.catalogService.updateBook(bookId, payload).subscribe({
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
  }
}
