import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-loan-history',
  imports: [AsyncPipe, Pagination],
  templateUrl: './loan-history.html',
  styleUrl: './loan-history.scss',
})
export class LoanHistory implements OnInit {
  private profileService = inject(ProfileService);

  public loanHistory$ = this.profileService.myHistory;
  public pagination$ = this.profileService.historyPagination;

  public changePage(page: number) {
    this.profileService.goToHistoryPage(page).subscribe();
  }

  ngOnInit() {
    this.profileService.getMyHistory().subscribe();
  }
}
