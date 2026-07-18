# My Box PDV

Sistema de ponto de venda e gestao para pequenos mercadinhos. O repositorio esta
em fase inicial e atualmente possui um prototipo navegavel do frontend com dados
mockados.

## Prototipo frontend

O prototipo cobre login, inicio operacional, PDV, vendas, caixa, estoque, financeiro,
firmas, clientes/fiado, relatorios, backups, administracao global e conta do
usuario. A interface e mobile-first e prioriza cards, botoes grandes, atalhos de
balcao e leitura facilitada. Desktop e tablet preservam maior densidade para
consultas e analises.

Os dados e operacoes sao locais e reiniciam ao recarregar a pagina. Nao existe
backend, autenticacao real, pagamento real ou persistencia nesta etapa.

O leitor de codigo de barras e QR Code usa a camera do dispositivo. O navegador
deve receber permissao de camera e a aplicacao precisa ser acessada por `HTTPS`
ou por `localhost`. Quando a camera nao estiver disponivel, o mesmo modal permite
informar o codigo manualmente.

### Executar

Requisitos:

- Node.js 20 ou superior;
- npm.

O frontend usa `@zxing/browser` para decodificar codigos pela camera. A
dependencia e carregada somente quando o leitor e aberto.

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`. O login ja vem preenchido para o perfil de mercado.
O seletor da tela de login permite testar tambem o perfil `APP_ADMIN`.

### Validar

```bash
cd frontend
npm run typecheck
npm run build
```

## Documentacao

- backlog: `docs/My Box PDV - Backlog.md`;
- prompt de interface: `docs/prompt-figma-prototipo-my-box-pdv.md`;
- planejamento do prototipo: `docs/planejamento/prototipo-frontend-v1.md`;
- planejamento mobile-first: `docs/planejamento/reformulacao-frontend-mobile-first.md`;
- registro do prototipo: `docs/alteracoes/prototipo-frontend-v1.md`;
- registro da reformulacao: `docs/alteracoes/reformulacao-frontend-mobile-first.md`.
