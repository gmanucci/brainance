# Opções

Uma **opção** é um contrato que confere ao comprador o **direito, mas não a obrigação**, de comprar ou vender um ativo a um preço predeterminado (preço de exercício ou *strike*) em uma data futura ou até ela.

## Tipos de opções

| Tipo | Descrição |
|------|-----------|
| **Call** (opção de compra) | Direito de comprar o ativo pelo strike |
| **Put** (opção de venda) | Direito de vender o ativo pelo strike |

## Estilo de exercício

| Estilo | Quando exercer |
|--------|---------------|
| **Americano** | A qualquer momento até o vencimento |
| **Europeu** | Somente na data de vencimento |

No Brasil, as opções de ações na B3 são predominantemente **americanas**; as opções de índice são **europeias**.

## Participantes

| Papel | Posição | Obrigação |
|-------|---------|-----------|
| Comprador (holder) | Long | Paga prêmio; tem o direito |
| Vendedor (writer) | Short | Recebe prêmio; tem a obrigação |

## Prêmio da opção

O **prêmio** é o preço pago pelo direito. Composto por dois elementos:

| Componente | Definição |
|-----------|-----------|
| **Valor intrínseco** | Quanto a opção vale se exercida agora |
| **Valor temporal** | Expectativa de ganho futuro até o vencimento |

## As Gregas

| Grega | Definição |
|-------|-----------|
| **Delta (Δ)** | Variação do prêmio / variação do ativo (0 a 1 para call) |
| **Gamma (Γ)** | Taxa de variação do delta |
| **Theta (Θ)** | Decaimento temporal do prêmio (sempre negativo para comprador) |
| **Vega (ν)** | Sensibilidade do prêmio à volatilidade implícita |
| **Rho (ρ)** | Sensibilidade do prêmio à taxa de juros |

## Estratégias clássicas

| Estratégia | Composição | Objetivo |
|-----------|-----------|---------|
| Covered call | Long ação + Short call | Renda sobre posição |
| Protective put | Long ação + Long put | Proteção contra queda |
| Straddle | Long call + Long put (mesmo strike) | Aposta em alta volatilidade |
| Spread de alta | Long call + Short call (strike maior) | Custo reduzido de call |

## Tributação

- **15%** sobre ganho no swing trade
- **20%** sobre ganho no day trade
- Sem isenção de R$ 20.000 mensal

> *Em construção: mais conteúdo será adicionado em breve.*
