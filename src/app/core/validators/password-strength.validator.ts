import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['minlength'] = { requiredLength: 8, actualLength: value.length };
    }

    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }

    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }

    if (!/[0-9]/.test(value)) {
      errors['number'] = true;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['symbol'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
