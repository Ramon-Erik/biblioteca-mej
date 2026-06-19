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
    loadComponent: () => import('./modules/catalog/catalog').then((m) => m.Catalog),
  },
  {
    path: 'usuarios',
    pathMatch: 'full',
    loadComponent: () => import('./modules/coordination/users/users').then((m) => m.Users),
  },
  {
    path: 'perfil',
    pathMatch: 'full',
    loadComponent: () => import('./modules/visitante/login/login').then((m) => m.Login),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./modules/visitante/login/login').then((m) => m.Login),
  },
  {
    path: 'alterar-senha',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/visitante/alterar-senha/alterar-senha').then((m) => m.AlterarSenha),
  },
];
