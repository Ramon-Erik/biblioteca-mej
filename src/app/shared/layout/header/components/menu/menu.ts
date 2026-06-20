import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'app/core/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private authService = inject(AuthService);
  public isUserLogado$ = this.authService.isAuthenticated$;

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
    this.authService.logout();
  }
}
