# RLP — Aspecto de Negócios

## O que é o RLP?

O **Retail Liquidity Provider (RLP)** é um programa criado pela B3 com o objetivo de melhorar a qualidade de execução das ordens de **investidores pessoa física (PF)** no mercado à vista de ações e ETFs. Corretoras e dealers habilitados podem atuar como **Provedores de Liquidez (PL)** e oferecer preços iguais ou melhores que os disponíveis no livro de ofertas central.

## Modelo comercial

O modelo de negócios do RLP é similar ao **Payment for Order Flow (PFOF)** praticado em outros mercados:

1. A **corretora do cliente** encaminha a ordem de varejo ao PL antes de enviá-la ao book.
2. O **PL** responde com um preço igual ou melhor do que o NBBO (*National Best Bid/Offer*).
3. O **cliente PF** recebe uma execução no preço melhorado (ou igual).
4. O **PL** captura o spread e remunera a corretora pelo fluxo de ordens (*rebate*).

```
Corretora do cliente  ←→  Provedor de Liquidez (PL)
         ↕ fluxo de ordens       ↕ spread / rebate
   Investidor PF             Mesa de operações do PL
```

## Elegibilidade

| Critério | Requisito |
|---|---|
| Tipo de investidor | Pessoa Física (varejo) |
| Instrumento | Ações, ETFs e BDRs listados na B3 (segmento Bovespa) |
| Tamanho da ordem | Conforme limites definidos pelo regulamento da B3 para ordens de varejo |
| Conta de origem | Conta individual ou conjunta de PF; excluídas contas de PJ e institucionais |

## Obrigações do Provedor de Liquidez

O PL credenciado pela B3 deve cumprir uma série de obrigações de negócio:

- **Melhoria de preço**: o preço ofertado deve ser **igual ou melhor** que o melhor preço disponível no livro central no momento da requisição;
- **Disponibilidade**: o PL deve garantir disponibilidade mínima de cotações durante o horário de negociação;
- **Limite de internalização**: existe um teto percentual (definido pela B3) da quantidade de ordens de varejo que podem ser internalizadas;
- **Transparência**: todas as execuções via RLP são reportadas à B3 e publicadas nos dados de mercado;
- **Conflito de interesses**: o PL não pode usar informações da ordem de varejo para negociar em benefício próprio antes da execução do cliente (*front-running* é vedado e monitorado).

## Regulamentação e supervisão

| Órgão | Instrumento | Tema |
|---|---|---|
| **B3** | Regulamento de Operações — RLP | Critérios de credenciamento, obrigações do PL, limites e monitoramento |
| **CVM** | Resolução CVM nº 80/2022 | Deveres do intermediário, melhores práticas de execução |
| **B3** | Regulamento de Operações — Segmento Bovespa | Regras gerais de negociação |

## Vantagens e riscos

### Para o investidor PF

| Vantagem | Risco/Consideração |
|---|---|
| Execução potencialmente a preço melhor | Sem garantia de execução integral ao preço melhorado |
| Maior chance de execução em ativos menos líquidos | PL pode ser mais seletivo em ativos voláteis |

### Para a corretora (distribuidora)

| Vantagem | Risco/Consideração |
|---|---|
| Receita adicional via rebate do PL | Obrigação de transparência e divulgação ao cliente |
| Melhoria no NPS por experiência de execução | Risco regulatório se não houver melhor execução efetiva |

### Para o Provedor de Liquidez

| Vantagem | Risco/Consideração |
|---|---|
| Acesso a fluxo previsível de ordens de varejo | Exposição a risco de mercado na internalização |
| Receita de spread | Risco de seleção adversa em ativos com alta volatilidade |

## Comparativo com o mercado tradicional

| Aspecto | Execução tradicional (book) | Execução via RLP |
|---|---|---|
| Contraparte | Anônima (livro de ofertas) | PL credenciado |
| Formação de preço | Puro leilão contínuo | Preço igual ou melhor que o book |
| Transparência | Total (book visível) | Execução reportada após o negócio |
| Custo implícito | Spread bid-ask do book | Spread capturado pelo PL (deve ser ≤ spread do book) |
