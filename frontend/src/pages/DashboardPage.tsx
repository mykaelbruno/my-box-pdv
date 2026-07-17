import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Boxes,
  CircleDollarSign,
  Clock3,
  PackagePlus,
  ReceiptText,
  Search,
  ShoppingCart,
  WalletCards,
} from 'lucide-react'
import type { ViewId } from '../types'

export function DashboardPage({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <div className="page home-page">
      <header className="home-header">
        <div>
          <span className="home-header__date">Sexta-feira, 17 de julho</span>
          <h1>Bom dia, Coutinho</h1>
          <p>Escolha uma tarefa para começar.</p>
        </div>
        <button className="home-cash-status" onClick={() => onNavigate('caixa')}>
          <span className="home-cash-status__dot" />
          <span><small>CAIXA ABERTO</small><strong>Desde 07:42</strong></span>
          <ArrowRight size={20} />
        </button>
      </header>

      <section className="counter-grid" aria-label="Atalhos principais">
        <button className="counter-primary" onClick={() => onNavigate('pdv')}>
          <span className="counter-primary__icon"><ShoppingCart size={40} strokeWidth={1.8} /></span>
          <span className="counter-primary__copy">
            <small>AÇÃO PRINCIPAL</small>
            <strong>Nova venda</strong>
            <span>Abrir o balcão e adicionar produtos</span>
          </span>
          <span className="counter-primary__footer">
            <span><b>2</b> carrinhos em andamento</span>
            <ArrowRight size={24} />
          </span>
        </button>

        <div className="counter-shortcuts">
          <button className="counter-shortcut counter-shortcut--info" onClick={() => onNavigate('clientes')}>
            <span><WalletCards size={28} /></span>
            <strong>Receber fiado</strong>
            <small>4 clientes em aberto</small>
          </button>
          <button className="counter-shortcut counter-shortcut--warning" onClick={() => onNavigate('estoque')}>
            <span><PackagePlus size={28} /></span>
            <strong>Entrada de estoque</strong>
            <small>Registrar mercadoria</small>
          </button>
          <button className="counter-shortcut" onClick={() => onNavigate('estoque')}>
            <span><Search size={28} /></span>
            <strong>Consultar produto</strong>
            <small>Preço e quantidade</small>
          </button>
          <button className="counter-shortcut counter-shortcut--danger" onClick={() => onNavigate('financeiro')}>
            <span><CircleDollarSign size={28} /></span>
            <strong>Registrar despesa</strong>
            <small>Saída do caixa</small>
          </button>
          <button className="counter-shortcut" onClick={() => onNavigate('vendas')}>
            <span><ReceiptText size={28} /></span>
            <strong>Vendas do dia</strong>
            <small>Consultar e cancelar</small>
          </button>
          <button className="counter-shortcut counter-shortcut--success" onClick={() => onNavigate('caixa')}>
            <span><Banknote size={28} /></span>
            <strong>Movimento do caixa</strong>
            <small>Entradas e sangrias</small>
          </button>
        </div>
      </section>

      <section className="home-section">
        <header className="home-section__header">
          <div><span>PRECISA DE ATENÇÃO</span><h2>Pendências de hoje</h2></div>
          <strong>3</strong>
        </header>
        <div className="attention-grid">
          <button onClick={() => onNavigate('estoque')}>
            <span className="attention-grid__icon attention-grid__icon--danger"><Boxes size={24} /></span>
            <span><strong>Café Torrado zerou</strong><small>O estoque mínimo é 12 unidades</small></span>
            <ArrowRight size={21} />
          </button>
          <button onClick={() => onNavigate('financeiro')}>
            <span className="attention-grid__icon attention-grid__icon--warning"><AlertTriangle size={24} /></span>
            <span><strong>Conta de energia vencida</strong><small>R$ 486,72, vencida há 2 dias</small></span>
            <ArrowRight size={21} />
          </button>
          <button onClick={() => onNavigate('clientes')}>
            <span className="attention-grid__icon attention-grid__icon--info"><WalletCards size={24} /></span>
            <span><strong>Dona Maria está em aberto</strong><small>R$ 186,40 em 3 compras</small></span>
            <ArrowRight size={21} />
          </button>
        </div>
      </section>

      <section className="home-section home-section--summary">
        <header className="home-section__header">
          <div><span>RESUMO SIMPLES</span><h2>Como está o dia</h2></div>
          <button onClick={() => onNavigate('relatorios')}>Ver detalhes <ArrowRight size={18} /></button>
        </header>
        <div className="day-summary">
          <div><span><ReceiptText size={20} /> Vendas</span><strong>42</strong><small>12 a mais que ontem</small></div>
          <div><span><Banknote size={20} /> Recebido</span><strong>R$ 2.847,60</strong><small>Dinheiro, Pix e cartão</small></div>
          <div><span><WalletCards size={20} /> Fiado</span><strong>R$ 248,30</strong><small>3 vendas hoje</small></div>
          <div><span><Clock3 size={20} /> Caixa</span><strong>8h24</strong><small>Aberto desde 07:42</small></div>
        </div>
      </section>
    </div>
  )
}
