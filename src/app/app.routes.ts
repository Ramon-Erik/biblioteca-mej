import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./modules/guest/home/home').then((m) => m.Home),
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
    path: 'solicitacoes',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/coordination/solicitations/solicitations').then((m) => m.Solicitations),
  },
  {
    path: 'perfil',
    pathMatch: 'full',
    loadComponent: () => import('./modules/reader/profile/profile').then((m) => m.Profile),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./modules/guest/login/login').then((m) => m.Login),
  },
  {
    path: 'mudar-senha',
    pathMatch: 'full',
    loadComponent: () =>
      import('./modules/guest/change-password/change-password').then((m) => m.ChangePassword),
  },
  {
    path: 'cadastrar-se',
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
