import { Component } from '@angular/core';
import { PageTitle } from '../../../shared/components/page-title/page-title';
import { CatalogFilter } from '../../../shared/components/catalog-filter/catalog-filter';

@Component({
  selector: 'app-catalog',
  imports: [PageTitle, CatalogFilter],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {}
