import { Component, signal, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-catalog-filter',
  imports: [],
  templateUrl: './catalog-filter.html',
  styleUrl: './catalog-filter.scss',
})
export class CatalogFilter implements OnInit {
  private catalogService = inject(CatalogService);
  private destroyRef = inject(DestroyRef);
  public responsesText = signal('');

  private formatResultsText(l: number) {
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
