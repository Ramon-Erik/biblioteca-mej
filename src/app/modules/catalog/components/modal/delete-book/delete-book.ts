import { Component, inject, input } from '@angular/core';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '@shared/interfaces/book.interface';

@Component({
  selector: 'app-delete-book',
  imports: [],
  templateUrl: './delete-book.html',
  styleUrl: './delete-book.scss',
})
export class DeleteBook {
  public activeModal = inject(NgbActiveModal);
  private catalogService = inject(CatalogService);

  public book = input<Book>();

  public confirmDelete(): void {
    const bookC = this.book();
    if (!bookC) return;
    this.catalogService.deleteBook(bookC.id).subscribe();
  }
}
