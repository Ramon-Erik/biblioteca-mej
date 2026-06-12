import { Component, signal, OnChanges, input } from '@angular/core';
@Component({
  selector: 'app-catalog-filter',
  imports: [],
  templateUrl: './catalog-filter.html',
  styleUrl: './catalog-filter.scss',
})
export class CatalogFilter implements OnChanges {
  public responsesText = signal('');
  protected len = input.required<number>();

  private formatResultsText(l: number) {
    if (l == 0) return 'Nenhum resultado.';
    if (l == 1) return 'Um resultado.';
    return l + ' resultados.';
  }

  ngOnChanges() {
    this.responsesText.set(this.formatResultsText(this.len()));
  }
}
