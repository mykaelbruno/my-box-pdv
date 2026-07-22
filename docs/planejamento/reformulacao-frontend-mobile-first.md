# Reformulacao do frontend mobile-first

## Objetivo

Reorganizar o prototipo para funcionar primeiro como ferramenta diaria de
balcao em celulares. A experiencia em desktop continua disponivel para tarefas
com maior densidade de informacao, como estoque, relatorios e dashboards.

## Publico e contexto de uso

- usuarios com pouca familiaridade com sistemas de gestao;
- faixa etaria predominante entre 40 e 50 anos;
- uso frequente com visao reduzida, pressa e interrupcoes no balcao;
- celular como dispositivo principal;
- computador como apoio para consultas e analises detalhadas.

## Direcao de interface

- preservar a identidade visual, tipografia e cores semanticas atuais;
- usar as referencias recebidas apenas para hierarquia, distribuicao e escala;
- transformar o inicio em uma central de tarefas, nao em um dashboard analitico;
- dar destaque maximo para `Nova venda`;
- apresentar atalhos grandes para fiado, estoque, consulta de produto, caixa,
  despesas e vendas do dia;
- usar cards tocaveis, rotulos diretos e iconografia acompanhada de texto;
- manter indicadores e analises como conteudo secundario.

## Regras de usabilidade e acessibilidade

- alvos de toque com pelo menos 48 px, preferencialmente entre 52 e 56 px nas
  acoes principais;
- textos de formulario com pelo menos 16 px no mobile, evitando zoom automatico
  do navegador;
- contraste suficiente e estados de foco visiveis;
- nao depender apenas de cor ou icone para comunicar uma acao;
- evitar textos tecnicos e reduzir a quantidade de decisoes por tela;
- preservar a posicao de acoes recorrentes;
- modais centralizados no desktop e apresentados como painel inferior no
  mobile, respeitando a area segura do dispositivo;
- valores monetarios devem aceitar digitacao direta com virgula ou ponto.

## Escopo desta etapa

1. Navegacao principal e barra inferior mobile.
2. Tela inicial orientada a tarefas e atalhos.
3. Ajustes de escala e ergonomia do PDV em telas pequenas.
4. Correcao de alinhamento dos modais.
5. Correcao do campo monetario de ajuste de preco.
6. Regras globais de tamanho, espacamento e legibilidade para as demais telas.
7. Identificacao opcional de carrinhos por cliente cadastrado ou apelido livre.
8. Preenchimento automatico do cliente no fiado quando o carrinho estiver
   vinculado a um cadastro.
9. Login mobile em coluna unica, sem largura minima ou conteudo promocional
   impedindo o acesso ao formulario.
10. Topbar mobile restrita a tela inicial, mantendo navegacao e saida no menu.
11. PDV mobile com rolagem unica da pagina, faixa de carrinhos no fluxo normal,
    busca fixa dentro da area de itens e resumo ao final do conteudo.
12. Resumo mobile com subtotal, ajustes, total e regra de atualizacao do estoque.
13. `Vender` como acao central e destacada na navegacao inferior mobile.
14. Abertura do PDV sem foco automatico no campo de busca ou teclado virtual.
15. Estoque com atalhos funcionais em carrossel e produtos em linhas compactas.
16. Fiado com dois atalhos iniciais e indicadores reunidos em modal de resumo.
17. Leitor de codigo de barras e QR Code por camera no PDV e no estoque, com
   fallback para digitacao manual.
18. Cadastro e edicao de produtos, estoque minimo e apresentacoes comerciais
   dentro do estado mockado do prototipo.
19. Drawer de produto limitado entre topbar e navegacao inferior no mobile.
20. Topbar mobile compacta e persistente em todas as telas autenticadas.
21. Grupo lateral renomeado para `Gestao`, mantendo um item explicito para o
   modulo `Financeiro`.
22. Fechamento de caixa somente informativo, com totais por Dinheiro, Pix,
   Cartao, Fiado e total geral.
23. Modal funcional para registro de venda posterior no modulo de vendas.
24. PDV mobile compacto, priorizando lista de itens e mantendo carrinho ativo,
    nova venda e busca acessiveis durante a rolagem ate a finalizacao.
25. Finalizacao com pagamento simples ou combinacao de quaisquer dois meios
    distintos entre Dinheiro, Pix, Cartao e Fiado.
26. Modais mobile com rolagem interna isolada e bloqueio do conteudo ao fundo.
27. Campos numericos editaveis sem conversao destrutiva durante a digitacao.
28. Resumo do caixa atual na tela inicial, oculto quando nao houver caixa aberto.
29. Cabecalho da tela inicial em uma unica faixa mobile, com saudacao e estado
    do caixa lado a lado.
30. Cadastro de produto reorganizado em pares de campos no mobile, preservando
    largura total para nome, estoque, custo e codigo de barras.
31. Quantidades base e conversoes com inteiros para `UN` e ate duas casas
    decimais para `KG`.
32. Faixa de carrinhos do PDV iniciando por `Nova venda`, seguida dos carrinhos
    do mais recente para o mais antigo, com ajustes de preco junto ao valor.
33. Atalhos iniciais mobile agrupados sob `Setores` e nomeados pelos modulos de
    destino: Fiado, Consulta de preco, Estoque, Vendas, Caixa e Financeiro.
34. Consulta de preco desacoplada da navegacao do Estoque, com busca por nome,
    categoria ou codigo, leitura pela camera e resumo do produto em modal.
35. Resumo de caixa mobile reduzido aos indicadores `Vendas` e `Total recebido`,
    preservando os quatro indicadores na visualizacao desktop.
36. Pendencias removidas da tela inicial e reunidas em `Avisos e pendencias` no
    sino de notificacoes, preservando os atalhos para os modulos relacionados.
37. Ordem dos carrinhos do PDV mantida fixa durante a selecao e organizada do
    mais recente para o mais antigo; somente o estado visual identifica o ativo.

## Decisoes desta etapa

- a referencia a `PDF` foi interpretada como `PDV`, pois o fluxo descrito e o
  botao de codigo de barras existente pertencem ao ponto de venda;
- o scanner deve usar uma biblioteca mantida para decodificacao de QR Code,
  EAN, UPC e Code 128, sem implementar um decodificador proprio;
- acesso a camera depende de permissao do navegador e de contexto seguro
  (`HTTPS` ou `localhost`);
- quando a camera nao estiver disponivel ou a permissao for negada, o operador
  deve conseguir informar o codigo manualmente;
- as edicoes continuam locais e mockadas ate existir contrato de API e backend.
- em pagamentos combinados, os dois valores devem ser positivos, usar meios
  diferentes e somar exatamente o total da venda;
- quando uma das partes for Fiado, a outra representa a entrada e o cliente e
  obrigatorio para registrar o saldo restante.

Nao fazem parte desta etapa mudancas de regra de negocio, integracao com backend
ou implementacao de novos modulos funcionais.

## Comportamento responsivo

- ate 720 px: navegacao inferior fixa, conteudo em uma coluna, atalhos em duas
  colunas quando houver espaco e acoes principais em largura total;
- entre 721 px e 1080 px: composicao intermediaria com cards maiores e menor
  densidade;
- acima de 1080 px: sidebar e maior densidade para consultas, sem reduzir os
  controles principais a alvos pequenos.

## Validacao prevista

- `npm run typecheck`;
- `npm run build`;
- verificacao visual da tela inicial, PDV e modais em viewport mobile;
- verificacao visual da navegacao e composicao em desktop;
- teste manual de digitacao do valor de ajuste com inteiros e centavos.

## Criterios de aceite

- a tela inicial permite iniciar as tarefas mais frequentes sem procurar em
  menus profundos;
- `Nova venda` e a acao visualmente dominante;
- rotulos e botoes permanecem legiveis e tocaveis no celular;
- os modais ficam alinhados ao viewport em desktop e mobile;
- o ajuste de preco aceita digitacao direta, inclusive `10`, `10,50` e `10.50`;
- carrinhos sem identificacao exibem somente o codigo;
- carrinhos identificados exibem o nome em destaque e o codigo como metadado;
- o fiado exige um cliente e reutiliza o cadastro vinculado ao carrinho;
- o login permanece utilizavel a partir de 320 px sem rolagem horizontal;
- a tela do PDV usa uma unica rolagem vertical, sem area interna de scroll para
  a lista de itens;
- a faixa de carrinhos acompanha a rolagem e somente a busca permanece fixa,
  limitada a area dos itens;
- o box de itens cresce conforme o conteudo, sem altura minima ou vazio antes
  do resumo;
- o resumo e a finalizacao aparecem ao final do conteudo da venda;
- subtotal, ajustes e descontos permanecem visiveis no mobile;
- `Vender` ocupa o centro da barra inferior e possui destaque de acao primaria;
- o PDV abre sem selecionar automaticamente o campo de busca;
- produtos do estoque usam linhas de 92 px sem overflow horizontal a partir de
  320 px;
- os atalhos de estoque permitem cadastrar, consultar por codigo e movimentar;
- o resumo do fiado abre sob demanda e nao ocupa espaco permanente na tela;
- o leitor abre a camera traseira, encerra o stream ao fechar e preenche o
  codigo detectado no fluxo de origem;
- cadastro e edicao permitem alterar apresentacoes e seus codigos de barras;
- a navegacao inferior permanece acessivel durante a consulta do produto;
- o fechamento do caixa nao solicita dinheiro contado nem diferenca manual;
- a finalizacao permite combinar quaisquer dois meios de pagamento distintos;
- combinacoes com Fiado identificam a entrada, o saldo fiado e exigem cliente;
- modais permitem percorrer todo o conteudo sem movimentar a pagina de origem;
- campos de quantidade e valores aceitam apagar, substituir e informar centavos;
- o resumo da tela inicial usa o mesmo estado do modulo Caixa e abre esse modulo
  pelo botao de detalhes;
- a tela financeira possui novamente um item proprio na navegacao lateral;
- a topbar mobile orienta a tela atual sem ocupar mais de 56 px;
- a saudacao e o estado do caixa dividem a primeira faixa da tela inicial sem
  criar uma segunda linha de card;
- o atalho `Nova venda` usa composicao horizontal compacta no mobile e preserva
  titulo, descricao e quantidade de carrinhos em andamento;
- os atalhos abaixo de `Setores` usam nomes de modulos, ordem previsivel e
  descricoes curtas de seu conteudo;
- `Consulta de preco` abre sobre a tela inicial, retorna a apresentacao
  correspondente ao codigo e permite nova consulta sem trocar de modulo;
- o resumo de caixa mobile ocupa uma faixa compacta, com somente os dois dados
  essenciais e acesso direto aos detalhes do modulo Caixa;
- avisos operacionais ficam fora da tela inicial e podem ser consultados pelo
  sino em qualquer tela autenticada;
- campos de estoque minimo e conversao rejeitam fracionamento em `UN` e aceitam
  duas casas decimais em `KG`;
- `Nova venda` permanece visivel antes dos carrinhos, que seguem do mais recente
  para o mais antigo mesmo quando outro carrinho e selecionado;
- descontos e acrescimos aparecem como etiquetas legiveis junto ao preco do item;
- a identidade visual atual permanece reconhecivel;
- build e verificacao de tipos concluem sem erros.
