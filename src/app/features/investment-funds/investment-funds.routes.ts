import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const INVESTMENT_FUNDS_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/index.md',
      regulationIds: ['cvm-resolucao-175', 'anbima-codigo-adm-gestao'],
    },
  },
  {
    path: 'fif',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/fif.md',
      regulationIds: ['cvm-resolucao-175', 'anbima-codigo-adm-gestao'],
    },
  },
  {
    path: 'fia',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/fia.md',
      regulationIds: ['cvm-resolucao-175'],
    },
  },
  {
    path: 'fip',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/fip.md',
      regulationIds: ['cvm-resolucao-175'],
    },
  },
  {
    path: 'fic',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/fic.md',
      regulationIds: ['cvm-resolucao-175', 'anbima-codigo-adm-gestao'],
    },
  },
  {
    path: 'fiagro',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/fundos/fiagro.md',
      regulationIds: ['cvm-instrucao-588'],
    },
  },
];
