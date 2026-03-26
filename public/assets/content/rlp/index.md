# RLP — Retail Liquidity Provider

O **RLP (Retail Liquidity Provider)** é um programa da B3 que permite que corretoras e dealers credenciados ofereçam cotações melhoradas (preços mais favoráveis) para ordens de **pessoas físicas** nas negociações do mercado à vista de ações e ETFs.

## O que é o RLP?

No modelo tradicional da bolsa, todas as ordens competem no livro central de ofertas (order book). No RLP, um participante credenciado — denominado **Provedor de Liquidez (PL)** — pode responder a ordens de clientes de varejo com um preço igual ou melhor do que o disponível no livro, **internalizando** parcial ou totalmente a ordem antes de ela ser enviada ao mercado.

> O objetivo é melhorar a execução para o investidor pessoa física, garantindo que ele receba o melhor preço disponível, seja do book central, seja do PL.

## Como funciona o fluxo básico

```
Ordem de varejo (PF)
        ↓
   Corretora do cliente
        ↓  (smart order routing / RLP trigger)
   Verificação: há PL ativo para esse ativo?
        ↓ Sim              ↓ Não
   PL responde com    Ordem enviada
   cotação (≤ ask     ao book da B3
   ou ≥ bid)
        ↓
   Execução interna
   (ou complementação
   no book da B3)
```

## Participantes

| Papel | Descrição |
|---|---|
| **Investidor PF** | Origina a ordem de varejo qualificada para RLP |
| **Corretora do cliente** | Roteia a ordem e ativa o mecanismo RLP |
| **Provedor de Liquidez (PL)** | Dealer/corretora credenciada que oferta o preço melhorado |
| **B3** | Opera a infraestrutura de internalização e publica regras |

## Benefícios e considerações

- **Para o investidor PF**: possibilidade de execução a preço igual ou melhor que o NBBO (National Best Bid/Offer) do livro;
- **Para a corretora/PL**: fonte de receita pela diferença de spread (payment for order flow);
- **Para o mercado**: potencial aumento de liquidez em ativos menos negociados.

## Por onde começar

- [Aspecto de Negócios](negocios) — modelo comercial, elegibilidade, obrigações do PL e regulamentação
- [Aspecto Técnico](tecnico) — integração com B3, protocolo FIX, mensagens e fluxo de dados
