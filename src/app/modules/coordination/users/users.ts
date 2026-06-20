import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '@shared/components/page-title/page-title';
import { Filter } from '@shared/components/filter/filter';
import { UserFilters, UsersService } from './service/users.service';
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
    { value: 'role:ADMIN', label: 'Administradores' },
    { value: 'role:LEITOR', label: 'Leitores' },

    { value: 'ativo:true', label: 'Usuários Ativos' },
    { value: 'ativo:false', label: 'Usuários Suspensos' },

    { value: 'loginBloqueado:true', label: 'Acessos Bloqueados' },
    { value: 'loginBloqueado:false', label: 'Acessos Liberados' },
  ];

  public filterList(selectedFilter: string) {
    const filter: UserFilters = {
      page: 0,
      size: 6,
    };

    if (selectedFilter) {
      const [key, value] = selectedFilter.split(':');

      if (key === 'role') {
        filter.role = value;
      } else if (key === 'ativo') {
        filter.ativo = value === 'true';
      } else if (key === 'loginBloqueado') {
        filter.loginBloqueado = value === 'true';
      }
    }

    console.log(filter);

    this.usersService.getUsersList(filter).subscribe();
  }

  public changePage(page: number) {
    this.usersService.goToPage(page).subscribe();
  }

  ngOnInit() {
    this.usersService.getUsersList().subscribe();
  }
}
