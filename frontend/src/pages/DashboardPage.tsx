import { AlertCircle, ArrowRight, Banknote, Boxes, CircleDollarSign, Clock3, PackagePlus, ReceiptText, ShoppingCart, TrendingUp, UserRoundCheck, WalletCards } from 'lucide-react'
import type { ViewId } from '../types'
import { money, recentSales } from '../data/mockData'
import { Badge, Button, Metric, PageHeader, Section } from '../components/Ui'

export function DashboardPage({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Sexta-feira, 17 de julho"
        title="Bom dia, Coutinho"
        description="O caixa está aberto e o movimento segue acima de ontem."
        actions={<Button variant="primary" icon={<ShoppingCart size={18} />} onClick={() => onNavigate('pdv')}>Abrir PDV</Button>}
      />

      <section className="dashboard-pulse">
        <div className="pulse-main">
          <div className="pulse-main__head"><span>Recebido hoje</span><Badge tone="success"><TrendingUp size={13} /> 12,4%</Badge></div>
          <strong>R$ 2.847,60</strong>
          <div className="pulse-main__meta"><span><b>42</b> vendas</span><span><b>R$ 67,80</b> ticket médio</span><span><b>8h24</b> de caixa</span></div>
          <div className="sales-bars" aria-label="Vendas por hora">
            {[22, 34, 28, 58, 48, 78, 65, 92, 74, 84, 56, 68].map((height, index) => <span key={index} style={{ height: `${height}%` }} className={index === 7 ? 'peak' : ''} />)}
          </div>
          <div className="sales-bars__labels"><span>08h</span><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span></div>
        </div>
        <div className="pulse-side">
          <Metric label="Em fiado" value="R$ 248,30" detail="3 vendas hoje" tone="warning" icon={<UserRoundCheck size={18} />} />
          <Metric label="Contas abertas" value="R$ 3.420,00" detail="1 vencida" tone="danger" icon={<ReceiptText size={18} />} />
          <Metric label="Estoque baixo" value="2 produtos" detail="1 item zerado" tone="warning" icon={<Boxes size={18} />} />
          <Metric label="Caixa" value="Aberto" detail="Desde 07:42" tone="success" icon={<Clock3 size={18} />} />
        </div>
      </section>

      <div className="quick-actions" aria-label="Ações rápidas">
        <button onClick={() => onNavigate('pdv')}><span><ShoppingCart size={20} /></span><div><strong>Nova venda</strong><small>Iniciar no balcão</small></div><ArrowRight size={17} /></button>
        <button onClick={() => onNavigate('estoque')}><span><PackagePlus size={20} /></span><div><strong>Entrada de estoque</strong><small>Registrar mercadoria</small></div><ArrowRight size={17} /></button>
        <button onClick={() => onNavigate('financeiro')}><span><CircleDollarSign size={20} /></span><div><strong>Registrar despesa</strong><small>Nova conta financeira</small></div><ArrowRight size={17} /></button>
        <button onClick={() => onNavigate('clientes')}><span><Banknote size={20} /></span><div><strong>Receber fiado</strong><small>Baixar pagamento</small></div><ArrowRight size={17} /></button>
      </div>

      <div className="dashboard-grid">
        <Section title="Últimas vendas" action={<Button variant="quiet" onClick={() => onNavigate('vendas')}>Ver todas <ArrowRight size={16} /></Button>}>
          <div className="data-list sales-list">
            <div className="data-list__head"><span>Venda</span><span>Pagamento</span><span>Itens</span><span>Total</span><span>Status</span></div>
            {recentSales.slice(0, 4).map((sale) => (
              <button className="data-row" key={sale.id} onClick={() => onNavigate('vendas')}>
                <span><strong>{sale.id}</strong><small>{sale.time} · {sale.customer}</small></span>
                <span>{sale.payment}</span><span>{sale.items}</span><strong>{money(sale.total)}</strong>
                <Badge tone={sale.status === 'Finalizada' ? 'success' : 'danger'}>{sale.status}</Badge>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Atenção agora" action={<span className="section-count">4 alertas</span>}>
          <div className="alert-list">
            <button onClick={() => onNavigate('estoque')}><span className="alert-icon alert-icon--danger"><AlertCircle size={18} /></span><div><strong>Café Torrado zerou</strong><small>Estoque mínimo: 12 un.</small></div><ArrowRight size={16} /></button>
            <button onClick={() => onNavigate('financeiro')}><span className="alert-icon alert-icon--warning"><ReceiptText size={18} /></span><div><strong>Conta de energia vencida</strong><small>R$ 486,72 · há 2 dias</small></div><ArrowRight size={16} /></button>
            <button onClick={() => onNavigate('clientes')}><span className="alert-icon alert-icon--info"><WalletCards size={18} /></span><div><strong>Dona Maria em aberto</strong><small>R$ 186,40 em 3 dívidas</small></div><ArrowRight size={16} /></button>
            <button onClick={() => onNavigate('backups')}><span className="alert-icon alert-icon--success"><Boxes size={18} /></span><div><strong>Backup concluído</strong><small>Hoje, às 03:00</small></div><ArrowRight size={16} /></button>
          </div>
        </Section>
      </div>

      <section className="payment-composition">
        <div><span>Formas de pagamento hoje</span><strong>R$ 3.095,90 movimentados</strong></div>
        <div className="payment-stack"><span style={{ width: '34%' }} className="money" /><span style={{ width: '29%' }} className="pix" /><span style={{ width: '29%' }} className="card" /><span style={{ width: '8%' }} className="credit" /></div>
        <div className="payment-legend"><span><i className="money" />Dinheiro <b>34%</b></span><span><i className="pix" />Pix <b>29%</b></span><span><i className="card" />Cartão <b>29%</b></span><span><i className="credit" />Fiado <b>8%</b></span></div>
      </section>
    </div>
  )
}

