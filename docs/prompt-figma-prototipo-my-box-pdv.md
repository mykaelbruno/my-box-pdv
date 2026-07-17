# Prompt para Figma - Prototipo My Box PDV

Use este prompt no Figma para gerar um prototipo navegavel e avaliavel da
interface do sistema My Box PDV.

## Prompt principal

Crie um prototipo de alta fidelidade para uma aplicacao web chamada **My Box PDV**.

O produto e um sistema de ponto de venda e gestao para pequenos mercadinhos,
mercearias e comercios familiares. A interface deve ser operacional, rapida,
clara e confiavel, feita para uso diario no balcao, controle de estoque,
financeiro, fiado e administracao de acesso.

Nao crie uma landing page. A primeira tela apos login deve ser uma area real do
sistema. O visual deve ser moderno, limpo e profissional, mas sem parecer
marketing. Priorize densidade organizada, leitura rapida, tabelas claras,
atalhos de operacao e fluxos eficientes.

## Objetivo do prototipo

Gerar telas suficientes para testar e avaliar:

- fluxo de login;
- visao geral do sistema;
- venda no PDV;
- multiplos carrinhos em aberto;
- busca por produto e codigo de barras;
- selecao de apresentacao do produto;
- item manual fora do estoque;
- desconto e acrescimo por item;
- pagamentos em dinheiro, Pix, cartao e fiado;
- abertura e fechamento de caixa;
- estoque com produtos, apresentacoes e movimentacoes;
- alerta de estoque baixo;
- cadastro e edicao de produtos;
- dashboard financeiro em tempo real;
- controle de firmas/CNPJs;
- contas financeiras, boletos, notas e despesas;
- margem de produtos;
- crediario/fiado com clientes, dividas, pagamentos e historico;
- administracao global de mercadinhos;
- conta do mercadinho e perfil;
- backup/exportacao para leitura manual.

## Estilo visual

Use uma identidade visual propria para o My Box PDV:

- interface clara por padrao;
- fundo principal quase branco, com areas de trabalho bem separadas;
- menu lateral fixo em desktop;
- barra superior com mercado atual, usuario, status do caixa e busca rapida;
- botoes de acao bem visiveis;
- tipografia legivel em telas de trabalho;
- tabelas compactas, com filtros no topo;
- formularios organizados em secoes;
- indicadores financeiros e operacionais com cards discretos;
- estados de alerta usando cores sem exagero;
- foco em acessibilidade, contraste e tamanhos confortaveis.

Sugestao de paleta:

- azul petroleo ou verde escuro para navegacao e confianca;
- verde para sucesso/recebido/pago;
- amarelo ou laranja para aviso/estoque baixo/vencimento;
- vermelho para cancelado, vencido, erro e risco;
- cinza neutro para estrutura, bordas e textos auxiliares.

Evite visual infantil, excesso de gradientes, cards decorativos demais,
ilustracoes grandes e telas vazias.

## Estrutura geral da aplicacao

Crie uma navegacao principal com estes modulos:

- Dashboard;
- PDV;
- Vendas;
- Caixa;
- Estoque;
- Clientes / Fiado;
- Financeiro;
- Firmas;
- Relatorios;
- Backups;
- Administracao;
- Minha conta.

Para contas do tipo **APP_ADMIN**, mostrar uma area administrativa global com:

- Dashboard global simples;
- Mercadinhos;
- Administradores;
- Configuracoes.

Para contas do tipo **MERCADO**, mostrar apenas os dados do proprio mercadinho.

O cadastro publico de mercadinhos deve parecer desativado na V1. O fluxo correto
e: APP_ADMIN cria mercadinhos e contas de acesso. Cada mercadinho possui uma
conta compartilhada para a equipe/familia.

## Responsividade obrigatoria

O prototipo deve ser **100% responsivo**, com versoes pensadas para desktop,
tablet e mobile. Nao basta apenas reduzir a tela desktop; reorganize navegacao,
tabelas, formularios, cards e fluxos para que sejam realmente usaveis em celular.

Crie frames e variantes responsivas para os principais breakpoints:

- desktop: 1440 px ou similar;
- tablet: 768 px ou similar;
- mobile: 390 px ou similar.

Todas as telas principais devem ter comportamento mobile definido:

- login;
- dashboard;
- PDV;
- vendas;
- caixa;
- estoque;
- detalhe/cadastro de produto;
- movimentacao de estoque;
- financeiro;
- firmas;
- contas financeiras;
- clientes/fiado;
- detalhe da divida;
- pagamento de fiado;
- backups;
- administracao;
- minha conta.

No desktop, priorize operacao rapida e visao ampla:

- PDV com colunas;
- tabelas densas;
- filtros laterais ou superiores;
- resumo sempre visivel;
- atalhos de teclado sugeridos visualmente quando fizer sentido.

No tablet, mantenha a operacao completa, mas com paineis empilhados ou abas:

- PDV com carrinho, itens e pagamento em secoes alternaveis;
- tabelas convertidas em listas com colunas essenciais;
- filtros em drawer ou painel recolhivel.

No mobile, a experiencia deve continuar funcional:

- menu lateral vira menu inferior ou drawer;
- tabelas viram cards/listas escaneaveis;
- filtros ficam em bottom sheet ou drawer;
- acoes principais ficam fixas no rodape quando necessario;
- formularios ficam em uma coluna;
- modais complexos viram telas ou bottom sheets;
- totais importantes do PDV e financeiro permanecem sempre visiveis;
- botoes devem ter area de toque confortavel;
- textos nao devem quebrar de forma estranha nem sair dos componentes.

No mobile, cobrir especialmente:

- consulta rapida de produto;
- abertura de PDV;
- visualizacao e edicao do carrinho;
- finalizacao de venda;
- consulta de estoque;
- visualizacao de dashboard;
- consulta de fiado;
- registro simples de pagamento;
- visualizacao de contas vencidas;
- perfil/minha conta.

Inclua exemplos visuais dos estados mobile para menus, tabelas, filtros,
formularios, modais, drawers, bottom sheets, cards de resumo e acoes fixas.

## Etapa 1 - Login, shell e dashboard

Crie as telas:

1. **Login**
   - Campo "Usuario ou e-mail".
   - Campo "Senha".
   - Botao "Entrar".
   - Link "Esqueci minha senha" como estado futuro, sem dar destaque.
   - Mensagem de erro generica: "Usuario ou senha invalidos".
   - Sem cadastro publico.

2. **Dashboard do mercado**
   - Resumo do dia em tempo real.
   - Vendas finalizadas hoje.
   - Valor recebido.
   - Valor em fiado.
   - Contas em aberto.
   - Estoque baixo.
   - Caixa atual: aberto/fechado.
   - Atalhos: "Abrir PDV", "Nova entrada de estoque", "Registrar despesa",
     "Receber fiado".
   - Grafico simples por forma de pagamento: dinheiro, Pix, cartao, fiado.
   - Lista de alertas: produtos abaixo do minimo, contas vencidas, dividas em
     atraso, backup mais recente.

3. **App shell**
   - Menu lateral.
   - Barra superior.
   - Breadcrumb ou titulo da pagina.
   - Busca rapida global.
   - Area de notificacoes.
   - Identificacao do mercado logado.

## Etapa 2 - PDV e vendas

Crie um fluxo de PDV otimizado para uso no balcao.

### Tela principal do PDV

Layout sugerido:

- Coluna esquerda: carrinhos/vendas em aberto.
- Centro: busca de produto, leitura de codigo de barras e lista de itens.
- Coluna direita: resumo da venda, totais e pagamento.

Elementos obrigatorios:

- Botao "Nova venda".
- Lista de carrinhos em aberto com identificador, horario, operador e total.
- Campo grande "Buscar produto ou ler codigo de barras".
- Resultado de busca com nome, categoria, estoque disponivel e apresentacoes.
- Ao selecionar produto, permitir escolher apresentacao:
  - exemplo: "1 kg", "Fardo pequeno 10 kg", "Fardo grande 30 kg";
  - mostrar preco de cada apresentacao;
  - mostrar fator de conversao para unidade base.
- Campo quantidade.
- Calculo automatico:
  - quantidade da apresentacao;
  - quantidade convertida para unidade base;
  - preco unitario;
  - subtotal.
- Lista de itens do carrinho.
- Cada item deve mostrar:
  - produto;
  - apresentacao;
  - quantidade;
  - preco original;
  - desconto/acrescimo;
  - total;
  - acao remover;
  - acao editar.
- Botao "Adicionar item manual".
- Botao "Cancelar venda".
- Botao "Finalizar".

### Modal de item manual

Campos:

- Nome do item.
- Quantidade.
- Preco unitario.
- Observacao opcional.

Regras visuais:

- Deixar claro que item manual nao baixa estoque.
- Mostrar badge "Manual".

### Modal de desconto/acrescimo

Campos:

- Tipo: desconto ou acrescimo.
- Valor em R$ ou percentual.
- Motivo.
- Preco original.
- Preco praticado.
- Total recalculado.

### Finalizacao da venda

Criar modal/tela de pagamento com:

- Total da venda.
- Formas de pagamento:
  - Dinheiro;
  - Pix;
  - Cartao;
  - Fiado.
- Permitir multiplas formas combinadas.
- Para dinheiro:
  - valor recebido;
  - troco automatico.
- Para Pix:
  - status "aguardando confirmacao manual";
  - botao "Marcar como recebido".
- Para cartao:
  - status "maquininha";
  - botao "Marcar como pago".
- Para fiado:
  - selecionar cliente;
  - cadastrar cliente rapido exigindo apenas nome;
  - observacao da divida.
- Validar visualmente que soma dos pagamentos fecha o total, exceto quando houver
  fiado pendente.

### Venda posterior

Crie tela ou modal para cadastrar venda posterior:

- Data/hora real da venda.
- Itens vendidos.
- Forma de pagamento.
- Observacao.
- Aviso: vendas posteriores nao entram no caixa fechado anteriormente, salvo
  regra futura.

### Historico de vendas

Tela com:

- Filtros por periodo, numero, operador, cliente e status.
- Lista de vendas.
- Status: em andamento, finalizada, cancelada.
- Detalhe da venda com itens, pagamentos, operador e observacoes.
- Para venda finalizada, nao permitir editar itens/valores; permitir apenas
  observacao se habilitado.
- Acao de cancelar/extornar preservando historico.

## Etapa 3 - Caixa

Crie telas para:

1. **Abertura de caixa**
   - Valor inicial.
   - Operador.
   - Data/hora automatica.
   - Observacao.

2. **Resumo do caixa aberto**
   - Status aberto.
   - Horario de abertura.
   - Vendas finalizadas no intervalo.
   - Quantidade de clientes/vendas.
   - Total vendido.
   - Total recebido.
   - Separacao por dinheiro, Pix, cartao e fiado.
   - Lista de ultimas vendas.
   - Atualizacao em tempo real sem precisar fechar.

3. **Fechamento de caixa**
   - Resumo esperado por forma de pagamento.
   - Campo para valor conferido em dinheiro.
   - Diferenca encontrada.
   - Observacao de fechamento.
   - Botao "Fechar caixa".

4. **Historico de caixas**
   - Filtros por periodo e operador.
   - Detalhe de caixa fechado.

## Etapa 4 - Estoque

Crie telas para controle de produtos com unidade base e multiplas apresentacoes.

### Lista de produtos

Elementos:

- Busca por nome ou codigo de barras.
- Filtros por categoria, status, estoque baixo, unidade base.
- Tabela com:
  - nome;
  - categoria;
  - unidade base;
  - estoque base;
  - visualizacao convertida;
  - menor preco;
  - status;
  - alerta de estoque baixo.
- Botao "Novo produto".

### Cadastro/edicao de produto

Campos:

- Nome.
- Categoria.
- Unidade base: KG, UN, PAR ou outras.
- Estoque base.
- Preco base opcional.
- Custo para calculo de margem.
- Estoque minimo configuravel.
- Status ativo/inativo.
- Observacao.

Secao de apresentacoes:

- Nome da apresentacao.
- Fator base.
- Preco de venda.
- Codigo de barras opcional.
- Status ativa/inativa.
- Exemplos visuais:
  - 1 kg, fator 1, preco 7,00;
  - Fardo pequeno, fator 10, preco 68,00;
  - Fardo grande, fator 30, preco 195,00.

Mostrar que apresentacoes nao possuem estoque proprio; elas convertem o estoque
base do produto.

### Detalhe do produto

Mostrar:

- dados principais;
- estoque em unidade base;
- apresentacoes comerciais;
- margem por apresentacao;
- historico de movimentacoes;
- ultimas vendas;
- alerta de estoque baixo.

### Movimentacao de estoque

Tela ou modal para:

- Entrada de mercadoria.
- Ajuste manual.
- Perda/avaria.
- Devolucao.
- Consumo interno.

Campos:

- Produto.
- Tipo da movimentacao.
- Apresentacao usada, se houver.
- Quantidade informada.
- Quantidade convertida para unidade base.
- Data/hora.
- Usuario.
- Observacao.

Deixar claro que toda movimentacao converte para unidade base.

## Etapa 5 - Financeiro

Crie um modulo financeiro simples e confiavel.

### Dashboard financeiro

Mostrar:

- resumo diario em tempo real;
- resumo por periodo: hoje, mes, intervalo personalizado;
- vendas finalizadas;
- pagamentos recebidos;
- valores por dinheiro, Pix e cartao;
- valores em fiado;
- contas pagas;
- contas em aberto;
- contas vencidas;
- gastos gerais;
- compras vinculadas a firmas;
- limite disponivel das firmas.

### Firmas/CNPJs

Tela de lista:

- Busca.
- Filtros por ativo/inativo.
- Tabela com nome, CNPJ, responsavel, limite mensal, utilizado no mes,
  disponivel, status.

Formulario de firma:

- Nome.
- CNPJ.
- Responsavel.
- Limite mensal de compras.
- Status.
- Observacao.

Detalhe da firma:

- resumo mensal;
- total comprado no mes;
- total pago;
- total em aberto;
- limite disponivel;
- contas vinculadas;
- aviso quando limite estiver proximo de estourar.

### Contas financeiras

Criar telas para:

- lista de contas;
- nova conta;
- detalhe da conta;
- marcar como paga;
- cancelar conta.

Campos:

- Firma opcional.
- Venda opcional.
- Descricao.
- Tipo: boleto, nota, compra de mercadoria, despesa, outro.
- Valor.
- Data de lancamento.
- Data de vencimento opcional.
- Data de pagamento opcional.
- Status: em aberto, pago, cancelado, vencido.
- Observacao.

Filtros:

- firma;
- mes;
- status;
- tipo;
- vencimento;
- descricao.

Separar visualmente:

- contas pagas;
- contas em aberto;
- contas vencidas.

## Etapa 6 - Crediario / Fiado

Crie modulo para gerenciar clientes, dividas e pagamentos.

### Clientes

Lista com:

- busca por nome, apelido ou telefone;
- status ativo/inativo;
- total em aberto;
- ultimo pagamento;
- quantidade de dividas.

Cadastro rapido de cliente:

- Nome obrigatorio.
- Apelido opcional.
- Telefone opcional.
- Endereco opcional.
- Observacao opcional.

Detalhe do cliente:

- dados cadastrais;
- total em aberto;
- total pago;
- historico de compras fiadas;
- historico de pagamentos;
- dividas pendentes;
- dividas pagas;
- dividas canceladas.

### Dividas de fiado

Cada divida deve estar vinculada a uma venda original e deve permitir visualizar
os produtos comprados.

Tela de lista:

- filtros por cliente, data, status e valor;
- status: pendente, parcialmente paga, paga, cancelada;
- valor original;
- valor pago;
- valor pendente;
- data de criacao.

Detalhe da divida:

- cliente;
- venda original;
- itens da compra;
- valor original;
- valor pago;
- valor pendente;
- status;
- observacao;
- historico de pagamentos;
- acao "Registrar pagamento";
- acao "Editar observacao";
- acao "Cancelar divida".

### Pagamento de fiado

Modal:

- valor pago;
- forma de pagamento: dinheiro, Pix, cartao, outro;
- data do pagamento;
- observacao.

Estados de validacao:

- bloquear pagamento maior que valor pendente;
- bloquear valor menor ou igual a zero;
- bloquear pagamento em divida paga ou cancelada.

Mostrar recalcule automatico de:

- valor pago;
- valor pendente;
- status.

## Etapa 7 - Backups e exportacao

Crie uma tela simples de backups:

- status do backup diario automatico;
- data/hora do ultimo backup;
- botao para exportar relatorio legivel em PDF ou planilha;
- destaque para backup de dividas/fiado;
- historico de exportacoes;
- aviso de que volume/local de armazenamento sera definido tecnicamente depois.

## Etapa 8 - Administracao, mercado e perfil

### Area APP_ADMIN

Criar telas:

- dashboard global simples;
- lista de mercadinhos;
- criar mercadinho;
- editar mercadinho;
- inativar mercadinho;
- criar conta de acesso do mercadinho;
- lista de APP_ADMIN;
- criar novo APP_ADMIN.

Campos de mercado:

- nome;
- CNPJ opcional;
- telefone opcional;
- ativo/inativo;
- data de criacao.

Campos de usuario:

- nome;
- username;
- email;
- senha;
- tipo: APP_ADMIN ou MERCADO;
- ativo/inativo.

### Minha conta / Conta do mercado

Para conta de mercado:

- atualizar nome;
- username;
- email;
- senha;
- dados basicos do mercado;
- avisos de seguranca.

Para APP_ADMIN:

- dados pessoais;
- troca de senha;
- gerenciamento basico de sessao.

## Componentes e estados obrigatorios

Crie componentes reutilizaveis para:

- menu lateral;
- topbar;
- tabela com filtros;
- campo de busca;
- seletor de periodo;
- cards de resumo;
- badges de status;
- modal de confirmacao;
- drawer de detalhe;
- formulario com secoes;
- toast de sucesso/erro;
- empty state;
- loading state;
- erro de permissao;
- alerta de estoque baixo;
- alerta de vencimento;
- alerta de caixa fechado.

Status visuais importantes:

- produto ativo/inativo;
- estoque normal/baixo/zerado;
- venda em andamento/finalizada/cancelada;
- caixa aberto/fechado;
- pagamento pago/pendente;
- conta em aberto/paga/cancelada/vencida;
- divida pendente/parcialmente paga/paga/cancelada;
- mercado ativo/inativo;
- usuario ativo/inativo.

## Dados ficticios para popular o prototipo

Use dados realistas de mercadinho:

- Mercado: Mercadinho Coutinho.
- Usuario mercado: coutinho.
- Produtos:
  - Feijao Carioca, unidade base KG, estoque 300 kg.
  - Arroz Branco, unidade base KG, estoque 180 kg.
  - Oleo de Soja, unidade base UN, estoque 48 unidades.
  - Acucar Cristal, unidade base KG, estoque baixo.
  - Cafe, unidade base UN.
- Apresentacoes:
  - 1 kg;
  - Fardo pequeno 10 kg;
  - Fardo grande 30 kg;
  - Unidade;
  - Caixa com 12 unidades.
- Clientes:
  - Dona Maria;
  - Seu Jose;
  - Ana Paula.
- Firmas:
  - Mercado Compras MEI;
  - Coutinho Alimentos LTDA.
- Contas:
  - boleto de fornecedor;
  - nota de compra de mercadoria;
  - despesa de energia;
  - compra avulsa.

## Fluxos navegaveis obrigatorios

Monte o prototipo com interacoes suficientes para testar:

1. Login como mercado.
2. Abrir dashboard.
3. Abrir PDV.
4. Criar nova venda.
5. Buscar produto por codigo/nome.
6. Escolher apresentacao.
7. Adicionar item ao carrinho.
8. Aplicar desconto em item.
9. Adicionar item manual.
10. Finalizar venda com dinheiro e troco.
11. Finalizar venda com Pix marcado manualmente como recebido.
12. Finalizar venda como fiado selecionando cliente.
13. Abrir lista de carrinhos em aberto e retomar venda.
14. Abrir caixa, ver resumo em tempo real e fechar caixa.
15. Consultar estoque, abrir produto, ver apresentacoes e movimentacoes.
16. Registrar entrada ou ajuste de estoque.
17. Ver dashboard financeiro.
18. Cadastrar firma e visualizar limite mensal.
19. Registrar conta financeira e marcar como paga.
20. Abrir cliente de fiado, ver dividas e registrar pagamento parcial.
21. Entrar como APP_ADMIN e criar/inativar mercadinho.

## Regras de experiencia

- PDV deve ser a tela mais rapida e objetiva.
- Nunca esconder totais importantes.
- Deixar botoes destrutivos com confirmacao.
- Diferenciar claramente vendas em andamento de vendas finalizadas.
- Diferenciar claramente item de estoque e item manual.
- Mostrar que estoque so baixa na finalizacao da venda.
- Mostrar que venda finalizada nao permite editar itens e valores diretamente.
- Mostrar que divida de fiado preserva os produtos da venda original.
- Mostrar que conta financeira pode estar vinculada ou nao a uma firma.
- Mostrar que dashboard financeiro atualiza sem depender do fechamento do caixa.
- Mostrar que uma firma inativa mantem historico, mas nao entra em novos
  lancamentos.
- Mostrar que cliente inativo mantem historico, mas nao pode ser usado em nova
  venda fiada.

## Resultado esperado

Entregue um prototipo visual completo, navegavel e organizado por paginas:

- design system/componentes;
- login;
- dashboard;
- PDV;
- vendas;
- caixa;
- estoque;
- produto;
- movimentacao de estoque;
- financeiro;
- firmas;
- contas financeiras;
- fiado/clientes;
- detalhes de divida;
- backups;
- administracao APP_ADMIN;
- minha conta.

Use nomes reais nos menus, botoes e tabelas. Preencha as telas com dados
ficticios consistentes. O prototipo deve parecer pronto para uma primeira rodada
de teste com usuario, mesmo que ainda nao exista backend implementado.
