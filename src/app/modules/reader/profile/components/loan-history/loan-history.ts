import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loan-history',
  imports: [AsyncPipe],
  templateUrl: './loan-history.html',
  styleUrl: './loan-history.scss',
})
export class LoanHistory implements OnInit {
  private profileService = inject(ProfileService);

  public loanHistory$ = this.profileService.myHistory;

  ngOnInit() {
    this.profileService.getMyHistory().subscribe();
  }
}
