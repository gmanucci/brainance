# Manutenção Técnica da Corretora

Operar uma corretora de valores exige muito mais do que conectividade com exchanges. Um conjunto amplo de sistemas, equipes e processos deve estar permanentemente em funcionamento para garantir conformidade regulatória, segurança operacional e qualidade de serviço ao cliente.

## Sistemas essenciais

| Sistema | Descrição | Integrações principais |
|---|---|---|
| **OMS** (Order Management System) | Recepção, roteamento e ciclo de vida de ordens | B3 PUMA (FIX), motor de risco |
| **Back Office** | Confirmações, liquidação, conciliação, eventos corporativos | B3, CETIP, Selic |
| **Sistema de Custódia** | Posição de ativos por cliente; guarda escritural | B3 (C3), CETIP |
| **CRM / Cadastro (KYC)** | Dados do cliente, suitability, onboarding | Órgãos regulatórios, Receita Federal |
| **Plataforma Digital** | App, web, API pública para o cliente final | OMS, Custódia, CRM |
| **Gateway de Pagamentos** | TED, PIX, boleto; depósito e saque | Banco liquidante, CIP |
| **Motor de Risco** | Controles pré e pós-negociação; margem, limites | OMS, Custódia |
| **Contabilidade** | COSIF, plano de contas CVM; auditoria | Back Office, Gateway de Pagamentos |
| **Reporting Regulatório** | DAIR, IRS, notas de corretagem, extratos | B3, CVM, Receita Federal, ANBIMA |
| **Monitoramento e Observabilidade** | Logs, métricas, alertas, tracing | Todos os sistemas |

## Processos operacionais diários

### Abertura do pregão

```
1. Verificar conectividade FIX com B3 (sessão Bovespa e BM&F)
2. Confirmar recepção de dados de mercado (UMDF / cotações)
3. Validar saldos e posições overnight (conciliação D-1)
4. Processar eventos corporativos pendentes (dividendos, bonificações)
5. Habilitar recepção de ordens dos clientes
```

### Durante o pregão

```
1. Monitorar latência e taxa de rejeição de ordens pela B3
2. Acompanhar consumo de limites de risco dos clientes
3. Verificar margem calls (derivativos)
4. Monitorar circuit breakers e leilões de ativo
5. Processar ajustes diários de contratos futuros (B3 envia às ~16h)
```

### Fechamento do pregão

```
1. Processar todas as execuções do dia (trade reports)
2. Emitir notas de corretagem para operações do dia
3. Iniciar conciliação com B3 (arquivo D3)
4. Processar liquidação D+2 de operações de D-2
5. Enviar DAIR para B3 (prazo: até as 22h)
6. Calcular e debitar come-cotas (apenas em maio e novembro)
7. Gerar relatório de posição para clientes
```

## Gestão de risco operacional

### Controles pré-negociação

| Controle | Descrição |
|---|---|
| **Limite por cliente** | Exposição máxima em R$ por conta |
| **Limite por ativo** | Quantidade máxima de um único ativo |
| **Filtro de preço** | Rejeitar ordens com preço muito distante do último negócio |
| **Filtro "fat finger"** | Rejeitar ordens com valor total acima de threshold |
| **Verificação de saldo** | Saldo disponível antes de aceitar ordem de compra |
| **Verificação de custódia** | Quantidade disponível antes de aceitar venda |

### Controles pós-negociação

| Controle | Descrição |
|---|---|
| **Monitoramento de P&L** | Acompanhar resultado acumulado por cliente e carteira |
| **Stress test** | Calcular impacto de cenários extremos na carteira |
| **Exposição cambial** | Monitorar posições em ativos referenciados em moeda estrangeira |
| **Concentração** | Alertar quando um cliente concentra > X% em um único ativo |

## Segurança da informação

### Requisitos técnicos

- **Autenticação multifator (MFA)**: obrigatório para acesso ao sistema de trading
- **Criptografia em trânsito**: TLS 1.3 em todas as APIs externas e internas
- **Criptografia em repouso**: dados de clientes e posições cifrados no banco de dados
- **Segregação de redes**: rede de trading isolada de sistemas administrativos
- **Pentest periódico**: testes de penetração anuais (recomendado semestral)
- **SIEM** (Security Information and Event Management): monitoramento de eventos de segurança
- **Backup e recuperação**: RPO < 1h, RTO < 4h para sistemas críticos

### Conformidade LGPD e CVM

| Obrigação | Descrição |
|---|---|
| **Armazenamento de dados de clientes** | Dados de KYC armazenados por no mínimo 5 anos |
| **Gravação de comunicações** | Ordens e comunicações gravadas por 5 anos (Res. CVM 80) |
| **Política de privacidade** | Consentimento explícito para uso dos dados |
| **DPO** (Data Protection Officer) | Nomeação obrigatória pela LGPD |
| **Notificação de incidente** | Prazo de 72h para comunicar vazamentos à ANPD |

## Infraestrutura tecnológica

### Ambiente de produção recomendado

| Componente | Especificação |
|---|---|
| **Datacenter** | Tier III ou superior; preferencialmente São Paulo (proximidade B3) |
| **Co-location B3** | Servidores no datacenter da B3 para latência ultra-baixa |
| **Link de dados** | Fibra dedicada (primária) + MPLS (backup) para B3 |
| **Banco de dados** | Alta disponibilidade (Active-Passive ou Active-Active); PostgreSQL ou Oracle |
| **Servidores de aplicação** | Cluster com balanceamento de carga; auto-scaling |
| **Cache** | Redis para sessões de usuário, posições intraday e limites de risco |
| **Fila de mensagens** | Kafka ou RabbitMQ para processamento assíncrono de ordens |
| **Observabilidade** | Prometheus + Grafana (métricas); ELK Stack (logs); Jaeger (tracing) |

### Métricas de SLA operacional

| Serviço | Disponibilidade alvo | Latência alvo |
|---|---|---|
| Recepção de ordens | 99,99% (pregão) | < 100 ms (app → OMS) |
| Envio ao mercado (FIX) | 99,99% (pregão) | < 10 ms (OMS → B3) |
| Atualização de posição | 99,9% | < 2 s após execução |
| Dados de mercado | 99,9% (pregão) | < 500 ms (defasagem máx.) |
| API pública (clientes) | 99,9% | < 300 ms p95 |

## Equipes e processos

### Estrutura mínima de TI para uma corretora

| Área | Responsabilidade |
|---|---|
| **Engenharia de Plataforma** | OMS, gateway FIX, back office, APIs |
| **Infraestrutura / SRE** | Servidores, redes, monitoramento, on-call |
| **Segurança** | InfoSec, LGPD, pentest, SIEM |
| **Dados e BI** | Data warehouse, relatórios regulatórios, analytics |
| **QA** | Testes de integração, UAT, regras de negócio |
| **Compliance Tecnológico** | Homologação B3/CVM, certificações, auditorias |

## Conformidade regulatória contínua

| Obrigação | Órgão | Periodicidade |
|---|---|---|
| **DAIR** — Declaração de Ativos de Investidores | B3 | Diária |
| **Informe de Rendimentos** | Receita Federal | Anual |
| **Relatório de Risco** | CVM | Mensal |
| **Certificação de sistemas** | B3 | A cada mudança significativa |
| **Auditoria de sistemas** | CVM / Auditor externo | Anual |
| **Plano de continuidade de negócios (PCN)** | CVM / BCB | Revisão anual |
| **Testes de PCN** | Interno | Semestral |
