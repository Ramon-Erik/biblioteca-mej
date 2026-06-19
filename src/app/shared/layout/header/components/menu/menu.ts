import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '@modules/guest/login/service/login-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private loginService = inject(LoginService);
  public isUserLogado$ = this.loginService.isAuthenticated$;

  public navLinks = [
    {
      icon: 'bi-person-fill',
      path: '/perfil',
    },
    {
      icon: 'bi-house-door-fill',
      path: '/home',
    },
    {
      icon: 'bi-book-fill',
      path: '/catalogo-de-livros',
    },
  ];

  public logout(): void {
    this.loginService.logout();
  }
}
