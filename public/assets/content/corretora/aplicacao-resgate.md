# Aplicação e Resgate de Fundos

Fundos de investimento não são negociados em bolsa como ações: o investidor **aplica** (compra cotas) e **resgata** (vende cotas) diretamente com o administrador ou por meio de uma plataforma distribuidora. O processo envolve múltiplos participantes e prazos específicos definidos no regulamento de cada fundo.

## Participantes do fluxo

| Participante | Função |
|---|---|
| **Investidor** | Envia a solicitação de aplicação ou resgate |
| **Distribuidor / Corretora** | Intermedia a ordem; responsável pelo KYC e suitability |
| **Administrador** | Processa a ordem, calcula a cota, emite o boletim de subscrição/resgate |
| **Gestor** | Decide os ativos a comprar/vender para honrar o resgate |
| **Custodiante** | Guarda os ativos; fornece posição para cálculo da cota (NAV) |
| **Auditor** | Verificação periódica da carteira e cálculo de cota |
| **B3 / CETIP** | Registro da cota e liquidação financeira |

## Fluxo de aplicação

```
1. Cliente solicita aplicação via plataforma (valor em R$)
   ↓
2. Distribuidor valida suitability e envia boletim de subscrição ao administrador
   ↓
3. Administrador verifica horário de corte (cut-off) — geralmente 13h ou 14h
   ↓
4. Cotização: cota utilizada é a de D+0 ou D+1 (depende do fundo)
   ↓
5. Liquidação financeira: débito na conta do investidor em D+0 ou D+1
   ↓
6. Registro da cota na B3/CETIP e atualização do extrato do cliente
```

## Fluxo de resgate

```
1. Cliente solicita resgate (total ou parcial) via plataforma
   ↓
2. Distribuidor envia pedido de resgate ao administrador
   ↓
3. Administrador verifica prazo de cotização (D+1, D+2, D+30, D+60…)
   ↓
4. Gestor liquida ativos da carteira se necessário
   ↓
5. Administrador calcula a cota de resgate (data de referência conforme regulamento)
   ↓
6. Liquidação: crédito na conta do investidor conforme prazo (D+1 a D+60)
```

## Prazos de cotização e liquidação por tipo de fundo

| Tipo de fundo | Cotização da aplicação | Cotização do resgate | Liquidação do resgate |
|---|---|---|---|
| FIF Renda Fixa Curto Prazo | D+0 | D+0 | D+1 |
| FIF Renda Fixa Longo Prazo | D+1 | D+1 | D+2 |
| FIF Multimercado | D+1 | D+1 a D+3 | D+1 a D+4 |
| FIA (Fundo de Ações) | D+1 | D+2 a D+4 | D+3 a D+5 |
| FII (Fundo Imobiliário) listado | Mercado secundário via B3 (ordem de compra) | Mercado secundário via B3 (ordem de venda) | D+2 |
| FIP (Participações) | D+1 | D+30 a D+180 | conforme regulamento |
| FIDC | D+1 | D+30 a D+60 | conforme regulamento |

> **Atenção:** Os prazos acima são referências. O regulamento de cada fundo prevalece e pode definir prazos distintos.

## Estrutura de dados para operações de fundo

### Solicitação de aplicação (API para administrador)

```json
{
  "tipo": "APLICACAO",
  "fundo_cnpj": "00.000.000/0001-00",
  "distribuidor_cnpj": "11.111.111/0001-11",
  "conta_cliente": "C001234",
  "cpf_cnpj_cliente": "000.000.000-00",
  "valor_bruto": 10000.00,
  "data_solicitacao": "2024-01-15T13:00:00-03:00",
  "canal": "API",
  "numero_protocolo": "APL-20240115-000001"
}
```

### Solicitação de resgate (API para administrador)

```json
{
  "tipo": "RESGATE",
  "fundo_cnpj": "00.000.000/0001-00",
  "distribuidor_cnpj": "11.111.111/0001-11",
  "conta_cliente": "C001234",
  "cpf_cnpj_cliente": "000.000.000-00",
  "modalidade": "TOTAL",
  "quantidade_cotas": null,
  "valor_resgatar": null,
  "data_solicitacao": "2024-01-15T10:30:00-03:00",
  "canal": "APP",
  "numero_protocolo": "RSG-20240115-000002"
}
```

### Confirmação de boletim (retorno do administrador)

```json
{
  "numero_protocolo": "APL-20240115-000001",
  "status": "ACEITO",
  "data_cotizacao": "2024-01-16",
  "cota_estimada": null,
  "cota_definitiva": 1.234567,
  "quantidade_cotas": 8102.084,
  "valor_liquido": 10000.00,
  "data_liquidacao": "2024-01-17"
}
```

## Controles e validações obrigatórias

### Antes do envio

| Validação | Descrição |
|---|---|
| **Suitability** | Perfil do investidor compatível com o risco do fundo |
| **Valor mínimo** | Respeitar aplicação mínima definida no regulamento |
| **Horário de corte** | Pedidos após o cut-off processados no próximo dia útil |
| **Conta habilitada** | Verificar se o fundo está disponível para o distribuidor |
| **Bloqueio de resgate** | Verificar carência ou lock-up no regulamento |
| **Saldo disponível** | Verificar saldo em conta corrente para aplicação |

### Após a confirmação

| Ação | Descrição |
|---|---|
| **Atualizar posição** | Registrar quantidade de cotas na conta do cliente |
| **Gerar IR** | Calcular come-cotas nos meses de maio e novembro |
| **Emitir comprovante** | Documento com nº de protocolo, cota utilizada e quantidade |
| **Enviar para custódia** | Registrar evento no sistema de custódia para conciliação |

## Integração com plataformas de fundos

As principais interfaces utilizadas no mercado brasileiro:

| Plataforma / Sistema | Função |
|---|---|
| **B3 FundosNet** | Registro e distribuição de fundos; dados de cotas |
| **ANBIMA Wheb** | Sistema de distribuição de fundos ANBIMA |
| **API do Administrador** | Cada administrador expõe API proprietária (REST/SOAP) |
| **CETIP / B3 Balcão** | Registro de cotas de FIIs, FIDCs e FIPs listados |
| **Tesouro Direto API** | Para fundos com títulos públicos ou acesso direto ao TD |
