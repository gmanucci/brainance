# Infraestrutura Técnica de Corretora

Uma **corretora de valores** é a entidade habilitada pela CVM (Resolução CVM nº 80/2022) para intermediar operações nos mercados financeiro e de capitais. Mantê-la tecnicamente exige um conjunto robusto de sistemas integrados que cobrirão desde a captação de ordens até a conciliação de posições e prestação de contas regulatória.

## Visão geral da arquitetura

```
Cliente
   ↓ (canal digital / API)
Front-End (App / Web / API Pública)
   ↓
OMS — Order Management System
   ↓ (FIX / protocolo proprietário)
Exchange / Contraparte (B3, CETIP, administrador de fundo)
   ↓ (confirmações, execuções, liquidações)
Back Office
   ↓
Custódia / Posição do Cliente
   ↓
Relatórios Regulatórios (CVM, B3, ANBIMA)
```

## Componentes principais

| Componente | Responsabilidade |
|---|---|
| **OMS** (Order Management System) | Recepção, roteamento e ciclo de vida das ordens |
| **Motor de Risco Pré-Negociação** | Limites de crédito, margem, exposição antes do envio |
| **Gateway de Mercado** | Conectividade com B3 (PUMA), CETIP (STR/Selic) via FIX/FIXML |
| **Back Office** | Confirmações, liquidação (D+0 a D+2), conciliação |
| **Custódia** | Guarda e registro dos ativos do cliente |
| **CRM / Cadastro** | KYC, suitability, dados do cliente |
| **Plataforma Digital** | App, web, API para o usuário final |
| **Reporting** | DAIR, notas de corretagem, extrato de custódia, IRS |

## Tipos de produto e canais de acesso

| Produto | Onde executa | Protocolo principal | Liquidação |
|---|---|---|---|
| Ações, ETFs, BDRs | B3 — Bovespa Segment | FIX 4.4 / PUMA | D+2 |
| Derivativos listados | B3 — BM&F Segment | FIX 4.4 / PUMA | D+1 |
| Fundos de investimento | Administrador / Plataforma | API REST / CETIP | D+0 a D+60 |
| Renda fixa (CDB, LCI, LCA) | Emissor / Plataforma | API REST / CETIP | D+0 |
| Títulos públicos | Tesouro Direto (TD) | API TD / SELIC | D+0 |
| Debêntures, CRI, CRA | B3 (Balcão) / CETIP | FIX / API proprietária | D+0 ou D+2 |

## Obrigações regulatórias técnicas

- **Registro de ordens**: toda ordem deve ter `timestamp` preciso (NTP sincronizado), identificação de cliente e canal de origem
- **Gravação de comunicações**: plataformas devem registrar todas as conversas e ordens (Resolução CVM nº 80)
- **Segregação patrimonial**: ativos dos clientes devem ser segregados dos ativos da corretora
- **Relatórios diários**: envio de posições e movimentações para B3 (DAIR), CVM e Receita Federal
- **Controles de risco**: limites operacionais obrigatórios antes da negociação

## Por onde começar

- [Ordens e OMS](ordens) — ciclo de vida de uma ordem e protocolo FIX
- [Aplicação e Resgate de Fundos](aplicacao-resgate) — fluxo de operações de fundos
- [Posições do Cliente](posicoes) — cálculo, custódia e conciliação de posições
- [Conectividade com Exchanges](conectividade) — B3, CETIP e roteamento de ordens
- [Manutenção da Corretora](infraestrutura) — sistemas, equipes e processos técnicos
