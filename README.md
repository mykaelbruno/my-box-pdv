# My Box PDV

Sistema de ponto de venda e gestao para pequenos mercadinhos. O repositorio esta
em fase inicial e atualmente possui um prototipo navegavel do frontend com dados
mockados.

## Prototipo frontend

O prototipo cobre login, dashboard, PDV, vendas, caixa, estoque, financeiro,
firmas, clientes/fiado, relatorios, backups, administracao global e conta do
usuario. A interface possui layouts especificos para desktop, tablet e mobile.

Os dados e operacoes sao locais e reiniciam ao recarregar a pagina. Nao existe
backend, autenticacao real, pagamento real ou persistencia nesta etapa.

### Executar

Requisitos:

- Node.js 20 ou superior;
- npm.

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
- registro da entrega: `docs/alteracoes/prototipo-frontend-v1.md`.
