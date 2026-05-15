import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/leitor/leitor.routes').then((m) => m.routes),
  },
];
