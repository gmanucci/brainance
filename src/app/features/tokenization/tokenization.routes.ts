import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const TOKENIZATION_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/tokenizacao/index.md',
      regulationIds: ['cvm-resolucao-088', 'cvm-resolucao-096', 'lei-14478-2022', 'cvm-resolucao-175'],
    },
  },
  {
    path: 'renda-fixa',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/tokenizacao/renda-fixa.md',
      regulationIds: ['cvm-resolucao-088', 'cvm-resolucao-096', 'lei-14478-2022', 'bcb-cmn-4966'],
    },
  },
  {
    path: 'fundos',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/tokenizacao/fundos.md',
      regulationIds: ['cvm-resolucao-088', 'cvm-resolucao-096', 'lei-14478-2022', 'cvm-resolucao-175'],
    },
  },
];
