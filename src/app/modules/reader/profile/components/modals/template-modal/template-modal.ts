import { Component, inject, input } from '@angular/core';
import { currentBook } from '@modules/reader/profile/service/profile.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface modalInfo {
  title: string;
  text: string;
  btnText: string;
  func: () => void;
}

@Component({
  selector: 'app-template-modal',
  imports: [],
  templateUrl: './template-modal.html',
  styleUrl: './template-modal.scss',
})
export class TemplateModal {
  public activeModal = inject(NgbActiveModal);

  public book = input.required<currentBook>();
  public modalInfo = input.required<modalInfo>();

  public confirm(): void {
    console.log(43);
  }
}
