import { Component, inject, input, signal } from '@angular/core';
import { currentBook, ProfileService } from '../../service/profile.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateModal } from '../modals/template-modal/template-modal';
import { ToastrService } from 'ngx-toastr';
import { BlurOnClick } from '@shared/directives/blur-on-click';
import { ButtonDefault } from '@shared/components/button-default/button-default';

@Component({
  selector: 'app-book-info',
  imports: [DatePipe, BlurOnClick, ButtonDefault],
  templateUrl: './book-info.html',
})
export class BookInfo {
  private modalService = inject(NgbModal);
  private toastr = inject(ToastrService);
  private profileService = inject(ProfileService);

  public book = input.required<currentBook>();
  public alt = signal('');
  public loading = signal(false);

  public renewLoan() {
    const modalInfo = signal({
      title: 'Renovar empréstimo',
      text: 'Você deseja adiar em 15 dias a renovação desse livro?',
      btnText: 'renovar',
      loading: this.loading,
      func: () => {
        this.profileService.renewMyLoan(this.book().id).subscribe({
          next: () => {
            this.toastr.success('Renovado!');
          },
          error: (error) => {
            const title = error.error.erro || 'Erro ao realizar operação';
            const msg = error.error.mensagem || 'Problemas com o servidor';
            this.toastr.error(msg, title, { timeOut: 5500 });
          },
          complete: () => {
            this.modalService.dismissAll();
          },
        });
      },
    });

    const modalRef = this.modalService.open(TemplateModal, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });
    modalRef.componentInstance.book = this.book;
    modalRef.componentInstance.modalInfo = modalInfo;
  }

  public returnBorrowedBook() {
    const modalInfo = signal({
      title: 'Devolver livro',
      text: 'Você deseja devolver esse livro?',
      btnText: 'devolver',
      loading: this.loading,
      func: () => {
        this.profileService.returnMyBorrowedBook(this.book().id).subscribe({
          next: () => {
            this.toastr.success('Devolvido!');
          },
          error: (error) => {
            const title = error.error.erro || 'Erro ao realizar operação';
            const msg = error.error.mensagem || 'Problemas com o servidor';
            this.toastr.error(msg, title, { timeOut: 5500 });
          },
          complete: () => {
            this.modalService.dismissAll();
          },
        });
      },
    });

    const modalRef = this.modalService.open(TemplateModal, {
      centered: true,
      modalDialogClass: 'sub-modal',
    });
    modalRef.componentInstance.book = this.book;
    modalRef.componentInstance.modalInfo = modalInfo;
  }
}
