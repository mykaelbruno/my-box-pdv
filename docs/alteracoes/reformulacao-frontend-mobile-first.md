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
- PDV mobile com scroll vertical da pagina inteira, sem rolagem interna na lista
  de produtos ou itens;
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
- resumo da venda reduzido para 150 px e posicionado ao final da pagina, liberando
  espaco de trabalho enquanto os itens sao adicionados;
- faixa de carrinhos solta no fluxo da pagina e somente a busca mantida fixa
  dentro do box de itens durante a rolagem mobile;
- altura minima removida do box de itens, que agora cresce de acordo com a
  quantidade de produtos e encosta naturalmente no resumo;
- finalizacao generalizada para combinar quaisquer dois meios distintos entre
  Dinheiro, Pix, Cartao e Fiado;
- divisao calculada em centavos, com a primeira parcela preenchendo
  automaticamente o valor restante e bloqueio de parcelas zeradas;
- combinacoes com Fiado exibem entrada e saldo da divida separadamente e exigem
  um cliente antes da confirmacao.
- modais movidos para um portal no corpo da pagina, com bloqueio do documento e
  rolagem restrita ao conteudo interno;
- campos de quantidade e valores substituidos por um controle que aceita apagar,
  digitar com virgula ou ponto e concluir casas decimais sem travar;
- quantidade do item manual conectada ao item efetivamente adicionado ao PDV;
- `Como esta o dia` substituido por `Resumo de caixa`, sem rotulo auxiliar nem
  comparacoes com o dia anterior;
- resumo da home alimentado pelo caixa atual, ocultado ao fechar e restaurado ao
  reabrir o caixa;
- `Ver detalhes` do resumo direcionado ao modulo Caixa.
- cabecalho inicial mobile compactado em uma unica faixa, mantendo a saudacao e
  o estado atual do caixa visiveis lado a lado;
- `Nova venda` compactada em um card horizontal mobile, com icone e texto na
  primeira faixa e carrinhos em andamento no rodape;
- cadastro de produto mobile reorganizado conforme o rascunho, com campos
  relacionados lado a lado e informacoes longas em largura total;
- estoque minimo e conversao das apresentacoes limitados a inteiros para `UN`,
  com duas casas decimais liberadas para `KG`;
- `Nova venda` movida para o inicio da faixa, seguida pelos carrinhos do mais
  recente para o mais antigo;
- descontos e acrescimos apresentados como etiquetas junto ao preco unitario,
  incluindo o exemplo mockado de `R$ 2,00` no Oleo de Soja.
- atalho `Consulta de preco` desacoplado do Estoque e transformado em modal de
  busca por nome, categoria ou codigo de barras;
- leitor por camera integrado ao atalho, retornando diretamente a apresentacao
  reconhecida e seu preco;
- resumo consultivo adicionado com preco em destaque, estoque, unidade base,
  codigo e troca entre apresentacoes comerciais.
- resumo de caixa mobile compactado em uma unica faixa com `Vendas` e
  `Total recebido`, mantendo os indicadores completos no desktop.
- `Pendencias de hoje` removida da Home e transferida para o sino da topbar como
  painel `Avisos e pendencias`, mantendo os tres atalhos funcionais.
- selecao de carrinhos no PDV alterada para preservar ordem e largura, usando
  apenas fundo e borda para indicar o ativo; novos carrinhos aparecem primeiro.

## Arquivos principais

- `frontend/src/pages/DashboardPage.tsx`;
- `frontend/src/pages/PdvPage.tsx`;
- `frontend/src/pages/InventoryPage.tsx`;
- `frontend/src/pages/CustomersPage.tsx`;
- `frontend/src/pages/SalesCashPages.tsx`;
- `frontend/src/components/AppShell.tsx`;
- `frontend/src/components/BarcodeScanner.tsx`;
- `frontend/src/components/PriceLookupModal.tsx`;
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
- validacao de Dinheiro + Pix, Cartao + Pix e Dinheiro + Fiado no modal mobile;
- confirmacao de bloqueio do Fiado sem cliente e liberacao apos selecionar Dona
  Maria;
- confirmacao de que as duas parcelas permanecem diferentes de zero e somam o
  total da venda.
- modal longo validado em 390 x 844 com 1161 px de conteudo, scroll interno em
  302 px e pagina de fundo mantida na posicao 0;
- modal de movimentacao validado em 320 x 720, com area interna rolavel e fundo
  bloqueado;
- digitacao de `10,50` em quantidade e `350,50` em valor inicial, preservando os
  valores durante e depois da perda de foco;
- item manual validado com quantidade `3` e preco `12.50`, normalizado para
  `12,50` e adicionado ao carrinho com total de `R$ 37,50`;
- fechamento do caixa removeu o resumo da home e a reabertura voltou a exibi-lo;
- botao `Ver detalhes` confirmado navegando para Caixa.
- tela inicial validada em 390 x 844, sem overflow e com saudacao e caixa na
  mesma faixa;
- card `Nova venda` validado em 320 x 720 com 112 px de altura, composicao
  horizontal e sem overflow;
- PDV validado em 390 x 844 e 320 x 720 com `Nova venda`, carrinho ativo e
  demais carrinhos nessa ordem, total de `R$ 20,90` e desconto visivel;
- cadastro de produto validado em 320 x 720, incluindo pares de campos, rolagem
  interna, inteiro em `UN`, decimal em `KG` e arredondamento ao retornar para
  `UN`.
- nova rolagem do PDV validada em 390 x 844 e 320 x 720, sem scroll interno na
  lista e sem overflow horizontal;
- faixa de carrinhos confirmada no fluxo da pagina e busca validada como unico
  elemento fixo dentro do box de itens;
- box com dois itens validado sem altura minima, mantendo apenas 8 px ate o
  resumo da venda;
- avisos temporarios padronizados com fechamento automatico em quatro segundos
  e indicador regressivo na borda inferior, preservando o fechamento manual;
- atalhos da tela inicial mobile renomeados para os setores de destino e
  separados do card `Nova venda` por um subtitulo com divisor;
- secao `Setores` e os seis atalhos validados em 320 x 720, sem texto cortado
  ou overflow horizontal; no desktop, o divisor permanece oculto;
- consulta por `Arroz` validada em 320 x 720, incluindo resumo e troca para a
  apresentacao `Fardo 10 kg` por `R$ 59,00`;
- codigo `789100003012` validado pelo fluxo do leitor, retornando `Oleo de Soja`,
  `Caixa com 12` e `R$ 102,00`, sem navegar para o Estoque;
- resumo de caixa validado em 320 x 720 com 128 px de altura, dois indicadores
  e sem overflow; os quatro indicadores permanecem visiveis no desktop;
- painel `Avisos e pendencias` validado em 320 x 720 e 1280 x 800, sem overflow;
  os tres avisos direcionam respectivamente para Estoque, Financeiro e Fiado;
- selecao do carrinho `#1048` validada em 320 x 720: a ordem permaneceu
  `Nova venda`, `#1049`, `#1048` e ambos mantiveram largura de 174 px;
- criacao do carrinho `#1050` validada na primeira posicao da lista, seguida por
  `#1049` e `#1048`, sem erros no console;
- temporizador do aviso validado no PDV: linha em progresso apos dois segundos
  e componente removido ao completar quatro segundos;
- abertura da finalizacao testada depois da rolagem e console validado sem erros.

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
