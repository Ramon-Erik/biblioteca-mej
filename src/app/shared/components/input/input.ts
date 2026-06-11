import { Component, EventEmitter, input, Output } from '@angular/core';
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

  getErrorKeys(): ErrorKey[] {
    const control = this.control();
    return (control.errors ? Object.keys(control.errors) : []) as ErrorKey[];
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