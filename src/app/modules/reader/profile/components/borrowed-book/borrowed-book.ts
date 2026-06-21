import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';
import { BookInfo } from '../book-info/book-info';

@Component({
  selector: 'app-borrowed-book',
  imports: [AsyncPipe, BookInfo],
  templateUrl: './borrowed-book.html',
  styleUrl: './borrowed-book.scss',
})
export class BorrowedBook implements OnInit {
  private profileService = inject(ProfileService);

  public currentBook$ = this.profileService.currentBook;

  ngOnInit() {
    this.profileService.getMyCurrentBook().subscribe();
  }
}
