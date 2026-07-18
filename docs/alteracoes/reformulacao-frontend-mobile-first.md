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
- topbar mobile compacta, persistente e identificando a tela atual;
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
- leitor real de codigo de barras e QR Code adicionado com `@zxing/browser`,
  camera traseira preferencial e fallback manual;
- scanner integrado ao PDV, consulta de estoque, cadastro e edicao das
  apresentacoes do produto;
- catalogo mockado transformado em estado editavel para permitir alterar dados,
  estoque minimo e apresentacoes;
- detalhe de produto limitado entre topbar e barra inferior, mantendo a
  navegacao mobile acessivel;
- `Gestao` adotado como nome do grupo financeiro e item `Financeiro` restaurado;
- venda posterior implementada com data, horario, cliente, pagamento, itens e
  valor, incluindo o novo registro na listagem local;
- fechamento de caixa simplificado para somatorios de Dinheiro, Pix, Cartao e
  Fiado, com total geral e sem conferencia manual de dinheiro;
- biblioteca do scanner carregada sob demanda para preservar o pacote inicial.
- PDV mobile recomposto conforme o rascunho operacional, com carrinho ativo e
  `Nova venda` na primeira faixa, busca compacta e lista como area principal;
- itens da venda simplificados no mobile, mantendo quantidade, ajuste, exclusao,
  preco unitario e total sem elementos decorativos;
- resumo da venda reduzido para 150 px e mantido fixo acima da navegacao,
  inclusive em telas de 320 x 720.

## Arquivos principais

- `frontend/src/pages/DashboardPage.tsx`;
- `frontend/src/pages/PdvPage.tsx`;
- `frontend/src/pages/InventoryPage.tsx`;
- `frontend/src/pages/CustomersPage.tsx`;
- `frontend/src/pages/SalesCashPages.tsx`;
- `frontend/src/components/AppShell.tsx`;
- `frontend/src/components/BarcodeScanner.tsx`;
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
- abertura do scanner no PDV e em apresentacoes de produto;
- retorno do codigo para apresentacao, consulta e selecao correta no PDV;
- edicao do estoque minimo e salvamento no catalogo local;
- permanencia da topbar e navegacao inferior durante o detalhe do produto;
- acesso ao modulo Financeiro pelo item do grupo `Gestao`;
- registro de venda posterior e exibicao imediata na listagem;
- fechamento sem inputs, com os quatro meios e total de `R$ 3.095,90`;
- `npm audit` executado durante a instalacao, sem vulnerabilidades encontradas;
- bundle inicial reduzido para aproximadamente 341 kB com scanner em chunk
  separado de aproximadamente 458 kB.
- verificacao visual do novo PDV em 390 x 844 e 320 x 720, incluindo faixa de
  carrinhos, lista, resumo, total e navegacao inferior.

## Limitacoes

- os dados e comportamentos continuam mockados e sem persistencia;
- nao existe integracao com backend nesta etapa;
- acesso a camera exige permissao e contexto seguro (`HTTPS` ou `localhost`);
- o ambiente de validacao nao possui camera fisica; inicializacao do leitor,
  estados, encerramento e retorno manual foram testados, mas a decodificacao de
  uma imagem real deve ser conferida em um celular;
- a captura de imagem em desktop do navegador de validacao apresentou artefato
  de repeticao apos o redimensionamento, embora as dimensoes do DOM tenham sido
  verificadas sem overflow.
