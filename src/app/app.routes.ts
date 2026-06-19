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
    loadComponent: () => import('./modules/guest/login/login').then((m) => m.Login),
  },
  {
    path: 'change-password',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/guest/change-password/change-password').then((m) => m.ChangePassword),
  },
  {
    path: 'create-account',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/guest/create-account/create-account').then((m) => m.CreateAccount),
  },
  {
    path: 'confirm-code/:email',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/guest/confirm-code/confirm-code').then((m) => m.ConfirmCode),
  },
];
