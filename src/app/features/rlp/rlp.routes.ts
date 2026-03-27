import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const RLP_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/rlp/index.md',
      regulationIds: ['b3-regulamento-rlp', 'cvm-resolucao-080'],
    },
  },
  {
    path: 'negocios',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/rlp/negocios.md',
      regulationIds: ['b3-regulamento-rlp', 'cvm-resolucao-080'],
    },
  },
  {
    path: 'tecnico',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/rlp/tecnico.md',
      regulationIds: ['b3-regulamento-rlp'],
    },
  },
];
