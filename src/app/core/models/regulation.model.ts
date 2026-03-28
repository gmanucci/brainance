export type RegulationIssuer = 'CVM' | 'ANBIMA' | 'B3' | 'BCB' | 'CMN' | 'Congresso Nacional';

export type RegulationTopic =
  | 'renda-fixa'
  | 'fundos'
  | 'titulos'
  | 'acoes'
  | 'derivativos'
  | 'rlp'
  | 'tokenizacao'
  | 'geral';

export interface Regulation {
  id: string;
  title: string;
  issuer: RegulationIssuer;
  type: string; // e.g. "Resolução", "Instrução", "Código"
  number: string;
  date: string; // ISO date string
  summary: string;
  topics: RegulationTopic[];
  localPath: string | null; // relative to assets/docs/, null if not stored locally
  officialUrl: string;
}
