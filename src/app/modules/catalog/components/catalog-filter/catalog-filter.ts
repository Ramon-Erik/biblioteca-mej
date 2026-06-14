import { Component, signal, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogService } from '@modules/catalog/service/catalog.service';
import { map } from 'rxjs';
import { CustomSelectComponent } from '@shared/components/select/select';
import { AsyncPipe } from '@angular/common';
import { Category } from '@shared/interfaces/book.interface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-catalog-filter',
  imports: [CustomSelectComponent, FormsModule, AsyncPipe],
  templateUrl: './catalog-filter.html',
  styleUrl: './catalog-filter.scss',
})
export class CatalogFilter implements OnInit {
  private catalogService = inject(CatalogService);
  private destroyRef = inject(DestroyRef);
  public selectedCategory = '';

  public responsesText = signal('');

  public categories$ = this.catalogService.categoriesList.pipe(
    map((cats: Category[]) => cats.map((c) => ({ value: c.id, label: c.nome }))),
  );

  private formatResultsText(l: number) {
    if (l == 0) return 'Nenhum resultado.';
    if (l == 1) return 'Um resultado.';
    return l + ' resultados.';
  }

  public onFilterChange(categoriaId: string): void {
    this.catalogService.getCatalogList({ categoriaId, page: 0 }).subscribe();
  }

  ngOnInit() {
    this.catalogService.getCategoriesList().subscribe();
    this.catalogService.catalogLength
      .pipe(takeUntilDestroyed(this.destroyRef), map(this.formatResultsText))
      .subscribe((res) => this.responsesText.set(res));
  }
}
