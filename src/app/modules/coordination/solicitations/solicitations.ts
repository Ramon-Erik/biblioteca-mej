import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AdminLoansService } from './service/admin-loan.service';
import { PageTitle } from '@shared/components/page-title/page-title';
import { Solicitation } from './components/solicitation/solicitation';

@Component({
  selector: 'app-solicitations',
  standalone: true,
  imports: [CommonModule, PageTitle, AsyncPipe, Solicitation],
  templateUrl: './solicitations.html',
  styleUrls: ['./solicitations.scss'],
})
export class Solicitations implements OnInit {
  private adminLoansService = inject(AdminLoansService);

  public solicitations$ = this.adminLoansService.requestsList;

  public ngOnInit() {
    this.adminLoansService.getRequestsList().subscribe();
  }
}
