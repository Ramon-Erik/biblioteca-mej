import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true,
    },
  ],
})
export class CustomTextareaComponent implements ControlValueAccessor {
  public inputId = input.required<string>();
  public label = input<string>();
  public isRequired = input(false);
  public placeholder = input('Digite aqui...');
  public rows = input<number>(3);
  public errorMessage = input('');
  public isInvalid = input(false);

  public value = '';
  public disabled = false;

  onChange: (value: string) => void = () => {
    /* angular placeholder */
  };
  onTouched: () => void = () => {
    /* angular placeholder */
  };

  writeValue(value: string | null | undefined): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTextareaChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
