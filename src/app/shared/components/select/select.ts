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
  public isRequired = input<boolean>(false);
  public placeholder = input('Selecione uma opção...');
  public options = input<SelectOption[]>([]);
  public isMultiple = input(true);
  public errorMessage = input('');
  public isInvalid = input(false);

  public value: string | string[] = [];
  public disabled = false;

  public get selectedValues(): string[] {
    if (!this.value) return [];
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  public get buttonLabel(): string {
    const selected = this.selectedValues;

    if (selected.length === 0) {
      return this.placeholder();
    }

    if (!this.isMultiple()) {
      const foundOption = this.options().find((opt) => opt.value === selected[0]);
      return foundOption ? foundOption.label : this.placeholder();
    }

    return `${selected.length} selecionada(s)`;
  }

  onChange: (value: string | string[]) => void = (_value: string | string[]) => {
    /* angular placeholder */
  };

  onTouched: () => void = () => {
    /* angular placeholder */
  };

  writeValue(value: string | string[] | null | undefined): void {
    if (value === null || value === undefined) {
      this.value = this.isMultiple() ? [] : '';
    } else {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public isOptionSelected(optionValue: string): boolean {
    return this.selectedValues.includes(optionValue);
  }

  public toggleOption(optionValue: string): void {
    if (this.disabled) return;

    if (this.isMultiple()) {
      const currentValues = Array.isArray(this.value) ? this.value : [];

      if (currentValues.includes(optionValue)) {
        this.value = currentValues.filter((val) => val !== optionValue);
      } else {
        this.value = [...currentValues, optionValue];
      }

      this.onChange(this.value);
      this.onTouched();
    } else {
      if (optionValue === this.value) {
        this.value = '';
        this.onChange(this.value);
        this.onTouched();
      } else {
        this.value = optionValue;
        this.onChange(this.value);
        this.onTouched();
      }
    }
  }
}
