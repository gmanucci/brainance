import { Routes } from '@angular/router';
import { TopicPage } from '../../shared/components/topic-page/topic-page';

export const BROKER_ROUTES: Routes = [
  {
    path: '',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/index.md',
      regulationIds: ['cvm-resolucao-080'],
    },
  },
  {
    path: 'ordens',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/ordens.md',
      regulationIds: ['cvm-resolucao-080', 'b3-regulamento-acoes'],
    },
  },
  {
    path: 'aplicacao-resgate',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/aplicacao-resgate.md',
      regulationIds: ['cvm-resolucao-175', 'cvm-resolucao-080'],
    },
  },
  {
    path: 'posicoes',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/posicoes.md',
      regulationIds: ['cvm-resolucao-080', 'b3-regulamento-acoes'],
    },
  },
  {
    path: 'conectividade',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/conectividade.md',
      regulationIds: ['cvm-resolucao-080', 'b3-regulamento-acoes'],
    },
  },
  {
    path: 'infraestrutura',
    component: TopicPage,
    data: {
      assetPath: 'assets/content/corretora/infraestrutura.md',
      regulationIds: ['cvm-resolucao-080'],
    },
  },
];
