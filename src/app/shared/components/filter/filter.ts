import { Component, input, output, signal, OnChanges } from '@angular/core';
import { CustomSelectComponent, SelectOption } from '@shared/components/select/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filter',
  imports: [CustomSelectComponent, FormsModule],
  templateUrl: './filter.html',
})
export class Filter implements OnChanges {
  public options = input.required<SelectOption[]>();
  public responseLength = input<number | null>(null);
  public optionSelected = output<string>();

  public selectedOption = '';
  public responsesText = signal('');

  private formatResultsText(l: number) {
    if (l == 0) return 'Nenhum resultado.';
    if (l == 1) return 'Um resultado.';
    return l + ' resultados.';
  }

  public onSelect() {
    this.optionSelected.emit(this.selectedOption);
  }

  ngOnChanges() {
    const length = this.responseLength();
    if (length) {
      this.responsesText.set(this.formatResultsText(length));
    }
  }
}
