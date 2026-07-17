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
- a identidade visual atual permanece reconhecivel;
- build e verificacao de tipos concluem sem erros.
