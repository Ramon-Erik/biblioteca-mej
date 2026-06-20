import { NgClass } from '@angular/common';
import { Component, inject, input, OnChanges, signal } from '@angular/core';
import { Book } from '@shared/interfaces/book.interface';
import { MinButton } from '../min-button/min-button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBook } from '../modal/delete-book/delete-book';
import { EditBook } from '../modal/edit-book/edit-book';
import { AuthService } from 'app/core/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { BorrowBook } from '../modal/borrow-book/borrow-book';

@Component({
  selector: 'app-book-card',
  imports: [NgClass, MinButton, AsyncPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard implements OnChanges {
  private authService = inject(AuthService);
  public isAdmin$ = this.authService.isAdmin();
  private modalService = inject(NgbModal);
  public book = input.required<Book>();
  public alt = signal('');
  public isAvalible = signal(false);

  public openBorrowBookModal() {
    const modal = this.modalService.open(BorrowBook, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });
    modal.componentInstance.book = this.book;
  }

  public openDeleteBook() {
    const modal = this.modalService.open(DeleteBook, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });
    modal.componentInstance.book = this.book;
  }
  public openEditBookModal() {
    const modalRef = this.modalService.open(EditBook, {
      centered: true,
    });

    modalRef.componentInstance.book = this.book;
  }

  ngOnChanges() {
    this.alt.set(`Capa de ${this.book().nomeObra}`);
  }
}
