import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-book',
  imports: [],
  templateUrl: './register-book.html',
  styleUrl: './register-book.scss',
})
export class RegisterBook {
  public activeModal = inject(NgbActiveModal);
}
