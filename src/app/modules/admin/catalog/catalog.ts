import { Component, inject } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { CatalogFilter } from '@shared/components/catalog-filter/catalog-filter';
import { RegisterBook } from './components/modal/register-book/register-book';
import { MinButton } from './components/min-button/min-button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalog',
  imports: [PageTitle, CatalogFilter, MinButton],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private modalService = inject(NgbModal);
  public openRegisterModal() {
    this.modalService.open(RegisterBook, { centered: true });
  }
}
