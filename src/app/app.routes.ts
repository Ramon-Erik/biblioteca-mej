import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

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
    path: 'perfil',
    pathMatch: 'full',
    loadComponent: () => import('./modules/logged-in/perfil/perfil').then((m) => m.Perfil),
    canActivate: [AuthGuard],
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
