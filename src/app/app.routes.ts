import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
      },
      {
        path: 'renda-fixa',
        loadChildren: () =>
          import('./features/fixed-income/fixed-income.routes').then(m => m.FIXED_INCOME_ROUTES),
      },
      {
        path: 'fundos',
        loadChildren: () =>
          import('./features/investment-funds/investment-funds.routes').then(m => m.INVESTMENT_FUNDS_ROUTES),
      },
      {
        path: 'titulos',
        loadChildren: () =>
          import('./features/bonds/bonds.routes').then(m => m.BONDS_ROUTES),
      },
      {
        path: 'acoes',
        loadChildren: () =>
          import('./features/equities/equities.routes').then(m => m.EQUITIES_ROUTES),
      },
      {
        path: 'derivativos',
        loadChildren: () =>
          import('./features/derivatives/derivatives.routes').then(m => m.DERIVATIVES_ROUTES),
      },
      {
        path: 'corretora',
        loadChildren: () =>
          import('./features/broker/broker.routes').then(m => m.BROKER_ROUTES),
      },
      {
        path: 'regulamentacao',
        loadChildren: () =>
          import('./features/regulations/regulations.routes').then(m => m.REGULATIONS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
