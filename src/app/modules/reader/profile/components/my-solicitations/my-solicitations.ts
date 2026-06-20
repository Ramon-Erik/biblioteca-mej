import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-solicitations',
  imports: [AsyncPipe],
  templateUrl: './my-solicitations.html',
  styleUrl: './my-solicitations.scss',
})
export class MySolicitations implements OnInit {
  private profileService = inject(ProfileService);

  public solicitations$ = this.profileService.myRequests;

  ngOnInit() {
    this.profileService.getMyRequests().subscribe();
  }
}
