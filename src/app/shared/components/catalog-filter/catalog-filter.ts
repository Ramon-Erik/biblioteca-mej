import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { ReaderCatalog } from '../../../modules/leitor/catalog/service/reader-catalog';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalog-filter',
  imports: [],
  templateUrl: './catalog-filter.html',
  styleUrl: './catalog-filter.scss',
})
export class CatalogFilter implements OnInit {
  private catalogService = inject(ReaderCatalog);
  private destroyRef = inject(DestroyRef);
  public responsesText = signal('');

  private formatResultsText(l: number) {
    console.log(l, 'aa');

    if (l == 0) return 'Nenhum resultado.';
    if (l == 1) return 'Um resultado.';
    return l + ' resultados.';
  }

  ngOnInit() {
    this.catalogService.catalogLength
      .pipe(takeUntilDestroyed(this.destroyRef), map(this.formatResultsText))
      .subscribe((res) => this.responsesText.set(res));
  }
}
