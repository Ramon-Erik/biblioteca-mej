import { Component } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { InputDefault } from '../../../shared/components/input/input';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonDefault } from '../../../shared/components/button-default/button-default';

@Component({
  selector: 'app-login',
  imports: [PageTitle, InputDefault, ReactiveFormsModule, ButtonDefault],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailControl(): FormControl {
    return this.loginForm.controls.email;
  }

  get passwordControl(): FormControl {
    return this.loginForm.controls.password;
  }
}
