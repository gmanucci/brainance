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
