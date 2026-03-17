import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const EQUITIES_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/acoes/index.md',
      regulationIds: ['b3-regulamento-acoes'],
    },
  },
  {
    path: 'acoes-on-pn',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/acoes/acoes-on-pn.md',
      regulationIds: ['b3-regulamento-acoes'],
    },
  },
  {
    path: 'bdr',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/acoes/bdr.md',
      regulationIds: ['cvm-resolucao-160'],
    },
  },
  {
    path: 'etf',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/acoes/etf.md',
      regulationIds: ['cvm-resolucao-175', 'b3-regulamento-acoes'],
    },
  },
  {
    path: 'ipos',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/acoes/ipos.md',
      regulationIds: ['cvm-resolucao-160', 'anbima-codigo-distribuicao'],
    },
  },
];
