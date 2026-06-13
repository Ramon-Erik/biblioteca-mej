import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { CatalogFilter } from './components/catalog-filter/catalog-filter';
import { MinButton } from './components/min-button/min-button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterBook } from './components/modal/register-book/register-book';
import { CatalogService } from './service/catalog.service';
import { AsyncPipe } from '@angular/common';
import { BookCard } from './components/book-card/book-card';

@Component({
  selector: 'app-catalog',
  imports: [PageTitle, CatalogFilter, MinButton, AsyncPipe, BookCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private catalogService = inject(CatalogService);
  public books$ = this.catalogService.booksList;

  private modalService = inject(NgbModal);
  public openRegisterModal() {
    this.modalService.open(RegisterBook, { centered: true, scrollable: true });
  }

  ngOnInit() {
    this.catalogService.updateCatalogList().subscribe();
  }
}
