import { Component, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDefault),
      multi: true,
    },
  ],
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputDefault {
  public id = input.required<string>();
  public type = input.required<string>();
  public label = input.required<string>();
  public isRequired = input<boolean>(false);
  public placeholder = input<string>('');
  public minValue = input<string>();
  public maxValue = input<string>();
  public underLink = input<string>('');

  public control = input.required<FormControl>();

  @Output() underLinkClicked = new EventEmitter();

  onKeyDown(event: KeyboardEvent) {
    if (this.type() === 'number') {
      if (event.key === '-' || event.key === 'e' || event.key === 'E') {
        event.preventDefault();
      }
    }
  }

  onInput() {
    if (this.type() === 'number') {
      const control = this.control();
      let value = control.value;

      if (typeof value === 'string') {
        value = value.replace(/-/g, '');
        if (value !== control.value) {
          control.setValue(value, { emitEvent: false });
        }
      }
    }
  }

  getErrorKeys(): ErrorKey[] {
    const control = this.control();
    const errors = control.errors ? Object.keys(control.errors) : [];

    if (errors.length === 0) return [];

    const priorityOrder: ErrorKey[] = [
      'email',
      'minlength',
      'maxlength',
      'min',
      'max',
      'pattern',
      'required',
    ];

    const sortedErrors = errors.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a as ErrorKey);
      const bIndex = priorityOrder.indexOf(b as ErrorKey);

      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });

    return [sortedErrors[0]] as ErrorKey[];
  }

  getErrorMessage(error: string): string {
    const errorKey = error as ErrorKey;
    const control = this.control();

    if (errorKey === 'minlength' && control.errors?.['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Valor muito curto. Mínimo: ${requiredLength} caracteres`;
    }

    if (errorKey === 'maxlength' && control.errors?.['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `Valor muito longo. Máximo: ${requiredLength} caracteres`;
    }

    if (errorKey === 'min' && control.errors?.['min']) {
      const min = control.errors['min'].min;
      return `Valor muito baixo. Mínimo: ${min}`;
    }

    if (errorKey === 'max' && control.errors?.['max']) {
      const max = control.errors['max'].max;
      return `Valor muito alto. Máximo: ${max}`;
    }

    return DEFAULT_ERROR_MESSAGES[errorKey] || 'Campo inválido';
  }

  onUnderLink(): void {
    this.underLinkClicked.emit();
  }
}
