import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,

  imports: [ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  public inputId = input.required<string>();
  public label = input<string>();
  public placeholder = input('Selecione uma opção...');
  public options = input<SelectOption[]>([]);
  public isMultiple = input(true);
  public errorMessage = input('');
  public isInvalid = input(false);

  public value: string[] = [];
  public disabled = false;

  public get selectedValues(): string[] {
    return this.value;
  }

  onChange: (value: string[]) => void = () => {
    /* placeholder */
  };
  onTouched: () => void = () => {
    /* placeholder */
  };

  writeValue(value: string[] | null | undefined): void {
    this.value = value ?? [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public isOptionSelected(optionValue: string): boolean {
    return this.value.includes(optionValue);
  }

  public toggleOption(optionValue: string): void {
    if (this.disabled) return;

    if (this.isOptionSelected(optionValue)) {
      this.value = this.value.filter((val) => val !== optionValue);
    } else {
      this.value = [...this.value, optionValue];
    }

    this.onChange(this.value);
    this.onTouched();
  }
}
