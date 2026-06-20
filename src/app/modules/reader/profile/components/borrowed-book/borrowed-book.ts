import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-borrowed-book',
  imports: [AsyncPipe],
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
