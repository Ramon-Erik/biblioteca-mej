import { Component } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { BorrowedBook } from './components/borrowed-book/borrowed-book';
import { LoanHistory } from './components/loan-history/loan-history';

@Component({
  selector: 'app-profile',
  imports: [PageTitle, BorrowedBook, LoanHistory],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
