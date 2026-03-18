import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const FIXED_INCOME_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/renda-fixa/index.md',
      regulationIds: ['cvm-resolucao-175', 'bcb-cmn-4966'],
    },
  },
  {
    path: 'cdb',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/renda-fixa/cdb.md',
      regulationIds: ['bcb-cmn-4966'],
    },
  },
  {
    path: 'lci-lca',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/renda-fixa/lci-lca.md',
      regulationIds: ['bcb-cmn-4966'],
    },
  },
  {
    path: 'tesouro-direto',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/renda-fixa/tesouro-direto.md',
    },
  },
  {
    path: 'letra-financeira',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/renda-fixa/letra-financeira.md',
      regulationIds: ['bcb-cmn-4966'],
    },
  },
];
