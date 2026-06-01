import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { CatalogFilter } from '../../../shared/components/catalog-filter/catalog-filter';
import { ReaderCatalog } from './service/reader-catalog';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [PageTitle, CatalogFilter, AsyncPipe],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private catalogService = inject(ReaderCatalog);
  public books$ = this.catalogService.booksCatalog;

  ngOnInit() {
    this.catalogService.updateCatalogList().subscribe();
  }
}
