import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./modules/reader/home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: 'catalogo-de-livros',
    pathMatch: 'full',
    loadComponent: () => import('./modules/reader/catalog/catalog').then((m) => m.Catalog),
  },
  {
    path: 'admin/catalogo-de-livros',
    pathMatch: 'full',
    loadComponent: () => import('./modules/admin/catalog/catalog').then((m) => m.Catalog),
  },
];
