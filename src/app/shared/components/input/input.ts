import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

type ErrorKey = 'required' | 'email' | 'minlength' | 'maxlength' | 'pattern' | 'min' | 'max';

const DEFAULT_ERROR_MESSAGES: Record<ErrorKey, string> = {
  required: 'Campo obrigatório',
  email: 'Email em formato inválido',
  minlength: 'Valor muito curto',
  maxlength: 'Valor muito longo',
  pattern: 'Formato inválido',
  min: 'Valor muito baixo',
  max: 'Valor muito alto',
};

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputDefault {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() control: FormControl = new FormControl('');
  @Input() errorMessages: Partial<Record<ErrorKey, string>> = {};
  @Input() underLink = '';
  @Input() inputId = '';

  @Output() underLinkClicked = new EventEmitter();

  getErrorKeys(): ErrorKey[] {
    return (this.control.errors ? Object.keys(this.control.errors) : []) as ErrorKey[];
  }

  getErrorMessage(error: string): string {
    const errorKey = error as ErrorKey;
    return this.errorMessages[errorKey] || DEFAULT_ERROR_MESSAGES[errorKey] || 'Campo inválido';
  }

  get isRequired(): boolean {
    if (!this.control) return false;
    const hasRequiredValidator = this.control.hasValidator(Validators.required);

    return hasRequiredValidator;
  }

  onUnderLink(): void {
    this.underLinkClicked.emit();
  }
}
