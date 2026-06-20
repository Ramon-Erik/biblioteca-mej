import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { CatalogFilter } from './components/catalog-filter/catalog-filter';
import { MinButton } from './components/min-button/min-button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterBook } from './components/modal/register-book/register-book';
import { CatalogService } from './service/catalog.service';
import { AsyncPipe } from '@angular/common';
import { BookCard } from './components/book-card/book-card';
import { Pagination } from '@shared/components/pagination/pagination';
import { AuthService } from 'app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [AsyncPipe, PageTitle, CatalogFilter, MinButton, AsyncPipe, BookCard, Pagination],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private catalogService = inject(CatalogService);
  public books$ = this.catalogService.booksList;
  public paginationInfo = this.catalogService.pagination;
  public isAdmin$ = this.authService.isAdmin();

  private modalService = inject(NgbModal);

  public openRegisterModal() {
    this.modalService.open(RegisterBook, { centered: true, scrollable: true });
  }

  public openSolicitationsiew() {
    this.router.navigate(['/solicitacoes']);
  }

  public changePage(page: number) {
    this.catalogService.goToPage(page).subscribe();
  }

  ngOnInit() {
    this.catalogService.getCatalogList().subscribe();
  }
}
