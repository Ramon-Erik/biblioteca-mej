import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { Filter } from '@shared/components/filter/filter';
import { UsersService } from './service/users.service';
import { AsyncPipe } from '@angular/common';
import { UserCard } from './components/user-card/user-card';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-users',
  imports: [PageTitle, Filter, AsyncPipe, UserCard, Pagination],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private usersService = inject(UsersService);

  public usersList$ = this.usersService.usersList;
  public paginationInfo = this.usersService.pagination;

  public responsesLength$ = this.usersService.usersListLength;
  public filters = [
    {
      value: 'ADMIN',
      label: 'Administrador',
    },
    {
      value: 'LEITOR',
      label: 'Leitor',
    },
  ];

  public filterList(filter: string) {
    console.log(filter);
  }

  public changePage(page: number) {
    this.usersService.goToPage(page).subscribe();
  }

  ngOnInit() {
    this.usersService.getUsersList().subscribe();
  }
}
