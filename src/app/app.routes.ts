import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // loadComponent: () => import('./modules/leitor/home/home').then((m) => m.Home),
    redirectTo: '/catalog',
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '/catalog',
  },
  {
    path: 'catalogo-de-livros',
    pathMatch: 'full',
    loadComponent: () => import('./modules/leitor/catalog/catalog').then((m) => m.Catalog),
  },
];
