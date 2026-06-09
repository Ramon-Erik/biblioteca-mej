import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
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

  public bookForm = new FormGroup({
    nomeObra: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    editora: new FormControl(''),
    volume: new FormControl(''),
    descricao: new FormControl(''),
    categoriasIds: new FormControl([]),
    quantidade: new FormControl(''),
    fotoCapaUrl: new FormControl(''),
  });
}
