import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDefault } from '@shared/components/input/input';

@Component({
  selector: 'app-register-book',
  imports: [ReactiveFormsModule, InputDefault],
  templateUrl: './register-book.html',
  styleUrl: './register-book.scss',
})
export class RegisterBook {
  public activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  public bookForm = this.fb.group({
    nomeObra: ['', [Validators.required]],
    autor: ['', [Validators.required]],
    editora: [''],
    volume: [''],
    descricao: [''],
    categoriasIds: [[]],
    quantidade: [''],
    fotoCapaUrl: [''],
  });
}
