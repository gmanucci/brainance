import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const BONDS_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/titulos/index.md',
      regulationIds: ['cvm-resolucao-160'],
    },
  },
  {
    path: 'debentures',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/titulos/debentures.md',
      regulationIds: ['cvm-resolucao-160', 'anbima-codigo-distribuicao'],
    },
  },
  {
    path: 'cri-cra',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/titulos/cri-cra.md',
      regulationIds: ['cvm-resolucao-160'],
    },
  },
  {
    path: 'cce-nc',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/titulos/cce-nc.md',
    },
  },
];
