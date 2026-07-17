# Levantamento de requisitos

- ## Estoque

- Entrada de produtos com possibilidade de adicionar preços  
- Controle de lote com preço/validade  
- Editar/consumir estoque sem registrar venda ou entrada  
- Cadastro de quantidades diferentes com preços diferentes  
  - 1 Fardo de feijão \= 30Kg \- Desconto  
  - Cadastrar preço de varejo e atacado  
- Listar o estoque geral e c/ filtros  
- Possibilidade de editar todos os detalhes de um produto  
- Avisa estoque baixo de produto (Talvez o “estoque baixo” deva ser configurável)

- ## PDV

- Venda instantânea c PDV   
- Cadastrar venda posterior c/ data e hora  
- Edição de registros  
- Alteração do preço do produto no momento da venda (ACRÉSCIMO OU DESCONTO)  
- Abertura e fechamento do caixa do dia para relatórios e análises de quantidade de clientes  
- Leitor de código de barras para venda e consulta de produtos  
- Cobrança automática para pix, modo de recebimento em dinheiro e cartão na maquininha  
- “Carrinho de vendas, que quando aberto mostra as vendas em aberto daquele momento, isso permitiria atender vários clientes ao mesmo tempo.  
- Adicionar um produto que não está no estoque manualmente na venda

- ## Financeiro

- Relatório/dashboard diário em tempo real (Não precisa fechar o caixa pra atualizar)  
- Cálculo de margem de produtos dentro da página do produto  
- Gerenciador de boletos e notas  
  - Cadastrar cada firma para adicionar os dados e gastos sobre cada uma delas  
- Registro de gastos do comércio, atrelados ou não à uma venda

- ## Crediário/Fiado

- Registrar vendas c/ data e status (Pago, pendente, etc)  
- Cada dívida é 100% editável  
- Cada venda/dívida não guarda apenas o valor, mas também os produtos da compra  
- Pode gerar relatórios ou históricos  
- Busca baseada em data, nome ou outros filtros

- ## Outros

- Backups diários automáticos principalmente das dívidas  
  - Não apenas backup do banco de dados, mas também seria legal exportar um documentos para leitura manual

- ## Contas e autenticação

- O sistema deve poder ter mais de uma conta atrelada à um mercadinho  
- Usuários fazem autocadastro, e um novo mercadinho é criado, ele é adicionado como administrador daquele mercadinho e pode criar conta para funcionários  
  - COMO VOU FAZER O CONTROLE DAS CONTAS ? PQ DEIXAR O SITE ABERTO NA INTERNET PRA LITERALMENTE QUALQUER UM SE CADASTRAR PODE SER PERIGOSO. MAS TBM NN QUERIA TER QUE FAZER UM ADM DO SISTEMA QUE SÓ SIRVA PRA CRIAR MERCADINHOS  
- o login deve ser feito por nome de usuário ou email, para mais versatilidade  
- deve existir uma página onde o usuário pode autogerenciar suas informações pessoais e o admin do mercadinho vai ter uma onde vai gerenciar os funcionários

# Estoque

O sistema deve permitir que **cada produto possua uma unidade base de controle de estoque** e **múltiplas apresentações comerciais**, cada uma com nome, fator de conversão para a unidade base e preço de venda próprio.

Toda movimentação de estoque e venda deve ser convertida automaticamente para a unidade base do produto.

As apresentações não possuem estoque próprio; seu saldo disponível deve ser calculado com base no estoque total em unidade base do produto.

**Estrutura**

* estoque por unidade base  
* múltiplas apresentações  
* preço por apresentação

\- Um produto vai ter sua **unidade Base**, a menor unidade em que o estoque daquele produto será controlado, sendo um Enum de *Kg*, *unidade*, *par* e coisas do tipo  
\- O produto também vai possuir o **estoque** dessas unidades, a quantidade baseando nessa unidade base. Ele pode ou não ter o preço unitário, o preço da unidade base do produto  
\- Para se relacionar com o produto, a apresentação usa o id do produto, ela tem o **fatorBase** que representa quantas unidades de base ele representa, e o valor de cada unidade daquela apresentação  
\-**IDEIA:** O produto pode armazenar mais de um código de barras, pq a busca tbm pode ser feita de acordo com o código de barras de uma apresentação (Caixa, por exemplo)  
	\- Outra maneira seria cada apresentação armazenar um código de barras, ai nesse caso na busca pelo código, ele já retornava o produto na apresentação certa

## **Produto**

Campos principais:

* `id`  
* `nome`  
* `unidadeBase` → `KG` ou `UN`  
* `estoqueBase`  
* `precoBase` opcional, posso manter sem preço no produto e puxar sempre o da apresentação  
* `categoria`  
* `ativo`

### **Exemplo**

{  
 "id": 1,  
 "nome": "Feijão Carioca",  
 "unidadeBase": "KG",  
 "estoqueBase": 300,  
 "precoBase": 7.00  
}

## **Apresentações do produto**

Cada apresentação pertence a um produto.

Campos:

* `id`  
* `produtoId`  
* `nome`  
* `fatorBase`  
* `precoVenda`  
* `codigoBarras` opcional  
* `ativa`

### **Exemplo**

\[  
 {  
   "id": 1,  
   "produtoId": 1,  
   "nome": "1 kg",  
   "fatorBase": 1,  
   "precoVenda": 7.00  
 },  
 {  
   "id": 2,  
   "produtoId": 1,  
   "nome": "Fardo pequeno",  
   "fatorBase": 10,  
   "precoVenda": 68.00  
 },  
 {  
   "id": 3,  
   "produtoId": 1,  
   "nome": "Fardo grande",  
   "fatorBase": 30,  
   "precoVenda": 195.00  
 }  
\]

Aqui:

* `fatorBase = 1` significa 1 kg  
* `fatorBase = 10` significa 10 kg  
* `fatorBase = 30` significa 30 kg

Ou seja, **toda apresentação sempre aponta para a unidade base**. Isso evita nó.  
A apresentação não armazena uma nova quantidade, mas converte a unidade base, evitando confusões

---

### **Regras**

* toda entrada e saída converte para unidade base  
  * O usuário informa um tipo, por exemplo, venda de 1 fardo de feijão, o sistema converte pra 30Kg e deduz no estoque, além de analisar o preço dessa apresentação específica  
* no PDV o operador escolhe a apresentação  
* o sistema deve exibir estoque total e, opcionalmente, uma visualização convertida em embalagens maiores \+ unidades restantes

# Como vender no PDV

Vai existir uma classe *itemVenda*, o objeto vai carregar todas as informações necessárias para essa venda, mais detalhes no [módulo de pdv]().

Tu guarda:

* produto  
* apresentação escolhida  
* quantidade de apresentações  
* preço unitário da apresentação  
* total convertido em unidade base

Exemplo:

* produto: Feijão  
* apresentação: Fardo pequeno  
* quantidade: 2  
* fatorBase: 10  
* totalBase: 20  
* preçoUnitário: 68,00

Assim o estoque baixa 20 kg.

Requisitos funcionais importantes

**RF01.** O sistema deve permitir cadastrar um produto com unidade base única de controle de estoque.  
**RF02.** O sistema deve permitir cadastrar múltiplas apresentações para um mesmo produto.  
**RF03.** Cada apresentação deve possuir nome, fator de conversão para a unidade base, preço de venda e, opcionalmente, código de barras.  
**RF04.** O estoque do produto deve ser armazenado apenas na unidade base.  
**RF05.** Toda entrada, saída, venda ou ajuste deve ser convertida automaticamente para a unidade base.  
**RF06.** O sistema deve permitir buscar produtos por nome, código principal ou código de barras de apresentação.  
**RF07.** O sistema deve exibir o estoque total em unidade base e poderá exibir uma visualização derivada em apresentações maiores.  
**RF08.** O sistema deve registrar o histórico de movimentações de estoque.

# Regra de negócio importante

**RN01.** Cada produto terá apenas uma unidade base.  
**RN02.** Cada apresentação de um produto representa uma quantidade fixa da unidade base.  
**RN03.** O estoque será armazenado somente na unidade base.  
**RN04.** O preço poderá ser definido individualmente por apresentação.  
**RN05.** O nome da apresentação é apenas comercial e não define comportamento automático global no sistema.  
**RN06.** O fator de conversão da apresentação deve ser maior que zero. *Por agora não precisa ser decimal, pois indica uma quantidade de itens do pacote fechado*.  
**RN07.** Não pode existir duas apresentações ativas iguais para o mesmo produto com o mesmo fator e mesmo nome, salvo decisão explícita.  
**RN08.** A exclusão de apresentação já utilizada em venda ou movimentação não deve apagar histórico; no máximo, deve inativá-la.  
**RN09.** Quando uma apresentação for usada numa venda, seus dados essenciais devem ser registrados no item da venda para preservar o histórico, mesmo que a apresentação seja alterada depois.  
**RN10.** Produtos com unidade base fracionável poderão ter estoque e fator de conversão com casas decimais.  
**RN11.** O sistema deverá armazenar quantidades de estoque, fatores de conversão e quantidades de venda em formato numérico decimal.  
**RN12.** Produtos cuja unidade base permita fracionamento, como `KG`, poderão ser vendidos com quantidades decimais na apresentação base ou em apresentações compatíveis.  
**RN13.** Quando a apresentação possuir `fatorBase = 1`, a quantidade informada na venda corresponderá diretamente à unidade base do produto.

#  Ideias:

### **6\. Falta um módulo ou entidade de movimentação de estoque**

Tu diz que toda entrada e saída converte para unidade base.  
 Perfeito. Mas ainda falta deixar claro **onde isso será registrado**.

Eu sugeriria prever uma entidade ou registro de movimentação com algo como:

* produto  
* tipo da movimentação  
* apresentação usada, se houverquantidade informada  
* quantidade convertida para base  
* data/hora  
* usuário  
* observação

Sem isso, depois fica difícil auditar ajuste, entrada, perda e baixa manual.

### **7\. Falta tratar entradas de estoque além da venda**

Hoje o documento explica bem a venda no PDV.  
 Mas eu adi

cionaria explicitamente que a mesma lógica vale para:

* entrada de mercadoria,  
* ajuste manual,  
* perda/avaria,  
* devolução,  
* consumo interno.

Isso fecha o módulo de estoque de forma mais completa.

# PDV

## **Planejamento de recorte pra V1**

Eu priorizaria assim:

**Essencial**

* venda instantânea  
* carrinho em aberto  
* item de venda  
* leitura de código de barras  
* múltiplas apresentações  
* pagamento em dinheiro/pix/cartão  
* abertura/fechamento de caixa  
* item manual  
* desconto/acréscimo por item

**Depois**

* edição retroativa forte  
* integração automática com Pix/maquininha  
* regras avançadas de autorização  
* suspensão/cancelamento mais sofisticados

Se quiser, no próximo passo eu posso transformar isso já no mesmo padrão do estoque, com:

* objetivo do módulo  
* estrutura  
* entidades  
* requisitos funcionais numerados  
* regras de negócio numeradas  
* e exemplos prontos pra colar no documento.

**OBS:** Uma venda não armazena o idCaixa o qual ela pertence, para fazer uma busca por vendas de um caixa eu pego todas as vendas de status finalizadas, com a dataFinalização entre a abertura e fechamento do caixa.

![][image1]

## 

## **1\. Objetivo do módulo**

O módulo de PDV deve permitir registrar e concluir vendas no balcão de forma rápida, com suporte a múltiplos carrinhos em aberto, leitura de código de barras, alteração controlada de preços, diferentes formas de pagamento e integração com o estoque e o caixa.

---

## **2\. Principais entidades**

Eu pensaria nas seguintes entidades:

### **Venda**

Representa a venda como um todo. Quando estiver com o **`status`** em aberto, funciona como um carrinho de compras, com vários pedidos em aberto ao mesmo tempo. No front eu listo as vendas como em aberto.

Campos principais:

* `id`  
* `status`  
* `dataHoraFechamento (fechamento da venda,personalizada no caso de adicionado posteriormente?)`  
* `operadorId`  
* `clienteId` (É importante se for fiado, mas pode ser null)  
* `subtotal`  
* `desconto`  
* `acrescimo`  
* `valorTotal`  
* `observacao`

### **ItemVenda**

Esse já conversa direto com o módulo de estoque.

Campos:

* `id`  
* `vendaId`  
* `produtoId` opcional  
* `nomeProduto (Pode ser adicionado manualmente)`  
* `apresentacaoId` opcional  
* `tipoApresentacao (`opcional ou `Pode ser adicionado manualmente)`  
* `fatorBase`  
* `quantidadeDaApresentacao`  
* `quantidadeDaBase`  
* `subtotalDoItem (puxa da apresentação)`  
* `descontoItem (O desconto e acrécimo é aplicado no item total, na apresentação)`  
* `acrescimoItem`  
* `totalDoItem`

### **`Item manual`**

`Então funciona assim:`

`Quando for item do estoque:`

* `tem produtoId`  
* `tem apresentacaoId`  
* `tem conversão/base`  
* `baixa estoque ao finalizar`

`Quando for item manual:`

* `produtoId = null`  
* `apresentacaoId = null`  
* `salva:`  
  * `nome digitado`  
  * `quantidade`  
  * `preço`  
  * `subtotal`  
* `não baixa estoque`

`No front: Opção de pesquisar e adicionar item do estoque, ou adicionar item manualmente.`

`Eu só acrescentaria um campo simples:`

* `tipoItem = PRODUTO | MANUAL`

`Não é obrigatório, mas deixa a lógica mais limpa.`

### **PagamentoVenda**

Uma venda pode ter um ou mais pagamentos.  
No momento, ele deve apenas registar o pagamento, posteriormente vou implementar o sistema de pagamento direto no PDV.

Campos:

* `id`  
* `vendaId`  
* `formaPagamento (O caderno vai ser basicamente uma lista de compras onde o PagamentoVenda.formaPagamento == FIADO e pagamento == pendente)`  
* `valor`  
* `status [PAGO, PENDENTE]`  
* `dataHora`  
* `observacao`

### **Caixa**

Ligado à abertura e fechamento do dia.  
Talvez possa existir um resumo final separando por meio de pagamento, quanto foi recebido em pix, em dinheiro e em cartão de crédito, por exemplo.  
Vendas lançadas posteriormente não entram no fechamento do caixa

Campos:

* `id`  
* `operadorAberturaId (Opicional)`  
* `dataHoraAbertura (Automático)`  
* `status (Atualiza na hora, se não for fechado até tal hora, ele fecha automáticamente)`  
* `operadorFechamentoId (Opicional)`   
* `dataHoraFechamento (Automático)`  
* `valorFinalVendas (Somatório das vendas feito automáticamente filtrando pelos horários de abertura e fechamento)`  
* `valorFinalRecebido (Somatório de vendas - vendas fiado)`  
* `observacao`

---

## 

## 

## **3\. Status e fluxo da venda**

Eu deixaria os status bem claros:

* `EM_ANDAMENTO`  
* `FINALIZADA`  
* `CANCELADA`

Talvez também:

* `SUSPENSA/EXTORNADA`

### **Fluxo básico**

1. operador abre ou assume um carrinho  
2. adiciona itens  
3. ajusta quantidades/apresentações  
4. aplica desconto ou acréscimo, se permitido  
5. informa forma(s) de pagamento  
6. finaliza venda  
7. sistema registra pagamento  
8. sistema baixa estoque  
9. sistema lança valores no caixa

Aqui tem uma decisão importante:

### **Quando baixar estoque?**

Eu recomendo:

* **baixar estoque só na finalização da venda**

Porque se baixar enquanto o carrinho ainda está aberto, pode virar confusão quando cliente desiste ou troca item.

---

## 

## 

## 

## 

## **4\. Pontos que eu sugiro decidir agora**

### **C) Produto manual fora do estoque**

Boa ideia, principalmente pra quebrar galho.  
Mas eu trataria como:

* item avulso/manual  
* nome digitado  
* valor digitado  
* quantidade digitada  
* sem vínculo com produto cadastrado  
* sem baixa de estoque

---

Isso já dá um **módulo de PDV forte pra V1**. O mais importante agora é formalizar sem deixar margem pra ambiguidade, principalmente em:

* quando mexe no estoque,  
* quando mexe no caixa,  
* até onde pode editar,  
* e como tratar venda posterior.

# Regras de negócio

## **5\. Regras de negócio importantes**

Eu colocaria estas como base:

**RN-01.** Uma venda em andamento não deve movimentar estoque nem financeiro definitivo até sua finalização.  
**RN-02.** Ao finalizar a venda, o sistema deve baixar o estoque dos produtos cadastrados conforme a quantidade convertida para a unidade base.  
**RN-03.** Itens manuais não cadastrados no estoque não devem gerar movimentação de estoque.  
**RN-04.** Toda venda deve registrar o operador responsável pela abertura e finalização.  
**RN-05.** O item da venda deve armazenar snapshots dos dados essenciais do produto e da apresentação, preservando histórico mesmo que o cadastro seja alterado depois.  
**RN-06.** Alterações de preço devem registrar valor original, valor praticado e motivo, quando aplicável.  
**RN-07.** Vendas lançadas posteriormente devem armazenar tanto a data/hora do registro quanto a data/hora real informada da venda.  
**RN-08.** O caixa deve considerar apenas vendas finalizadas.  
**RN-09.** Uma venda pode possuir mais de uma forma de pagamento.  
**RN-10.** O total dos pagamentos deve ser igual ao valor final da venda, exceto em casos de fiado/crediário quando isso for permitido.  
**RN-11.** Vendas canceladas não devem gerar movimentação definitiva de estoque nem de caixa.  
**RN-12.** A leitura de código de barras de uma apresentação deve adicionar o produto já na apresentação correspondente. Isso conversa direto com a ideia de código por apresentação do módulo de estoque.  
**RN-13.** Vendas finalizadas não podem ter seus itens, valores ou pagamentos alterados. Apenas o campo de observação poderá ser editado, se permitido.  
**RN-14.** Para desfazer uma venda finalizada, o sistema deverá executar cancelamento ou extorno, preservando histórico.  
**RN-15.** Vendas em andamento não reservam estoque. A disponibilidade do produto deve ser validada novamente no momento da finalização.   
**RN-16.** O caixa não será vinculado diretamente à venda por identificador. As vendas do caixa serão apuradas pela data/hora de finalização dentro do intervalo entre abertura e fechamento. 

# Rquisitos

## **4\. Requisitos funcionais do PDV**

Com base no que tu levantou, eu organizaria assim:

### **Operação de venda**

**RF-01.** O sistema deve permitir realizar venda instantânea pelo PDV.  
**RF-02.** O sistema deve permitir criar e manter múltiplas vendas em andamento simultaneamente.  
**RF-03.** O sistema deve permitir retomar uma venda em andamento.  
**RF-04.** O sistema deve permitir cadastrar venda posterior com data e hora informadas pelo usuário.  
**RF-05.** O sistema deve permitir cancelar ou editar uma venda em andamento antes da finalização.  
**RF-06.** O sistema deve permitir consultar vendas por período, número, operador ou cliente.

### **Itens da venda**

**RF-07.** O sistema deve permitir adicionar produtos ao carrinho por busca textual ou leitura de código de barras.  
**RF-08.** O sistema deve permitir selecionar a apresentação do produto no momento da venda.  
**RF-09.** O sistema deve permitir informar a quantidade da apresentação vendida.  
**RF-10.** O sistema deve calcular automaticamente a quantidade convertida para a unidade base do produto.  
**RF-11.** O sistema deve permitir adicionar item manual avulso que não esteja cadastrado no estoque.  
**RF-12.** O sistema deve permitir remover itens do carrinho antes da finalização.

### **Preço e ajustes**

**RF-13.** O sistema deve permitir alterar o preço do item no momento da venda, por desconto ou acréscimo.  
**RF-14.** O sistema deve registrar o preço original e o preço praticado no item da venda.  
**RF-15.** O sistema deve registrar o operador responsável pela alteração de preço.  
**RF-16.** O sistema deve permitir aplicar desconto ou acréscimo no total da venda, se habilitado.

### **Pagamento**

**RF-17.** O sistema deve permitir finalizar vendas com pagamento em dinheiro, Pix, cartão ou múltiplas formas combinadas.  
**RF-18.** O sistema deve calcular troco automaticamente para pagamentos em dinheiro.  
**RF-19.** O sistema deve registrar os pagamentos vinculados à venda.  
**RF-20.** O sistema deve permitir marcar pagamento via maquininha como realizado manualmente pelo operador.

### **Caixa**

**RF-21.** O sistema deve permitir abertura do caixa com valor inicial.  
**RF-22.** O sistema deve permitir fechamento do caixa com apuração dos valores por forma de pagamento.  
**RF-23.** O sistema deve registrar a quantidade de vendas e o valor total movimentado no caixa.  
**RF-24.** O sistema deve permitir visualizar o resumo do caixa em tempo real sem precisar fechá-lo.

# Exemplos

## **7\. Estrutura mínima**

Eu imagino algo assim:

**Venda**

{  
  "id": 1001,  
  "status": "EM\_ANDAMENTO",  
  "dataHora": null,  
  "operadorId": 3,  
  "clienteId": null,  
  "subtotal": 0.00,  
  "desconto": 0.00,  
  "acrescimo": 0.00,  
  "valorTotal": 0.00,  
  "observacao": null  
}

### **Item de venda com produto cadastrado**

{  
  "id": 1,  
  "vendaId": 1001,  
  "produtoId": 51,  
  "nomeProduto": "Farinha",  
  "apresentacaoId": 1,  
  "tipoApresentacao": "Kg",  
  "fatorBase": 1.0,  
  "quantidadeDaApresentacao": 1.5,  
  "quantidadeDaBase": 1.5,  
  "subtotalDoItem": 9.00,  
  "descontoItem": 0.00,  
  "acrescimoItem": 0.00,  
  "totalDoItem": 9.00  
}

### **Item manual** {

  "id": 2,  
  "vendaId": 1001,  
  "produtoId": null,  
  "nomeProduto": "Produto avulso",  
  "apresentacaoId": null,  
  "tipoApresentacao": "Unidade",  
  "fatorBase": null,  
  "quantidadeDaApresentacao": 1.0,  
  "quantidadeDaBase": null,  
  "subtotalDoItem": 12.00,  
  "descontoItem": 0.00,  
  "acrescimoItem": 0.00,  
  "totalDoItem": 12.00  
}

**PagamentoVenda**   
{  
  "id": 1,  
  "vendaId": 1001,  
  "formaPagamento": "PIX",  
  "valor": 9.00,  
  "status": "PAGO",  
  "dataHora": "2026-05-12T14:32:10",  
  "observacao": null  
}

**PagamentoVenda com fiado**   
{  
  "id": 2,  
  "vendaId": 1002,  
  "formaPagamento": "FIADO",  
  "valor": 35.50,  
  "status": "PENDENTE",  
  "dataHora": "2026-05-12T15:10:00",  
  "observacao": "Cliente pediu para pagar na sexta"  
}

**Caixa**  
{  
  "id": 12,  
  "operadorAberturaId": 3,  
  "dataHoraAbertura": "2026-05-12T08:00:00",  
  "status": "ABERTO",  
  "operadorFechamentoId": null,  
  "dataHoraFechamento": null,  
  "valorFinalVendas": 0.00,  
  "valorFinalRecebido": 0.00,  
  "observacao": null  
}

**Caixa fechado**  
{  
  "id": 12,  
  "operadorAberturaId": 3,  
  "dataHoraAbertura": "2026-05-12T08:00:00",  
  "status": "FECHADO",  
  "operadorFechamentoId": 3,  
  "dataHoraFechamento": "2026-05-12T18:05:00",  
  "valorFinalVendas": 1845.70,  
  "valorFinalRecebido": 1620.20,  
  "observacao": "Fechamento normal do dia"  
}

# Financeiro

**Financeiro**

## **1\. Objetivo do módulo**

O módulo financeiro deve permitir ao comércio acompanhar, de forma simples e confiável, as movimentações financeiras do negócio, incluindo vendas, pagamentos, gastos gerais, contas em aberto, contas pagas e controle de limite mensal das firmas/CNPJs utilizados para compras.

O módulo deve funcionar como um painel de acompanhamento financeiro, sem substituir controle contábil formal, mas auxiliando na organização diária e mensal do comércio.

---

## **2\. Estrutura geral**

O módulo financeiro será dividido em três partes principais:

* Dashboard financeiro;  
* Gerenciamento de firmas/CNPJs;  
* Gerenciamento de contas financeiras.

A entidade principal para registros financeiros será a **ContaFinanceira**.

Ela poderá representar:

* boleto;  
* nota;  
* compra de mercadoria;  
* despesa geral;  
* conta paga;  
* conta em aberto;  
* outro lançamento financeiro.

Quando uma conta financeira possuir `firmaId`, ela será considerada no controle mensal da firma.  
Quando não possuir `firmaId`, será tratada apenas como gasto geral do comércio.

---

# **Principais entidades**

## **Firma**

Representa um CNPJ/MEI utilizado pelo comércio para realizar compras.

Não representa fornecedor.

Campos principais:

* `id`  
* `nome`  
* `cnpj`  
* `responsavel`  
* `limiteMensalCompras`  
* `ativo`  
* `observacao`

### **Exemplo**

{  
  "id": 1,  
  "nome": "MEI João",  
  "cnpj": "00.000.000/0001-00",  
  "responsavel": "João",  
  "limiteMensalCompras": 5400.00,  
  "ativo": true,  
  "observacao": "CNPJ usado para compras de mercadorias"  
}

---

## **ContaFinanceira**

Representa qualquer conta, boleto, nota, compra ou gasto lançado no sistema.

Campos principais:

* `id`  
* `firmaId` opcional  
* `vendaId` opcional  
* `descricao`  
* `tipo`  
* `valor`  
* `dataLancamento`  
* `dataVencimento` opcional  
* `dataPagamento` opcional  
* `status`  
* `observacao`

### **Tipos possíveis**

* `BOLETO`  
* `NOTA`  
* `COMPRA_MERCADORIA`  
* `DESPESA`  
* `OUTRO`

### **Status possíveis**

* `EM_ABERTO`  
* `PAGO`  
* `CANCELADO`

O status `VENCIDO` pode ser calculado automaticamente quando a conta estiver `EM_ABERTO` e a data de vencimento já tiver passado.

---

## **Conta financeira vinculada a uma firma**

{  
  "id": 101,  
  "firmaId": 1,  
  "vendaId": null,  
  "descricao": "Compra de mercadorias",  
  "tipo": "BOLETO",  
  "valor": 2500.00,  
  "dataLancamento": "2026-05-10",  
  "dataVencimento": "2026-05-25",  
  "dataPagamento": null,  
  "status": "EM\_ABERTO",  
  "observacao": "Compra realizada usando o CNPJ do MEI João"  
}

Nesse caso, a conta:

* entra no resumo financeiro geral;  
* entra no controle mensal da firma;  
* consome o limite mensal da firma;  
* aparece como conta em aberto enquanto não for paga.

---

## **Conta financeira sem firma**

{  
  "id": 202,  
  "firmaId": null,  
  "vendaId": null,  
  "descricao": "Conserto da balança",  
  "tipo": "DESPESA",  
  "valor": 120.00,  
  "dataLancamento": "2026-05-12",  
  "dataVencimento": null,  
  "dataPagamento": "2026-05-12",  
  "status": "PAGO",  
  "observacao": "Pago em dinheiro"  
}

Nesse caso, a conta:

* entra no resumo financeiro geral;  
* entra nos gastos do mês;  
* não consome limite de nenhuma firma;  
* não aparece no controle de CNPJ.

---

## **Resumo da firma**

O resumo da firma não precisa ser armazenado como tabela própria.  
Ele pode ser calculado pelo sistema com base nas contas financeiras vinculadas à firma.

Campos calculados:

* `firmaId`  
* `mesReferencia`  
* `limiteMensalCompras`  
* `totalCompradoNoMes`  
* `totalPago`  
* `totalEmAberto`  
* `limiteDisponivel`

### **Exemplo**

{  
  "firmaId": 1,  
  "mesReferencia": "2026-05",  
  "limiteMensalCompras": 5400.00,  
  "totalCompradoNoMes": 3200.00,  
  "totalPago": 1500.00,  
  "totalEmAberto": 1700.00,  
  "limiteDisponivel": 2200.00  
}

---

# **Dashboard financeiro**

O dashboard financeiro deve ser calculado a partir dos registros existentes no sistema.

Ele pode considerar:

* vendas finalizadas;  
* pagamentos recebidos;  
* valores recebidos por dinheiro, Pix e cartão;  
* valores em fiado;  
* contas pagas;  
* contas em aberto;  
* gastos gerais;  
* compras vinculadas às firmas;  
* limite disponível das firmas.

O dashboard não depende do fechamento do caixa para atualizar.

---

# **Requisitos funcionais do financeiro**

## **Dashboard**

**RF-FIN01.** O sistema deve permitir visualizar um dashboard financeiro diário em tempo real.

**RF-FIN02.** O dashboard deve considerar vendas finalizadas, pagamentos recebidos, valores em fiado, contas pagas, contas em aberto e gastos lançados.

**RF-FIN03.** O sistema deve permitir visualizar resumo financeiro por período, como dia, mês ou intervalo personalizado.

---

## **Firmas**

**RF-FIN04.** O sistema deve permitir cadastrar firmas/CNPJs utilizados pelo comércio para compras.

**RF-FIN05.** O cadastro da firma deve conter nome, CNPJ, responsável, limite mensal de compras, status ativo/inativo e observações.

**RF-FIN06.** O sistema deve permitir editar os dados de uma firma.

**RF-FIN07.** O sistema deve permitir inativar uma firma, sem apagar seu histórico financeiro.

**RF-FIN08.** O sistema deve permitir visualizar o resumo mensal de cada firma.

**RF-FIN09.** O sistema deve calcular o limite utilizado e o limite disponível de cada firma no mês.

---

## **Contas financeiras**

**RF-FIN10.** O sistema deve permitir registrar contas financeiras vinculadas ou não a uma firma.

**RF-FIN11.** Uma conta financeira poderá representar boleto, nota, compra de mercadoria, despesa geral ou outro lançamento financeiro.

**RF-FIN12.** O sistema deve permitir informar descrição, tipo, valor, data de lançamento, data de vencimento, status e observação da conta.

**RF-FIN13.** O sistema deve permitir marcar uma conta como paga, registrando a data de pagamento.

**RF-FIN14.** O sistema deve permitir cancelar uma conta financeira.

**RF-FIN15.** O sistema deve permitir consultar contas por firma, mês, status, tipo, vencimento ou descrição.

**RF-FIN16.** O sistema deve permitir visualizar separadamente contas pagas, em aberto e vencidas.

---

## **Margem de produtos**

**RF-FIN17.** O sistema deve permitir visualizar o cálculo de margem de produtos dentro da página do produto.

**RF-FIN18.** O cálculo de margem deve considerar o custo cadastrado do produto e o preço de venda da apresentação consultada.

---

# **Regras de negócio do financeiro**

**RN-FIN01.** Firma representa um CNPJ/MEI utilizado pelo comércio para compras, não um fornecedor.

**RN-FIN02.** Uma conta financeira pode estar vinculada a uma firma ou ser registrada como gasto geral do comércio.

**RN-FIN03.** Toda conta financeira deve entrar no resumo financeiro geral.

**RN-FIN04.** Quando uma conta financeira possuir `firmaId`, ela também deve entrar no controle mensal da respectiva firma.

**RN-FIN05.** Quando uma conta financeira não possuir `firmaId`, ela será considerada apenas como gasto geral do comércio.

**RN-FIN06.** O limite utilizado da firma será calculado pela soma das contas financeiras vinculadas à firma no mês de referência.

**RN-FIN07.** Contas pagas continuam consumindo o limite do mês em que foram lançadas, pois representam compras realizadas naquele período.

**RN-FIN08.** O limite disponível da firma será calculado por: `limiteMensalCompras - totalCompradoNoMes`.

**RN-FIN09.** O status `VENCIDO` pode ser identificado automaticamente quando uma conta estiver em aberto e a data de vencimento já tiver passado.

**RN-FIN10.** O dashboard financeiro deve ser calculado em tempo real a partir dos registros existentes, sem depender do fechamento do caixa.

**RN-FIN11.** Uma firma inativa não deve ser usada em novos lançamentos, mas seu histórico deve continuar disponível.

**RN-FIN12.** Contas canceladas não devem consumir limite da firma nem entrar como gasto efetivo nos resumos financeiros.

---

# **Conferência com os requisitos coletados**

Bate sim:

* **Relatório/dashboard diário em tempo real:** coberto por `RF-FIN01`, `RF-FIN02`, `RF-FIN03` e `RN-FIN10`.  
* **Cálculo de margem de produtos:** coberto por `RF-FIN17` e `RF-FIN18`.  
* **Gerenciador de boletos e notas:** absorvido pela entidade `ContaFinanceira`.  
* **Cadastrar cada firma:** coberto por `Firma`, `RF-FIN04` até `RF-FIN09`.  
* **Registro de gastos do comércio, atrelados ou não à venda:** coberto por `ContaFinanceira`, com `firmaId` e `vendaId` opcionais.

Minha avaliação: **o módulo financeiro está bem estruturado para V1**. Só deixaria uma observação futura: se depois vocês quiserem anexar foto/PDF de boleto ou nota, dá para adicionar um campo/entidade de anexo sem alterar a lógica principal. DECIDIR FAZER ISSO NA HORA DE CODAR.

# Crediário/Fiado

# **Crediário / Fiado**

## **1\. Objetivo do módulo**

O módulo de crediário/fiado deve permitir registrar, acompanhar e gerenciar vendas realizadas para pagamento posterior.

O módulo deve funcionar como um **caderno digital de fiado**, permitindo consultar quais clientes possuem dívidas, quais produtos foram comprados, os valores pendentes, os pagamentos realizados e o histórico de cada cliente.

---

## **2\. Relação com o PDV**

O fiado deve ser registrado a partir de uma venda normal do PDV.

Quando uma venda for finalizada com a forma de pagamento `FIADO`, o sistema deverá criar uma dívida vinculada à venda e ao cliente.

A venda continua armazenando os produtos comprados por meio dos seus itens de venda. A dívida não precisa duplicar os produtos, pois deve consultar os produtos a partir da venda original.

Exemplo:

Venda finalizada no PDV

Forma de pagamento: FIADO

Cliente: Seu Zé

Valor: R$ 50,00

Resultado: sistema cria uma ContaFiado pendente para o cliente

---

# **Principais entidades**

## **Cliente**

Representa uma pessoa que pode comprar fiado.

O cadastro deve ser simples e rápido, exigindo apenas o nome como campo obrigatório.

Campos principais:

* `id`  
* `nome`  
* `apelido` opcional  
* `telefone` opcional  
* `endereco` opcional  
* `ativo`  
* `observacao`

### **Exemplo**

{

  "id": 1,

  "nome": "Seu Zé",

  "apelido": "Zé da Rua de Baixo",

  "telefone": null,

  "endereco": null,

  "ativo": true,

  "observacao": "Cliente antigo da família"

}

---

## **ContaFiado**

Representa a dívida criada a partir de uma venda finalizada com pagamento fiado.

Campos principais:

* `id`  
* `clienteId`  
* `vendaId`  
* `valorOriginal`  
* `valorPago`  
* `valorPendente`  
* `status`  
* `dataCriacao`  
* `observacao`

Status possíveis:

* `PENDENTE`  
* `PARCIALMENTE_PAGA`  
* `PAGA`  
* `CANCELADA`

### **Exemplo**

{

  "id": 10,

  "clienteId": 1,

  "vendaId": 1002,

  "valorOriginal": 50.00,

  "valorPago": 0.00,

  "valorPendente": 50.00,

  "status": "PENDENTE",

  "dataCriacao": "2026-05-12T15:10:00",

  "observacao": "Cliente ficou de pagar depois"

}

---

## **PagamentoFiado**

Representa um pagamento feito pelo cliente para abater ou quitar uma dívida.

Campos principais:

* `id`  
* `contaFiadoId`  
* `valor`  
* `dataPagamento`  
* `formaPagamento`  
* `observacao`

Formas de pagamento possíveis:

* `DINHEIRO`  
* `PIX`  
* `CARTAO`  
* `OUTRO`

### **Exemplo**

{

  "id": 1,

  "contaFiadoId": 10,

  "valor": 20.00,

  "dataPagamento": "2026-05-14T09:30:00",

  "formaPagamento": "DINHEIRO",

  "observacao": "Pagamento parcial"

}

---

# **Fluxo básico**

## **Venda fiada pelo PDV**

1. O operador abre uma venda no PDV.  
2. Adiciona os produtos normalmente.  
3. Seleciona ou cadastra rapidamente o cliente.  
4. Escolhe a forma de pagamento `FIADO`.  
5. Finaliza a venda.  
6. O sistema baixa o estoque normalmente.  
7. O sistema registra a venda.  
8. O sistema cria uma `ContaFiado` vinculada à venda e ao cliente.

---

## **Pagamento posterior**

1. O operador acessa o cliente ou a dívida.  
2. Visualiza as dívidas em aberto.  
3. Seleciona a dívida.  
4. Informa o valor pago.  
5. Informa a forma de pagamento.  
6. O sistema valida o pagamento.  
7. O sistema registra o `PagamentoFiado`.  
8. O sistema recalcula o valor pago, valor pendente e status da dívida.

---

# **Validação de pagamento fiado**

Ao registrar um pagamento de fiado, o sistema deve seguir uma lógica robusta para evitar erros.

Fluxo de validação:

registrarPagamentoFiado(contaFiadoId, valorPagamento):

  buscar ContaFiado

  se status for PAGA ou CANCELADA:

    bloquear pagamento

  se valorPagamento \<= 0:

    bloquear pagamento

  valorPendente \= valorOriginal \- somaPagamentosValidos

  se valorPagamento \> valorPendente:

    bloquear pagamento

  registrar PagamentoFiado

  novoValorPago \= somaPagamentosValidos

  novoValorPendente \= valorOriginal \- novoValorPago

  se novoValorPendente \== 0:

    status \= PAGA

  senão se novoValorPago \> 0:

    status \= PARCIALMENTE\_PAGA

  senão:

    status \= PENDENTE

Exemplo:

Dívida original: R$ 50,00

Pagamento 1: R$ 20,00

Valor pendente: R$ 30,00

Status: PARCIALMENTE\_PAGA

Pagamento 2: R$ 30,00

Valor pendente: R$ 0,00

Status: PAGA

Tentativa inválida:

Valor pendente: R$ 30,00

Pagamento informado: R$ 40,00

Resultado: pagamento bloqueado

Motivo: valor maior que o pendente

---

# **Requisitos funcionais do crediário/fiado**

## **Clientes**

**RF-FIA01.** O sistema deve permitir cadastrar clientes para uso no crediário/fiado.

**RF-FIA02.** O cadastro do cliente deve exigir apenas o nome como campo obrigatório, permitindo cadastro rápido no momento da venda.

**RF-FIA03.** O sistema deve permitir consultar clientes por nome, apelido ou telefone.

**RF-FIA04.** O sistema deve permitir editar os dados de um cliente.

**RF-FIA05.** O sistema deve permitir inativar clientes sem apagar seu histórico.

---

## **Registro de fiado**

**RF-FIA06.** O sistema deve permitir registrar uma venda como fiado a partir do PDV.

**RF-FIA07.** Toda venda fiada deve estar vinculada a um cliente.

**RF-FIA08.** Cada dívida deve guardar vínculo com a venda original, preservando os produtos comprados.

**RF-FIA09.** O sistema deve permitir visualizar os produtos de cada compra fiada.

**RF-FIA10.** O sistema deve permitir informar observação na dívida.

---

## **Pagamentos**

**RF-FIA11.** O sistema deve permitir registrar pagamento total ou parcial de uma dívida.

**RF-FIA12.** O sistema deve permitir registrar a forma de pagamento usada para quitar ou abater uma dívida.

**RF-FIA13.** O sistema deve impedir pagamento maior que o valor pendente da dívida.

**RF-FIA14.** O sistema deve impedir pagamento com valor menor ou igual a zero.

**RF-FIA15.** O sistema deve atualizar automaticamente o valor pago, valor pendente e status da dívida após cada pagamento.

---

## **Consulta e relatórios**

**RF-FIA16.** O sistema deve permitir consultar dívidas por cliente, data, status e valor.

**RF-FIA17.** O sistema deve permitir visualizar o histórico de compras fiadas de um cliente.

**RF-FIA18.** O sistema deve permitir visualizar o histórico de pagamentos de um cliente.

**RF-FIA19.** O sistema deve permitir gerar resumo de valores em aberto, valores pagos e total fiado por período.

---

## **Edição e cancelamento**

**RF-FIA20.** O sistema deve permitir editar observações da dívida.

**RF-FIA21.** O sistema deve permitir cancelar uma dívida quando necessário, preservando o histórico da venda original.

**RF-FIA22.** O sistema não deve permitir edição direta dos produtos e valores originais de uma dívida gerada por venda finalizada.

---

# **Regras de negócio do crediário/fiado**

**RN-FIA01.** Toda venda fiada deve possuir um cliente vinculado.

**RN-FIA02.** O cadastro de cliente deve ser rápido, exigindo apenas o nome como campo obrigatório.

**RN-FIA03.** Uma dívida de fiado deve ser criada a partir de uma venda finalizada com forma de pagamento `FIADO`.

**RN-FIA04.** A dívida deve guardar vínculo com a venda original para permitir consulta aos produtos comprados.

**RN-FIA05.** Os produtos da compra fiada não devem ser duplicados dentro da dívida; devem ser consultados pela venda original e seus itens.

**RN-FIA06.** Ao finalizar uma venda fiada, o estoque deve ser baixado normalmente, igual a qualquer venda finalizada.

**RN-FIA07.** O valor original da dívida deve ser igual ao valor da forma de pagamento fiado registrada na venda.

**RN-FIA08.** Uma dívida pode receber pagamentos parciais.

**RN-FIA09.** O valor de um pagamento de fiado deve ser maior que zero.

**RN-FIA10.** O sistema não deve permitir registrar pagamento em dívida com status `PAGA` ou `CANCELADA`.

**RN-FIA11.** O sistema não deve permitir registrar pagamento maior que o valor pendente da dívida.

**RN-FIA12.** O valor pendente da dívida deve ser calculado por: `valorOriginal - somaDosPagamentos`.

**RN-FIA13.** Se o valor pendente for zero, a dívida deve ficar com status `PAGA`.

**RN-FIA14.** Se houver pagamento registrado e ainda existir valor pendente, a dívida deve ficar com status `PARCIALMENTE_PAGA`.

**RN-FIA15.** Pagamentos de fiado não alteram os itens da venda original.

**RN-FIA16.** Uma venda fiada finalizada não deve ser editada diretamente; ajustes devem ser feitos por cancelamento/extorno ou por observação, seguindo a regra do PDV.

**RN-FIA17.** Cliente inativo não deve ser usado em novas vendas fiadas, mas seu histórico deve continuar disponível.

**RN-FIA18.** O sistema deve permitir consulta do histórico completo do cliente, incluindo compras fiadas, pagamentos, valores em aberto e valores quitados.

**RN-FIA19.** Caso uma dívida seja cancelada, ela não deve ser considerada no total pendente do cliente.

---

# **Conferência com os requisitos coletados**

* **Registrar vendas com data e status:** atendido por `ContaFiado`, `status` e `dataCriacao`.  
* **Cada dívida é 100% editável:** ajustado para uma regra mais segura, permitindo gerenciamento da dívida sem alterar os itens e valores originais da venda finalizada.  
* **Cada venda/dívida guarda os produtos da compra:** atendido pelo vínculo entre `ContaFiado`, `Venda` e `ItemVenda`.  
* **Pode gerar relatórios ou históricos:** atendido pelos requisitos de consulta, histórico de compras, histórico de pagamentos e resumo por período.  
* **Busca baseada em data, nome ou filtros:** atendido pela consulta por cliente, data, status e valor.

Esse módulo está coerente com o PDV e evita duplicar informações da venda.

# Funcionamento

**Contas, Mercadinho e Autenticação**

## **1\. Objetivo do módulo**

O módulo tem como objetivo gerenciar o acesso ao sistema, centralizando a criação e administração de mercadinhos e usuários de forma segura e simplificada.

Ele garante que:

* o sistema tenha um **usuário global APP\_ADMIN**, responsável pela criação de mercadinhos e outros administradores;  
* cada mercadinho tenha uma **conta compartilhada**, usada pela família/equipe;  
* o sistema permita login e acesso aos dados vinculados ao mercadinho correspondente.

Esta abordagem simplifica o gerenciamento, eliminando a necessidade de perfis individuais de funcionário, auditoria detalhada ou cadastro público.

---

## **2\. Estrutura geral**

O módulo é composto por:

1. **Usuário global do sistema (`APP_ADMIN`)**  
   * Cria mercados e outros administradores.  
   * Inicialmente criado automaticamente pelo backend se nenhum existir (Dados sensíveis devem ser passador por V.A.).  
   * Pode criar novos usuários `APP_ADMIN`.  
2. **Mercadinho / Conta de acesso**  
   * Representa o login de um mercado.  
   * Todos os usuários do mercado utilizam a mesma conta.  
   * Não possui múltiplos perfis internos; simplifica o sistema.

---

## **3\. Entidades principais**

### **Usuário**

Campos:

* `id`  
* `mercadoId` opcional (null para APP\_ADMIN)  
* `nome`  
* `username`  
* `email`  
* `senha` (armazenada de forma segura)  
* `tipo` (`APP_ADMIN` ou `MERCADO`)  
* `ativo`

### **Mercado**

Campos:

* `id`  
* `nome`  
* `cnpj` opcional  
* `telefone` opcional  
* `ativo`  
* `dataCriacao`

---

## **4\. Regras de negócio**

**RN-OUT01.** O sistema deve possuir usuários do tipo `APP_ADMIN`, responsáveis pela administração global do sistema.

**RN-OUT02.** Ao iniciar o backend, caso não exista nenhum usuário `APP_ADMIN`, o sistema deverá criar automaticamente um administrador inicial.

**RN-OUT03.** Usuários `APP_ADMIN` podem criar outros usuários `APP_ADMIN`.

**RN-OUT04.** Usuários `APP_ADMIN` podem cadastrar mercados e criar contas de acesso para esses mercados.

**RN-OUT05.** Cada mercadinho possui uma única conta de acesso, compartilhada por todos os usuários daquele mercado.

**RN-OUT06.** Os dados de estoque, vendas, financeiro e fiado devem estar vinculados ao mercadinho correspondente.

**RN-OUT07.** Contas inativas não podem acessar o sistema.

**RN-OUT08.** Uma conta de mercado só pode acessar os dados do próprio mercadinho.

---

## **5\. Fluxo de criação**

1. Backend inicia e verifica se há algum `APP_ADMIN`.  
2. Se não existir, cria automaticamente um APP\_ADMIN inicial com credenciais padrão.  
3. O APP\_ADMIN pode criar novos administradores e novas contas de mercadinhos.  
4. Cada conta de mercadinho gerenciada pelo APP\_ADMIN será utilizada como login compartilhado pelo mercado.

Exemplo:

{  
  "id": 1,  
  "mercadoId": null,  
  "nome": "Administrador do Sistema",  
  "username": "admin",  
  "email": "admin@sistema.com",  
  "senha": "hash",  
  "tipo": "APP\_ADMIN",  
  "ativo": true  
}

{  
  "id": 2,  
  "mercadoId": 1,  
  "nome": "Mercadinho Coutinho",  
  "username": "coutinho",  
  "email": "coutinho@email.com",  
  "senha": "hash",  
  "tipo": "MERCADO",  
  "ativo": true  
}

---

## **6\. Requisitos funcionais**

**RF-OUT01.** O sistema deve permitir login utilizando username ou e-mail.  
**RF-OUT02.** O APP\_ADMIN deve poder criar outros usuários APP\_ADMIN.  
**RF-OUT03.** O APP\_ADMIN deve poder criar novas contas de mercadinho.  
**RF-OUT04.** Cada mercadinho deve ter uma única conta de acesso compartilhada.  
**RF-OUT05.** O APP\_ADMIN deve poder inativar contas de mercadinho sem apagar histórico.  
**RF-OUT06.** Cada conta de mercado só pode acessar dados vinculados ao próprio mercadinho.  
**RF-OUT07.** Usuários inativos não devem conseguir acessar o sistema.  
**RF-OUT08.** Cada mercadinho poderá atualizar suas informações básicas (senha, nome, e-mail) mediante login.

---

## **7\. Considerações de segurança e simplicidade**

* O cadastro público de mercadinhos está **desativado** na V1.  
* O primeiro APP\_ADMIN é criado automaticamente para inicializar o sistema.  
* Todas as contas de mercado são compartilhadas, simplificando o fluxo e evitando a necessidade de múltiplos perfis internos.  
* A arquitetura permite expansão futura, caso se decida implementar perfis individuais por funcionário ou multiconta por mercado.

---

Se você quiser, posso **gerar uma versão final completa do documento** já integrando **todos os módulos funcionais (Estoque, PDV, Financeiro, Fiado e Contas/Autenticação)** em uma única versão formal pronta para entrega. Isso ajudaria a revisar consistência, links de entidades e exemplos JSON de forma uniforme.

# Instruções IA

[image1]: <data:image/png;base64,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>