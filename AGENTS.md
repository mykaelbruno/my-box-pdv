# AGENTS.md - Guia de trabalho do projeto My Box PDV

Este arquivo orienta como agentes de IA devem planejar, implementar, testar,
documentar e entregar alteracoes neste repositorio.

O objetivo principal e manter o projeto seguro, incremental, compreensivel e sob
controle do responsavel pelo projeto.

## Estado atual do repositorio

- Projeto: `my-box-pdv`.
- O repositorio ainda esta no inicio.
- Pastas esperadas: `backend/`, `frontend/` e `docs/`.
- Nao assumir que comandos, dependencias ou arquitetura ja existem. Antes de
  alterar codigo, inspecionar os arquivos reais do projeto.

## Idioma e comunicacao

- Responder em portugues, salvo pedido explicito em outro idioma.
- Explicar decisoes tecnicas de forma objetiva.
- Avisar quando uma informacao foi assumida, inferida ou ainda depende de
  decisao do responsavel.
- Nao afirmar que testes, builds ou validacoes foram executados sem realmente
  executar.

## Principios obrigatorios

- Nao inventar regras de negocio, permissoes, autorizacoes ou fluxos.
- Nao ampliar o escopo silenciosamente.
- Nao implementar funcionalidades futuras sem solicitacao explicita.
- Nao deixar credenciais, segredos, codigo provisiorio critico, mocks de negocio
  ou `TODO` critico sem informar claramente.
- Priorizar, nesta ordem: seguranca, regras de negocio, corretude, clareza,
  manutencao, testabilidade, desempenho e conveniencia.
- Preservar alteracoes feitas pelo usuario. Nunca reverter trabalho existente
  sem autorizacao clara.

## Planejamento antes de implementar

Toda alteracao deve ter planejamento proporcional ao risco.

Para alteracoes pequenas, basta um plano curto na conversa, contendo:

- objetivo;
- arquivos ou areas afetadas;
- validacao prevista.

Para alteracoes grandes ou sensiveis, criar ou atualizar documento em
`docs/planejamento/` antes da implementacao. Considerar grande ou sensivel
qualquer mudanca que envolva:

- novo modulo;
- nova regra de negocio;
- autenticacao ou autorizacao;
- modelo de dados;
- migrations;
- novos endpoints ou mudanca de contrato de API;
- integracao externa;
- envio de e-mail;
- processamento assincrono;
- mudanca arquitetural;
- Docker, conteinerizacao, CI/CD ou deploy;
- risco de seguranca;
- alteracao em multiplas camadas.

Antes de implementar mudancas grandes, apresentar o plano e aguardar aprovacao.
Se o responsavel ja forneceu uma ordem clara e pediu para implementar, isso pode
ser tratado como aprovacao, desde que nao existam ambiguidades relevantes.

## Desenvolvimento incremental

- Implementar por etapas pequenas, revisaveis e testaveis.
- Nao tentar construir o sistema inteiro de uma vez.
- Nao iniciar outro modulo automaticamente ao concluir uma etapa.
- Registrar necessidades fora do escopo como pendencias ou sugestoes, sem
  implementa-las automaticamente.
- Preparar o codigo para evolucao futura e permitido; implementar o futuro sem
  pedido explicito nao e permitido.

## Stack alvo

### Backend

Usar como base:

- Java;
- Spring Boot;
- Spring Web;
- Spring Data JPA;
- Spring Security;
- Bean Validation;
- JWT para access token;
- refresh token para renovacao de sessao;
- PostgreSQL;
- Flyway;
- Swagger/OpenAPI.

### Banco de dados

- Usar PostgreSQL.
- Toda mudanca estrutural deve passar por migration do Flyway.
- Nao usar geracao automatica de tabelas pelo Hibernate.
- Configurar Hibernate para validar schema:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

- Nao alterar migrations ja aplicadas; criar nova migration para correcao.
- Definir constraints, chaves estrangeiras, indices e regras de unicidade no
  banco quando forem parte da regra.
- Mudancas destrutivas devem ser planejadas, documentadas e aprovadas.

### Frontend

Usar como base:

- React;
- TypeScript;
- Vite;
- Axios.

O frontend deve ser desacoplado do backend e organizado por responsabilidade:

- componentes;
- paginas;
- layouts;
- rotas;
- services de API;
- hooks;
- contextos;
- tipos;
- validacoes;
- utilitarios;
- constantes.

## Arquitetura do backend

Seguir o fluxo conceitual:

```text
Model -> Repository -> Service -> Controller
```

Regras:

- Controllers recebem requisicoes, validam entrada, delegam aos services e
  retornam DTOs.
- Controllers nao devem conter regra de negocio nem acessar repositories
  diretamente.
- Services concentram regras de negocio, validacoes de dominio, transacoes e
  coordenacao do fluxo.
- Services nao devem retornar `ResponseEntity`.
- Repositories cuidam de persistencia e consultas.
- Entidades JPA nao devem ser expostas diretamente na API.
- Usar DTOs especificos para entrada e saida.

## Organizacao de pacotes do backend

Separar responsabilidades em dois grupos principais quando o backend for criado:

```text
core/
  dominio, entidades, DTOs de dominio, repositories, services, regras de negocio,
  enums e excecoes de negocio

infra/
  configuracao, seguranca, JWT, filtros, OpenAPI, tratamento global de erros,
  logs, integracoes externas e detalhes tecnicos
```

Subpacotes podem ser criados conforme necessidade, desde que melhorem a clareza.

## Qualidade de codigo

- Usar nomes claros e consistentes.
- Preferir portugues para conceitos de dominio.
- Manter termos tecnicos conhecidos quando forem mais claros, como
  `Controller`, `Service`, `Repository`, `DTO`, `Exception`, `Config` e `Filter`.
- Usar injecao por construtor.
- Nao usar field injection com `@Autowired`.
- Evitar classes e metodos muito grandes.
- Evitar duplicacao e dependencias circulares.
- Nao criar interfaces, abstracoes ou design patterns sem necessidade real.
- Nao usar `double` para valores monetarios.
- Tratar nulos explicitamente.
- Nao silenciar excecoes.
- Nao usar `catch` vazio.
- Nao retornar `null` de forma inesperada.
- Remover codigo morto.

## Seguranca

Tratar o sistema como aplicacao de producao exposta na web.

Regras obrigatorias:

- Usar Spring Security.
- Usar access token JWT com expiracao curta.
- Usar refresh token com expiracao propria.
- Armazenar refresh tokens de forma segura.
- Permitir revogacao de refresh tokens.
- Invalidar ou revogar sessao no logout.
- Nao armazenar senhas em texto puro.
- Usar BCrypt ou Argon2 para hash de senha.
- Usar variaveis de ambiente para dados sensiveis.
- Nao versionar credenciais nem arquivos `.env`.
- Criar `.env.example` sem valores reais quando variaveis forem necessarias.
- Configurar CORS explicitamente.
- Validar autorizacao no backend, nunca apenas no frontend.
- Evitar exposicao desnecessaria de dados.
- Nao inserir dados sensiveis em URLs.

Nunca registrar em logs:

- senhas;
- access tokens;
- refresh tokens;
- segredos;
- chaves privadas;
- credenciais;
- codigos de recuperacao;
- dados pessoais completos sem necessidade.

Avaliar riscos de SQL injection, XSS, CSRF, mass assignment, IDOR, autenticacao
quebrada, autorizacao incorreta, vazamento em logs, configuracao insegura e
dependencias vulneraveis.

## Autenticacao

Quando o modulo de autenticacao for implementado:

- Login deve aceitar um unico identificador que represente `username` ou `email`.
- Nao criar endpoints separados apenas para login por username e por e-mail.
- `username` e `email` devem ser unicos na aplicacao e no banco.
- E-mails devem ser normalizados.
- Mensagens de falha de login nao devem facilitar enumeracao de usuarios.
- Regras para usuario inativo, bloqueado ou nao confirmado devem ser definidas
  antes da implementacao.
- Contrato da API deve estar documentado no Swagger/OpenAPI.

## Erros e logs

- Criar tratamento global de excecoes com `@RestControllerAdvice`.
- Padronizar respostas de erro.
- Nao expor stack trace, SQL, tokens, segredos ou detalhes internos.
- Diferenciar validacao, nao encontrado, conflito, regra de negocio, nao
  autenticado, nao autorizado, erro de integracao e erro interno.
- Usar logs com niveis coerentes: `DEBUG`, `INFO`, `WARN`, `ERROR`.
- Nao usar `System.out.println`.
- Nao registrar o mesmo erro repetidamente em todas as camadas.
- Registrar contexto util sem expor dados sensiveis.

## Swagger e contratos de API

Manter Swagger/OpenAPI atualizado sempre que houver endpoint novo ou alterado.

Documentar, conforme aplicavel:

- objetivo do endpoint;
- metodo e caminho;
- parametros;
- corpo da requisicao;
- exemplos;
- respostas de sucesso e erro;
- codigos HTTP;
- autenticacao e permissoes;
- regras de negocio relevantes;
- paginacao, filtros e ordenacao.

Mudancas de contrato devem ser destacadas na documentacao da alteracao.

## Testes

Testes fazem parte da entrega.

Criar testes proporcionais ao risco da alteracao. Cobrir, conforme aplicavel:

- fluxo principal;
- entradas invalidas;
- nulos, strings vazias e espacos em branco;
- limites minimos e maximos;
- registros inexistentes;
- duplicidade e conflitos;
- regras de negocio;
- autenticacao e autorizacao;
- erros esperados;
- persistencia e rollback;
- regressao de bugs corrigidos;
- ausencia de exposicao de dados sensiveis.

Preferencias:

- Testar comportamento e resultado, nao apenas chamadas internas.
- Evitar testes frageis ou dependentes de ordem.
- Usar mocks com proposito claro.
- Para integracao com banco, preferir PostgreSQL real/Testcontainers quando
  possivel.
- Nao trocar PostgreSQL por H2 quando o comportamento do banco for relevante.

Sempre informar quais testes foram executados e quais nao foram.

## Frontend

- Usar TypeScript com tipagem rigorosa.
- Evitar `any`.
- Centralizar contratos de API e configuracao do Axios.
- Padronizar tratamento de erros.
- Tratar estados de carregamento, sucesso, erro, ausencia de dados, sessao
  expirada e falta de permissao.
- Separar apresentacao, estado e comunicacao com API.
- Criar hooks e componentes reutilizaveis apenas quando houver ganho real.
- Nao armazenar dados sensiveis de forma insegura.
- Planejar a estrategia de tokens considerando XSS e CSRF.
- Nao implementar autenticacao no frontend antes do contrato do backend.

## Docker, conteinerizacao e deploy

O backend, o frontend e as dependencias necessarias para execucao local devem
ser pensados para rodar com Docker, mas a configuracao de producao deve ser
planejada antes de ser implementada.

Nao presumir provedor de nuvem, dominio, registry, proxy reverso, certificados,
armazenamento, backup, CI/CD ou estrategia de deploy sem aprovacao.

Arquivos esperados, conforme o escopo evoluir:

```text
backend/
  Dockerfile
  .dockerignore
frontend/
  Dockerfile
  .dockerignore
compose.yaml
compose.dev.yaml
compose.prod.yaml
.env.example
```

A organizacao pode mudar durante o planejamento, desde que mantenha separacao
clara entre desenvolvimento e producao.

### Dockerfiles

- Usar builds multi-stage.
- Separar etapa de build da imagem final.
- Usar imagens oficiais, mantidas e com versoes fixadas.
- Nao usar `latest` em producao.
- Preferir imagens finais minimas, compativeis com a aplicacao.
- Executar aplicacoes com usuario sem privilegios de root.
- Nao instalar ferramentas desnecessarias na imagem final.
- Usar `.dockerignore` para evitar copiar `.git`, `.env`, credenciais, logs,
  artefatos locais, diretorios de IDE e dependencias reinstaladas no build.
- Nao colocar segredos em `Dockerfile`, argumentos de build, Compose versionado
  ou camadas da imagem.
- Falhas de compilacao, empacotamento ou testes obrigatorios devem interromper
  o build.

### Backend em container

- Executar somente o artefato necessario da aplicacao.
- Receber configuracoes por variaveis de ambiente.
- Publicar somente portas necessarias.
- Registrar logs em `stdout` e `stderr`.
- Possuir health check adequado.
- Encerrar corretamente ao receber sinais de parada.
- Respeitar limites de memoria do container.
- Definir e documentar configuracoes de JVM para producao durante o planejamento
  do deploy.

### Frontend em container

- Separar build de producao do ambiente de desenvolvimento.
- Em producao, servir apenas os artefatos estaticos gerados pelo Vite.
- Nao usar o servidor de desenvolvimento do Vite em producao.
- Nao incluir dependencias de desenvolvimento na imagem final.
- Planejar como a URL publica da API sera configurada.
- Configurar suporte correto a rotas React.
- Aplicar headers de seguranca quando o container for responsavel por servir os
  arquivos.
- Lembrar que variaveis incorporadas ao build do frontend sao publicas no
  navegador e nunca devem conter segredos.

### Docker Compose

- Separar configuracoes de desenvolvimento e producao.
- Desenvolvimento pode usar bind mounts, hot reload, portas locais e logs mais
  detalhados.
- Producao nao deve usar hot reload, servidor de desenvolvimento, bind mount do
  codigo-fonte, credenciais padrao ou portas administrativas expostas.
- Cada servico deve ter nome claro, variaveis de ambiente, rede definida, portas
  explicitas, volumes apropriados e health check quando aplicavel.
- `depends_on` sozinho nao garante que uma dependencia esta pronta para uso.
- A aplicacao deve lidar com indisponibilidade temporaria de servicos na
  inicializacao.

### Banco, Flyway e migrations no deploy

- PostgreSQL deve usar armazenamento persistente quando a persistencia for
  necessaria.
- Em producao, definir backup, retencao, restauracao testada, acesso seguro e
  politica de atualizacao.
- Nao expor PostgreSQL publicamente.
- Migrations continuam sendo gerenciadas exclusivamente pelo Flyway.
- Antes de deploy, definir quando e por quem as migrations serao executadas,
  como falhas serao tratadas e como sera validada a compatibilidade entre
  aplicacao e banco.
- Nao executar migrations concorrentes em multiplas instancias sem avaliar o
  comportamento do Flyway.
- Preferir mudancas de banco compativeis com rollback. Mudancas destrutivas
  devem ser divididas em etapas seguras.

### Seguranca de deploy

- Toda configuracao variavel deve ficar fora da imagem.
- Arquivos `.env` reais devem estar no `.gitignore`.
- `.env.example` deve conter apenas nomes e exemplos seguros.
- Segredos devem ter estrategia de armazenamento, acesso, rotacao e revogacao.
- Expor somente portas necessarias.
- Nao usar `privileged: true`.
- Nao montar o socket Docker sem necessidade aprovada.
- Nao considerar rede Docker como unica barreira de seguranca.
- Endpoints administrativos e Actuator nao devem ser expostos publicamente sem
  protecao.
- Para exposicao publica, planejar HTTPS, dominio, DNS, certificados, proxy
  reverso, CORS, headers de seguranca, timeouts, tamanho maximo de requisicao e
  rate limiting.

### Imagens, CI/CD e rollback

- Imagens devem possuir tags rastreaveis, associadas a versao, release, commit
  ou ambiente.
- Cada deploy deve permitir identificar codigo, imagem, migrations,
  configuracao e data.
- Nao modificar manualmente containers ou imagens implantadas.
- Avaliar vulnerabilidades de imagens e dependencias antes de producao.
- Quando disponivel, gerar SBOM das imagens relevantes.
- CI/CD deve ser planejado antes da automacao.
- Pipeline de deploy deve falhar quando testes obrigatorios, build, validacao de
  migrations, analise de vulnerabilidades ou health check pos-deploy falharem.
- Todo deploy de producao deve possuir estrategia de rollback.
- Rollback deve considerar imagem anterior, configuracao anterior,
  compatibilidade do banco, migrations aplicadas e dados criados pela nova
  versao.
- Nao afirmar que ha rollback seguro quando migrations incompativeis impedirem o
  retorno da aplicacao.

### Documentacao de deploy

Quando conteinerizacao ou deploy forem implementados, documentar conforme
necessario:

```text
docs/planejamento/deploy.md
docs/arquitetura/conteinerizacao.md
docs/seguranca/seguranca-de-deploy.md
```

A documentacao deve cobrir servicos, portas, redes, volumes, variaveis,
secrets, comandos de build e execucao, migrations, health checks, logs, backup,
atualizacao, rollback e problemas comuns.

### Validacoes de Docker

Validar, conforme aplicavel:

- build do backend;
- build do frontend;
- inicializacao dos servicos;
- comunicacao entre containers;
- conexao com PostgreSQL;
- execucao do Flyway;
- persistencia do banco;
- health checks;
- encerramento gracioso;
- ausencia de segredos nas imagens;
- execucao com usuario nao root;
- rotas do frontend;
- comunicacao do frontend com a API;
- processo de atualizacao e rollback.

## Documentacao

Manter `docs/` simples e organizada.

Estrutura sugerida:

```text
docs/
  alteracoes/
  api/
  arquitetura/
  planejamento/
  requisitos/
  seguranca/
```

Usar `docs/planejamento/` para planos de modulos e mudancas grandes.
Usar `docs/alteracoes/` para registrar entregas relevantes.
Usar `docs/requisitos/` para regras de negocio, atores, permissoes e criterios
de aceite.
Usar `docs/seguranca/` para decisoes de autenticacao, autorizacao, tokens,
variaveis sensiveis e riscos.

Atualizar `README.md` quando houver mudanca que afete instalacao, execucao,
configuracao, comandos, variaveis de ambiente ou visao geral do projeto.

## Entrega apos cada alteracao

Ao finalizar uma alteracao, informar de forma objetiva:

- o que foi alterado;
- arquivos principais;
- como o fluxo funciona, se relevante;
- testes e validacoes executados;
- testes nao executados e motivo;
- impactos de seguranca;
- documentacao atualizada;
- pendencias, riscos ou decisoes em aberto;
- proximo passo recomendado.

Para alteracoes de Docker ou deploy, informar tambem:

- imagens criadas ou alteradas;
- versoes das imagens base;
- servicos afetados;
- portas, redes e volumes;
- variaveis e secrets necessarios;
- migrations envolvidas;
- comandos validados;
- ambiente testado;
- vulnerabilidades encontradas;
- procedimento de atualizacao e rollback.

Para alteracoes pequenas, o relatorio final pode ser curto. Para alteracoes
grandes, deve ser mais detalhado.

## Definicao de pronto

Uma alteracao so deve ser considerada pronta quando:

- o escopo solicitado foi atendido;
- ambiguidades relevantes foram resolvidas ou registradas;
- arquitetura e padroes do projeto foram respeitados;
- entradas, erros e seguranca foram considerados;
- testes relevantes foram criados e executados quando possivel;
- migrations e Swagger foram atualizados quando aplicavel;
- documentacao e README foram atualizados quando necessario;
- pendencias e limitacoes foram informadas;
- nao ha credenciais versionadas.

Para deploy, tambem deve existir estrategia definida para health checks, logs,
backup, restauracao, versionamento de imagens, seguranca de secrets e rollback.

## Comandos do projeto

O frontend possui os seguintes comandos confirmados:

```bash
# frontend
cd frontend
npm install
npm run dev
npm run build
npm run typecheck
```

O backend ainda nao foi criado e nao possui comandos confirmados. Nao inventar
comandos no relatorio final. Se um comando ainda nao existir, informar que ele
ainda nao foi definido.
