import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDefault),
      multi: true,
    },
  ],
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputDefault implements ControlValueAccessor {
  public inputId = input.required<string>();
  public type = input.required<string>();
  public label = input.required<string>();
  public isRequired = input<boolean>(false);
  public placeholder = input<string>('');
  public minValue = input<string>();
  public maxValue = input<string>();

  public inputValue = '';

  // eslint-disable-next-line
  protected onToutched?: () => {};
  // eslint-disable-next-line
  protected onChange?: (value: string) => {};
  protected isDisabled = false;

  writeValue(obj: string): void {
    this.inputValue = obj;
  }
  // eslint-disable-next-line
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line
  registerOnTouched(fn: any): void {
    this.onToutched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
