# Entrega - Prototipo frontend V1

## Resumo

Foi criado o primeiro prototipo navegavel do My Box PDV em React, TypeScript e
Vite. A interface usa dados mockados e permite avaliar os principais fluxos do
backlog sem depender de backend.

## Modulos cobertos

- login de mercado e APP_ADMIN;
- dashboard operacional;
- PDV com multiplos carrinhos;
- busca por produto e codigo de barras;
- apresentacoes e conversao para estoque base;
- item manual, desconto e acrescimo;
- pagamentos em dinheiro, Pix, cartao e fiado;
- vendas e caixa;
- estoque, produtos e movimentacoes;
- financeiro, contas e firmas;
- clientes, dividas e pagamentos de fiado;
- relatorios e margens;
- backups e exportacoes;
- administracao global e minha conta.

## Responsividade

A navegacao, paineis, tabelas, formularios, modais e acoes foram adaptados para:

- desktop;
- tablet;
- mobile a partir de 320 px.

No mobile, as tabelas viram listas, a navegacao principal fica no rodape, os
modais viram paineis inferiores e o resumo do PDV permanece visivel.

## Validacoes

- verificacao TypeScript integrada ao build;
- build de producao com Vite;
- resposta HTTP do servidor local;
- revisao estatica dos breakpoints e estados responsivos.

A inspecao automatizada por screenshot ficou bloqueada pela politica do navegador
interno apos uma primeira tentativa de conexao recusada. O servidor local foi
mantido disponivel para avaliacao manual.

## Limitacoes

- os dados nao persistem ao recarregar;
- todas as operacoes sao simuladas;
- nao existe autenticacao ou autorizacao real;
- leitor de codigo de barras, pagamentos, backup e exportacao nao integram com
  servicos externos;
- regras definitivas ainda deverao ser validadas e implementadas no backend.

