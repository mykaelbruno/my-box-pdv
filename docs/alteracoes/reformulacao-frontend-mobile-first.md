# Reformulacao do frontend mobile-first

## Entrega

O prototipo foi reorganizado para priorizar o uso diario no celular por
operadores de mercado com pouca familiaridade com sistemas de gestao.

## Alteracoes principais

- tela inicial substituida por uma central de tarefas de balcao;
- `Nova venda` transformada na acao visual principal;
- atalhos grandes para fiado, estoque, consulta, despesa, vendas e caixa;
- navegacao mobile organizada como `Inicio`, `Estoque`, `Vender`, `Fiado` e
  `Mais`, com `Vender` elevado e destacado no centro;
- botoes, campos, rotulos, tabelas responsivas e alvos de toque ampliados;
- PDV mobile com busca, carrinhos, itens e resumo de venda mais legiveis;
- modais centralizados no desktop e apresentados como painel inferior no
  mobile;
- campo de ajuste de preco alterado para aceitar digitacao monetaria direta com
  virgula ou ponto;
- criacao de carrinho com identificacao opcional por cliente cadastrado ou
  apelido livre;
- nome do carrinho exibido em destaque, mantendo o codigo em tamanho secundario;
- cliente cadastrado do carrinho reaproveitado automaticamente no pagamento
  fiado;
- pagamento fiado sem cliente vinculado exige selecao explicita;
- cards de carrinho separados no mobile e carrinho ativo mantido visivel na
  faixa horizontal;
- login mobile reorganizado em coluna unica e validado em 320 e 390 px;
- topbar removida das telas operacionais no mobile e mantida na Home;
- acao de sair adicionada ao rodape do menu lateral;
- PDV mobile limitado ao viewport, com scroll vertical somente em produtos e
  itens;
- resumo mobile ampliado com subtotal, ajustes, total e atualizacao de estoque;
- preco unitario e ajuste por item restaurados na visualizacao mobile;
- indicadores analiticos movidos para uma area secundaria da tela inicial.
- foco automatico removido da busca do PDV para evitar abertura involuntaria do
  teclado virtual;
- cards informativos do estoque substituidos por atalhos para novo produto,
  consulta por codigo de barras e movimentacao;
- produtos do estoque condensados em linhas estaveis de 92 px no mobile;
- resumo permanente do fiado substituido por `Novo cliente` e `Informacoes`;
- modal do fiado adicionado com clientes, vendas registradas, dividas, valores
  em aberto e valores recebidos;
- largura minima global neutralizada no breakpoint mobile para evitar overflow
  em telas de 320 px.

## Arquivos principais

- `frontend/src/pages/DashboardPage.tsx`;
- `frontend/src/pages/PdvPage.tsx`;
- `frontend/src/pages/InventoryPage.tsx`;
- `frontend/src/pages/CustomersPage.tsx`;
- `frontend/src/components/AppShell.tsx`;
- `frontend/src/styles.css`;
- `docs/planejamento/reformulacao-frontend-mobile-first.md`.

## Validacoes executadas

- `npm run typecheck`;
- `npm run build`;
- inspecao visual mobile em 390 x 844;
- verificacao de ausencia de overflow horizontal;
- navegacao da tela inicial para o PDV;
- abertura e alinhamento do modal de ajuste no mobile;
- digitacao dos valores `10,50` e `10.50` no ajuste de preco;
- verificacao das dimensoes do layout em desktop.
- verificacao visual de Estoque, Fiado e PDV em 390 x 844;
- verificacao de Estoque e barra inferior em 320 x 720;
- confirmacao de que o campo de busca do PDV nao recebe foco na abertura;
- abertura e conferencia do modal de informacoes do fiado;
- verificacao de ausencia de erros no console durante os fluxos testados.

## Limitacoes

- os dados e comportamentos continuam mockados e sem persistencia;
- nao existe integracao com backend nesta etapa;
- a consulta por codigo de barras usa um codigo mockado para demonstrar o fluxo;
- a captura de imagem em desktop do navegador de validacao apresentou artefato
  de repeticao apos o redimensionamento, embora as dimensoes do DOM tenham sido
  verificadas sem overflow.
