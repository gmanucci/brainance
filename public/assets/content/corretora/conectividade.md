# Conectividade com Exchanges

A corretora precisa se conectar a múltiplos sistemas externos para enviar ordens, receber execuções, obter dados de mercado e liquidar operações. No Brasil, os principais destinos são a **B3** (bolsa de valores e derivativos), o **CETIP/B3 Balcão** (renda fixa e derivativos de balcão) e o **Tesouro Nacional** (títulos públicos via Tesouro Direto).

## B3 — Plataforma PUMA

O **PUMA** (Plataforma Unificada de Multi-Ativos) é o sistema de negociação da B3 para ações e derivativos listados. A comunicação é baseada no protocolo **FIX 4.4** sobre conexão TCP dedicada.

### Tipos de acesso ao PUMA

| Modalidade | Descrição | Latência típica |
|---|---|---|
| **DMA 1** (Direto) | Infraestrutura própria da corretora conectada ao PUMA | < 5 ms |
| **DMA 2** (Roteado) | Ordens enviadas pela corretora via plataforma web/app | 5–50 ms |
| **DMA 3** (Co-location) | Servidores hospedados no datacenter da B3 | < 1 ms |
| **DMA 4** (Intermediado) | Plataformas de terceiros homologadas pela B3 | variável |

### Conexão FIX com PUMA

```
Pré-requisitos:
1. Contrato de acesso com a B3 (habilitação de corretora)
2. Certificado digital B3 (par de chaves RSA)
3. IP fixo registrado na B3
4. Ambiente de homologação (UAT) aprovado antes de produção

Sessões FIX:
- Uma sessão por segmento (Bovespa / BM&F)
- Logon com CompID e senha
- Heartbeat a cada 30 segundos
- Reconnect automático em caso de queda
```

### Dados de mercado via B3

| Feed | Conteúdo | Protocolo |
|---|---|---|
| **UMDF** (Unified Market Data Feed) | Book de ofertas Level 2, trades, cotações | Multicast UDP |
| **MBO** (Market By Order) | Cada ordem individual no book (Level 3) | Multicast UDP |
| **PUMA Market Data** | Versão FIX do feed de mercado | FIX 5.0 SP2 |
| **Vendor Feeds** | Bloomberg, Refinitiv, B3 Data Solutions | API REST / FTP |

## CETIP / B3 Balcão — Renda Fixa e Derivativos OTC

O segmento de balcão da B3 registra CDBs, LCIs, LCAs, Debêntures, CRIs, CRAs e derivativos de balcão (swaps, termos).

### Sistemas de registro e liquidação

| Sistema | Descrição | Ativos |
|---|---|---|
| **CETIP** | Custódia e liquidação de títulos privados | CDB, LCI, LCA, Debêntures, CRI, CRA |
| **SELIC** | Custódia e liquidação de títulos públicos | LTN, NTN-B, NTN-F, LFT |
| **STR** (Sistema de Transferência de Reservas) | Liquidação financeira interbancária | Todos |
| **CIP-SILOC** | Liquidação de DOC/TED de clientes | Transferências |

### Integração com CETIP/B3 Balcão

```
Fluxo de registro de CDB:
1. Emissor (banco) registra o CDB na CETIP via API
2. CETIP atribui código CETIP e confirma registro
3. Corretora/plataforma recebe confirmação e atualiza posição do cliente
4. Liquidação do valor em STR (D+0)
5. Na data de vencimento: CETIP debita o emissor e credita o investidor via STR
```

## Tesouro Direto — API do Tesouro Nacional

O **Tesouro Direto** opera via API REST disponibilizada pelo Tesouro Nacional para agentes habilitados (corretoras e bancos credenciados).

### Operações disponíveis na API

| Endpoint | Método | Descrição |
|---|---|---|
| `/titulos/disponiveis` | GET | Lista títulos e preços disponíveis para compra |
| `/investimentos/compra` | POST | Solicita compra de título |
| `/investimentos/venda` | POST | Solicita venda antecipada |
| `/investimentos/agendamentos` | GET/POST | Lista ou cria agendamentos |
| `/extrato` | GET | Extrato de posição do CPF |
| `/taxas` | GET | Taxas atuais de cada título |

### Limites operacionais do Tesouro Direto

| Parâmetro | Limite |
|---|---|
| Compra mínima | R$ 30,00 (ou fração de 1% do título) |
| Compra máxima por CPF por mês | R$ 1.000.000,00 |
| Horário de negociação | Segunda a sexta, 09h30 às 18h |
| Liquidação da compra | D+1 (útil) |
| Liquidação da venda antecipada | D+1 (útil) |

## Arquitetura de conectividade recomendada

```
[Plataforma Digital / OMS]
         |
         | REST / WebSocket (ordens e cotações internas)
         ↓
[Gateway de Mercado]  ←→  Módulo de Risco Pré-Negociação
         |
         ├── FIX Session → B3 PUMA (Bovespa Segment)
         ├── FIX Session → B3 PUMA (BM&F Segment)
         ├── API REST   → Tesouro Direto
         ├── API REST   → Administradores de Fundos
         └── API REST   → CETIP / B3 Balcão
         
[Feed de Dados de Mercado]
         ├── UDP Multicast → B3 UMDF (cotações em tempo real)
         ├── WebSocket     → Normalização interna e distribuição
         └── REST Polling  → Dados históricos e referência

[Liquidação e Back Office]
         ├── SFTP / API → B3 (arquivos D3 de custódia, DAIR)
         ├── API       → CETIP (extrato e posição)
         └── STR       → Liquidação financeira (via banco liquidante)
```

## Requisitos de infraestrutura para conectividade

| Requisito | Especificação |
|---|---|
| **Latência de rede** | < 5 ms para B3 em produção; co-location para HFT |
| **Redundância** | Dual link dedicado (fibra + backup) para B3 |
| **Disponibilidade** | 99,99% durante pregão (09h–18h) |
| **Certificados** | Renovação anual dos certificados B3 e Tesouro |
| **Monitoramento** | Alertas em tempo real de heartbeat FIX e latência |
| **Failover** | Sessão secundária em outro ponto de presença B3 |
| **Segurança** | VPN ou link dedicado; nenhuma porta FIX exposta à internet |

## Ambientes e homologação

| Ambiente | Propósito | Dados |
|---|---|---|
| **UAT (B3)** | Testes de integração com B3 | Simulados |
| **Staging** | Testes internos end-to-end | Dados de produção (anonimizados) |
| **Produção** | Operação real | Dados reais |

> Toda nova funcionalidade de conectividade deve ser aprovada no ambiente UAT da B3 antes de ir a produção. O processo de certificação B3 pode levar de 2 a 6 semanas.
