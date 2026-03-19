# Posições do Cliente

A **posição do cliente** é o retrato em tempo real (ou ao fim do dia) de todos os seus ativos: ações, cotas de fundos, títulos de renda fixa, derivativos, saldo em conta e garantias depositadas. Manter posições precisas é obrigação regulatória e base para cálculo de IR, margem e relatórios de custódia.

## Tipos de posição

| Tipo | Descrição | Exemplo |
|---|---|---|
| **Custódia de renda variável** | Ações, ETFs, BDRs, FIIs listados em nome do cliente | 100 PETR4, 50 BOVA11 |
| **Custódia de fundos** | Quantidade de cotas de cada fundo | 8.102 cotas XPVP11 |
| **Custódia de renda fixa** | Títulos públicos (TD), CDB, LCI, LCA, Debêntures | R$ 50.000 em CDB banco X |
| **Derivativos abertos** | Contratos futuros, opções em aberto, swaps | 10 contratos WINM24 |
| **Saldo em conta** | Caixa disponível para negociação | R$ 5.000,00 |
| **Garantias** | Ativos alocados como margem para derivativos | R$ 20.000 em Tesouro Selic |
| **D+1 / D+2 a liquidar** | Operações executadas ainda não liquidadas | Compra de 100 VALE3 em D+2 |

## Estrutura de dados da posição

### Posição de renda variável

```json
{
  "conta_cliente": "C001234",
  "data_referencia": "2024-01-15",
  "posicao_rv": [
    {
      "ticker": "PETR4",
      "mercado": "BOVESPA",
      "quantidade": 100,
      "preco_medio": 32.50,
      "preco_fechamento": 35.20,
      "valor_mercado": 3520.00,
      "resultado_bruto": 270.00,
      "resultado_percentual": 8.31,
      "disponivel_para_venda": 100,
      "bloqueado": 0
    }
  ]
}
```

### Posição de fundos

```json
{
  "conta_cliente": "C001234",
  "data_referencia": "2024-01-15",
  "posicao_fundos": [
    {
      "fundo_cnpj": "00.000.000/0001-00",
      "fundo_nome": "Fundo Exemplo RF",
      "quantidade_cotas": 8102.084,
      "cota_atual": 1.256789,
      "valor_bruto": 10183.47,
      "preco_medio_cota": 1.234567,
      "resultado_bruto": 183.47,
      "data_primeira_aplicacao": "2024-01-16",
      "ir_retido": 0.00,
      "disponivel_resgate": true
    }
  ]
}
```

### Posição de renda fixa

```json
{
  "conta_cliente": "C001234",
  "data_referencia": "2024-01-15",
  "posicao_rf": [
    {
      "codigo_ativo": "CDB-BANCO-X-2026",
      "tipo": "CDB",
      "emissor": "Banco Exemplo S.A.",
      "valor_aplicado": 50000.00,
      "valor_bruto_atual": 53400.00,
      "taxa_contratada": "CDI + 0.5%",
      "data_aplicacao": "2023-01-15",
      "data_vencimento": "2026-01-15",
      "indexador": "CDI",
      "liquidez": "NO_VENCIMENTO",
      "garantia_fgc": true,
      "ir_estimado": 510.00,
      "valor_liquido_estimado": 52890.00
    }
  ]
}
```

## Cálculo e atualização de posições

### Fontes de atualização

| Evento | Impacto na posição | Frequência |
|---|---|---|
| Execução de ordem (compra) | Incrementa quantidade; atualiza preço médio | Em tempo real |
| Execução de ordem (venda) | Decrementa quantidade; calcula P&L realizado | Em tempo real |
| Liquidação (D+2) | Confirma débito/crédito financeiro | Diária (ciclo B3) |
| Proventos (dividendo, JCP) | Crédito em conta; não altera quantidade de ações | Conforme calendário |
| Bonificação / Grupamento | Altera quantidade e preço médio | Evento corporativo |
| Come-cotas (fundo) | Reduz quantidade de cotas (maio e novembro) | Semestral |
| Mark-to-market (derivativos) | Ajuste diário de P&L em contratos futuros | Diária (ajuste B3) |
| Atualização de cota (fundo) | Atualiza valor de mercado | Diária (D+1) |

### Fórmula do preço médio

```
Novo PM = (PM_anterior × Qtd_anterior + Preço_execução × Qtd_nova) / (Qtd_anterior + Qtd_nova)
```

> O preço médio é utilizado para cálculo do IR sobre ganho de capital em renda variável.

## Conciliação de posições

A conciliação garante que a posição registrada no sistema da corretora bate com a posição registrada na **B3 (C3 — Controle de Custódia e Compensação)** e na **CETIP**.

### Processo diário de conciliação

```
1. Ao fim do dia (após D+2 atingir liquidação)
   ↓
2. Extrair posição do sistema interno (back office)
   ↓
3. Importar arquivo de posição da B3 (arquivo D3 / extrato C3)
   ↓
4. Comparar ativo a ativo, conta a conta
   ↓
5. Identificar divergências (breaks)
   ↓
6. Investigar e resolver: execução não confirmada, evento corporativo não processado, etc.
   ↓
7. Gerar relatório de conciliação e encaminhar para compliance
```

### Tipos de divergência comuns

| Divergência | Causa provável | Resolução |
|---|---|---|
| Ativo presente no sistema, ausente na B3 | Liquidação ainda pendente | Aguardar próximo ciclo D+2 |
| Quantidade diferente | Evento corporativo não processado | Processar bonificação/grupamento |
| Ausente no sistema, presente na B3 | Migração de ativos ou transferência inter-corretora | Incluir posição manualmente |

## Relatórios de custódia obrigatórios

| Relatório | Destinatário | Periodicidade |
|---|---|---|
| **Extrato de Custódia** | Cliente | Sob demanda / mensal |
| **DAIR** (Declaração de Ativo de Investimento) | B3 | Diário |
| **Informe de Rendimentos** | Cliente | Anual (para IR) |
| **Posição de Derivativos** | B3 / CVM | Diário |
| **Posição de Fundos** | ANBIMA / CVM (via administrador) | Diário |

## Garantias e margem

Para clientes com posições em derivativos, a corretora deve gerenciar o **depósito de margem** exigido pela B3:

- **Margem inicial**: depositada ao abrir um contrato futuro ou vender uma opção a descoberto
- **Ajuste diário**: liquidado em D+1; débito ou crédito conforme variação do contrato
- **Margem de manutenção**: nível mínimo abaixo do qual uma _margin call_ é emitida
- **Ativos aceitos como garantia**: Tesouro Selic, LTN, ações do Ibovespa, ouro (com deságios aplicados pela B3)
