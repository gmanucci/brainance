import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const DERIVATIVES_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/derivativos/index.md',
      regulationIds: ['b3-regulamento-derivativos'],
    },
  },
  {
    path: 'contratos-futuros',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/derivativos/contratos-futuros.md',
      regulationIds: ['b3-regulamento-derivativos'],
    },
  },
  {
    path: 'opcoes',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/derivativos/opcoes.md',
      regulationIds: ['b3-regulamento-derivativos'],
    },
  },
  {
    path: 'swaps',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/derivativos/swaps.md',
      regulationIds: ['b3-regulamento-derivativos'],
    },
  },
  {
    path: 'termos',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/derivativos/termos.md',
      regulationIds: ['b3-regulamento-derivativos'],
    },
  },
];
