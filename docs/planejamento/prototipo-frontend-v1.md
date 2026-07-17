# Planejamento - Prototipo frontend V1

## Objetivo

Criar em `frontend/` um prototipo navegavel e 100% responsivo do My Box PDV,
usando dados mockados e cobrindo os modulos e fluxos descritos em
`docs/prompt-figma-prototipo-my-box-pdv.md`.

## Escopo desta etapa

- fundacao React, TypeScript e Vite;
- login de mercado e acesso APP_ADMIN para demonstracao;
- shell responsivo com navegacao desktop e mobile;
- dashboard operacional;
- PDV com carrinhos, produtos, item manual, ajuste de preco e pagamento;
- vendas, caixa, estoque e movimentacoes;
- financeiro, firmas e contas;
- clientes, fiado e pagamentos;
- relatorios, backups, administracao e minha conta;
- estados de vazio, alerta, confirmacao e feedback;
- dados locais sem integracao com backend.

## Direcao visual

O prototipo representa um balcao de mercadinho em operacao: rapido, confiavel e
organizado. A interface usa fundo de papel fiscal, tinta grafite, verde de
comercio como acento principal, azul de recibo para informacao, amarelo de
etiqueta para avisos e vermelho apenas para risco.

A assinatura do produto e o trilho de carrinhos abertos no PDV combinado com a
conversao explicita de apresentacoes para unidade base.

## Estrutura prevista

- `src/data/`: dados mockados consistentes;
- `src/components/`: componentes reutilizaveis e shell;
- `src/pages/`: telas por modulo;
- `src/styles.css`: tokens e responsividade;
- `src/App.tsx`: sessao de demonstracao e roteamento local.

## Validacao

- instalar dependencias;
- executar build e verificacao TypeScript;
- iniciar o servidor local;
- testar navegacao e fluxos principais;
- inspecionar desktop (1440 px), tablet (768 px) e mobile (390 px);
- corrigir overflow, sobreposicao, alvos de toque e legibilidade.

## Limitacoes conscientes

- dados nao persistem apos recarregar a pagina;
- autenticacao, pagamentos, leitura de codigo de barras e backups sao simulados;
- graficos usam dados locais e nao representam integracao em tempo real;
- nenhuma regra de negocio deste prototipo substitui validacao futura no backend.

