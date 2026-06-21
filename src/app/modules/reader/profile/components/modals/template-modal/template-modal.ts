import { Component, inject, input, Signal } from '@angular/core';
import { currentBook } from '@modules/reader/profile/service/profile.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonDefault } from '@shared/components/button-default/button-default';

export interface modalInfo {
  title: string;
  text: string;
  btnText: string;
  func: () => void;
  loading: Signal<boolean>;
}

@Component({
  selector: 'app-template-modal',
  imports: [ButtonDefault],
  templateUrl: './template-modal.html',
  styleUrl: './template-modal.scss',
})
export class TemplateModal {
  public activeModal = inject(NgbActiveModal);

  public book = input.required<currentBook>();
  public modalInfo = input.required<modalInfo>();
}
