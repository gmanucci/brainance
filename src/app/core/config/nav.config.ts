import { NavSection } from '../models/nav.model';

export const NAV_CONFIG: NavSection[] = [
  {
    title: 'Renda Fixa',
    featureKey: 'renda-fixa',
    items: [
      { label: 'Visão Geral', path: '/renda-fixa' },
      { label: 'CDB', path: '/renda-fixa/cdb' },
      { label: 'LCI e LCA', path: '/renda-fixa/lci-lca' },
      { label: 'Tesouro Direto', path: '/renda-fixa/tesouro-direto' },
      { label: 'Letra Financeira', path: '/renda-fixa/letra-financeira' },
    ],
  },
  {
    title: 'Fundos de Investimento',
    featureKey: 'fundos',
    items: [
      { label: 'Visão Geral', path: '/fundos' },
      { label: 'FIF', path: '/fundos/fif' },
      { label: 'FIA', path: '/fundos/fia' },
      { label: 'FIP', path: '/fundos/fip' },
      { label: 'FIC', path: '/fundos/fic' },
      { label: 'FIAGRO', path: '/fundos/fiagro' },
    ],
  },
  {
    title: 'Títulos',
    featureKey: 'titulos',
    items: [
      { label: 'Visão Geral', path: '/titulos' },
      { label: 'Debêntures', path: '/titulos/debentures' },
      { label: 'CRI e CRA', path: '/titulos/cri-cra' },
      { label: 'CCE e NC', path: '/titulos/cce-nc' },
    ],
  },
  {
    title: 'Ações e Renda Variável',
    featureKey: 'acoes',
    items: [
      { label: 'Visão Geral', path: '/acoes' },
      { label: 'Ações ON e PN', path: '/acoes/acoes-on-pn' },
      { label: 'BDR', path: '/acoes/bdr' },
      { label: 'ETF', path: '/acoes/etf' },
      { label: 'IPOs', path: '/acoes/ipos' },
    ],
  },
  {
    title: 'Derivativos',
    featureKey: 'derivativos',
    items: [
      { label: 'Visão Geral', path: '/derivativos' },
      { label: 'Contratos Futuros', path: '/derivativos/contratos-futuros' },
      { label: 'Opções', path: '/derivativos/opcoes' },
      { label: 'Swaps', path: '/derivativos/swaps' },
      { label: 'Termos', path: '/derivativos/termos' },
    ],
  },
  {
    title: 'Infraestrutura de Corretora',
    featureKey: 'corretora',
    items: [
      { label: 'Visão Geral', path: '/corretora' },
      { label: 'Ordens e OMS', path: '/corretora/ordens' },
      { label: 'Aplicação e Resgate', path: '/corretora/aplicacao-resgate' },
      { label: 'Posições do Cliente', path: '/corretora/posicoes' },
      { label: 'Conectividade com Exchanges', path: '/corretora/conectividade' },
      { label: 'Manutenção da Corretora', path: '/corretora/infraestrutura' },
    ],
  },
  {
    title: 'RLP — Retail Liquidity Provider',
    featureKey: 'rlp',
    items: [
      { label: 'Visão Geral', path: '/rlp' },
      { label: 'Aspecto de Negócios', path: '/rlp/negocios' },
      { label: 'Aspecto Técnico', path: '/rlp/tecnico' },
    ],
  },
  {
    title: 'Tokenização',
    featureKey: 'tokenizacao',
    items: [
      { label: 'Visão Geral', path: '/tokenizacao' },
      { label: 'Renda Fixa Tokenizada', path: '/tokenizacao/renda-fixa' },
      { label: 'Fundos Tokenizados', path: '/tokenizacao/fundos' },
    ],
  },
  {
    title: 'Regulamentação',
    featureKey: 'regulamentacao',
    items: [
      { label: 'Todos os documentos', path: '/regulamentacao' },
      { label: 'CVM', path: '/regulamentacao?issuer=CVM' },
      { label: 'ANBIMA', path: '/regulamentacao?issuer=ANBIMA' },
      { label: 'B3', path: '/regulamentacao?issuer=B3' },
      { label: 'BCB / CMN', path: '/regulamentacao?issuer=BCB' },
    ],
  },
];
