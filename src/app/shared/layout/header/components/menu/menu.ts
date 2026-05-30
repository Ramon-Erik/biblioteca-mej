import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
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
}
