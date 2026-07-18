import { useState } from 'react'
import { Banknote, CalendarDays, Check, ChevronRight, Clock3, Filter, LockKeyhole, Plus, ReceiptText, Search, WalletCards, XCircle } from 'lucide-react'
import { currentCash, money, recentSales } from '../data/mockData'
import { Badge, Button, Field, Metric, Modal, NumericInput, PageHeader, Section, Toast } from '../components/Ui'

export function SalesPage() {
  const [salesData, setSalesData] = useState([...recentSales])
  const [selected, setSelected] = useState<(typeof recentSales)[number] | null>(null)
  const [query, setQuery] = useState('')
  const [posteriorOpen, setPosteriorOpen] = useState(false)
  const [posteriorDate, setPosteriorDate] = useState('2026-07-16')
  const [posteriorTime, setPosteriorTime] = useState('18:30')
  const [posteriorCustomer, setPosteriorCustomer] = useState('Balcão')
  const [posteriorPayment, setPosteriorPayment] = useState('Dinheiro')
  const [posteriorItems, setPosteriorItems] = useState(1)
  const [posteriorTotal, setPosteriorTotal] = useState(0)
  const [toast, setToast] = useState('')
  const sales = salesData.filter((sale) => sale.id.includes(query) || sale.customer.toLowerCase().includes(query.toLowerCase()))

  const savePosteriorSale = () => {
    if (posteriorTotal <= 0 || posteriorItems <= 0) return
    const nextCode = Math.max(...salesData.map((sale) => Number(sale.id.replace('#', ''))), 0) + 1
    setSalesData((current) => [{ id: `#${nextCode}`, time: posteriorTime, items: posteriorItems, customer: posteriorCustomer.trim() || 'Balcão', payment: posteriorPayment, total: posteriorTotal, status: 'Finalizada' }, ...current])
    setPosteriorOpen(false)
    setToast(`Venda posterior #${nextCode} registrada em ${new Date(`${posteriorDate}T12:00:00`).toLocaleDateString('pt-BR')}`)
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Operação" title="Vendas" description="Consulte vendas finalizadas, abertas e canceladas." actions={<Button icon={<Plus size={18} />} onClick={() => setPosteriorOpen(true)}>Venda posterior</Button>} />
      <div className="filterbar"><label className="filter-search"><Search size={18} /><input placeholder="Buscar número ou cliente" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button><CalendarDays size={17} /> Hoje</button><button><Filter size={17} /> Filtros</button></div>
      <div className="table-shell">
        <div className="table-title"><div><strong>Movimento de hoje</strong><small>{sales.length} vendas encontradas</small></div><span className="table-total">Total <b>{money(sales.reduce((sum, sale) => sum + (sale.status === 'Finalizada' ? sale.total : 0), 0))}</b></span></div>
        <div className="responsive-table sales-table-full">
          <div className="responsive-table__head"><span>Venda</span><span>Data e hora</span><span>Cliente</span><span>Pagamento</span><span>Itens</span><span>Total</span><span>Status</span><span /></div>
          {sales.map((sale) => <button className="responsive-table__row" key={sale.id} onClick={() => setSelected(sale)}><span data-label="Venda"><strong>{sale.id}</strong></span><span data-label="Data"><small>17/07/2026</small><strong>{sale.time}</strong></span><span data-label="Cliente">{sale.customer}</span><span data-label="Pagamento">{sale.payment}</span><span data-label="Itens">{sale.items}</span><strong data-label="Total">{money(sale.total)}</strong><span data-label="Status"><Badge tone={sale.status === 'Finalizada' ? 'success' : 'danger'}>{sale.status}</Badge></span><ChevronRight size={17} /></button>)}
        </div>
      </div>

      {selected && <Modal title={`Venda ${selected.id}`} description={`17 de julho de 2026 às ${selected.time}`} onClose={() => setSelected(null)} size="large" footer={<><Button variant="quiet" onClick={() => setSelected(null)}>Fechar</Button>{selected.status === 'Finalizada' && <Button variant="danger" icon={<XCircle size={17} />}>Estornar venda</Button>}</>}>
        <div className="detail-status"><Badge tone={selected.status === 'Finalizada' ? 'success' : 'danger'}>{selected.status}</Badge><span><LockKeyhole size={15} /> Itens e valores bloqueados após finalização</span></div>
        <div className="detail-summary"><span><small>Cliente</small><strong>{selected.customer}</strong></span><span><small>Operador</small><strong>Coutinho</strong></span><span><small>Pagamento</small><strong>{selected.payment}</strong></span><span><small>Total</small><strong>{money(selected.total)}</strong></span></div>
        <Section title="Itens da venda"><div className="detail-items"><div><span>Feijão Carioca</span><small>2 × 1 kg</small><strong>{money(14)}</strong></div><div><span>Óleo de Soja</span><small>1 × Unidade</small><strong>{money(8.9)}</strong></div><div><span>Outros itens</span><small>{Math.max(0, selected.items - 2)} itens</small><strong>{money(Math.max(0, selected.total - 22.9))}</strong></div></div></Section>
        <Field label="Observação"><textarea placeholder="Adicionar observação à venda" /></Field>
      </Modal>}
      {posteriorOpen && <Modal title="Registrar venda posterior" description="Inclua uma venda realizada anteriormente e que ainda não consta no movimento." onClose={() => setPosteriorOpen(false)} size="large" footer={<><Button variant="quiet" onClick={() => setPosteriorOpen(false)}>Cancelar</Button><Button variant="primary" disabled={posteriorTotal <= 0 || posteriorItems <= 0} onClick={savePosteriorSale}>Registrar venda</Button></>}><div className="posterior-sale-notice"><Clock3 size={19} /><span><strong>Registro retroativo</strong><small>A venda entrará no histórico com a data e o meio de pagamento informados.</small></span></div><div className="form-grid"><Field label="Data da venda"><input type="date" value={posteriorDate} max="2026-07-17" onChange={(event) => setPosteriorDate(event.target.value)} /></Field><Field label="Horário"><input type="time" value={posteriorTime} onChange={(event) => setPosteriorTime(event.target.value)} /></Field><Field label="Cliente ou referência"><input value={posteriorCustomer} placeholder="Balcão" onChange={(event) => setPosteriorCustomer(event.target.value)} /></Field><Field label="Meio de pagamento"><select value={posteriorPayment} onChange={(event) => setPosteriorPayment(event.target.value)}><option>Dinheiro</option><option>Pix</option><option>Cartão</option><option>Fiado</option></select></Field><Field label="Quantidade de itens"><NumericInput decimalScale={0} min={1} value={posteriorItems} onValueChange={setPosteriorItems} /></Field><Field label="Total da venda"><NumericInput min={0.01} value={posteriorTotal} onValueChange={setPosteriorTotal} /></Field></div><Field label="Observação"><textarea placeholder="Motivo do lançamento posterior ou detalhes úteis" /></Field></Modal>}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}

export function CashPage({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [modal, setModal] = useState<'open' | 'close' | null>(null)
  const [openingAmount, setOpeningAmount] = useState(200)
  const [toast, setToast] = useState('')
  const paymentTotals = [
    { label: 'Dinheiro', value: currentCash.payments.dinheiro, detail: '18 vendas', icon: Banknote },
    { label: 'Pix', value: currentCash.payments.pix, detail: '13 vendas', icon: WalletCards },
    { label: 'Cartão', value: currentCash.payments.cartao, detail: '8 vendas', icon: WalletCards },
    { label: 'Fiado', value: currentCash.payments.fiado, detail: `${currentCash.creditSalesCount} vendas`, icon: Clock3 },
  ]
  const totalSales = paymentTotals.reduce((sum, payment) => sum + payment.value, 0)

  const toggleCash = () => {
    onOpenChange(!open)
    setModal(null)
    setToast(open ? 'Caixa fechado e resumo registrado' : 'Caixa aberto com sucesso')
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Controle diário" title="Caixa" description={open ? `Aberto desde ${currentCash.openedAt} por ${currentCash.operator}.` : 'Nenhum caixa aberto no momento.'} actions={<Button variant={open ? 'danger' : 'primary'} icon={open ? <LockKeyhole size={18} /> : <Banknote size={18} />} onClick={() => setModal(open ? 'close' : 'open')}>{open ? 'Fechar caixa' : 'Abrir caixa'}</Button>} />

      {open ? <>
        <div className="cash-banner"><div><span className="cash-banner__pulse" /><span><strong>Caixa em andamento</strong><small>{currentCash.elapsed} de operação · atualização agora</small></span></div><strong>{money(currentCash.receivedTotal)}</strong></div>
        <div className="metrics-grid metrics-grid--five"><Metric label="Total vendido" value={money(currentCash.salesTotal)} detail={`${currentCash.salesCount} vendas`} featured icon={<ReceiptText size={18} />} /><Metric label="Recebido" value={money(currentCash.receivedTotal)} detail="92% do vendido" tone="success" icon={<Check size={18} />} /><Metric label="Dinheiro" value={money(currentCash.payments.dinheiro)} detail="Trocos incluídos" icon={<Banknote size={18} />} /><Metric label="Pix + Cartão" value={money(currentCash.payments.pix + currentCash.payments.cartao)} detail="Confirmados" tone="info" icon={<WalletCards size={18} />} /><Metric label="Fiado" value={money(currentCash.payments.fiado)} detail={`${currentCash.creditSalesCount} clientes`} tone="warning" icon={<Clock3 size={18} />} /></div>
        <div className="dashboard-grid"><Section title="Movimento por forma de pagamento"><div className="cash-composition"><span><i className="money" style={{ height: '78%' }} /><b>{money(currentCash.payments.dinheiro)}</b><small>Dinheiro</small></span><span><i className="pix" style={{ height: '63%' }} /><b>{money(currentCash.payments.pix)}</b><small>Pix</small></span><span><i className="card" style={{ height: '47%' }} /><b>{money(currentCash.payments.cartao)}</b><small>Cartão</small></span><span><i className="credit" style={{ height: '24%' }} /><b>{money(currentCash.payments.fiado)}</b><small>Fiado</small></span></div></Section><Section title="Últimas vendas"><div className="compact-sales">{recentSales.slice(0, 4).map((sale) => <div key={sale.id}><span><strong>{sale.id}</strong><small>{sale.time} · {sale.payment}</small></span><b>{money(sale.total)}</b></div>)}</div></Section></div>
        <Section title="Histórico recente" action={<Button variant="quiet">Ver caixas anteriores</Button>}><div className="history-line"><span><CalendarDays size={19} /></span><div><strong>16 de julho de 2026</strong><small>07:38 às 19:12 · Coutinho</small></div><Badge tone="success">Sem diferença</Badge><b>{money(5342.8)}</b><ChevronRight size={17} /></div></Section>
      </> : <div className="closed-cash"><span><LockKeyhole size={29} /></span><h2>Caixa fechado</h2><p>Abra um novo caixa para iniciar vendas e acompanhar o movimento.</p><Button variant="primary" icon={<Plus size={17} />} onClick={() => setModal('open')}>Abrir caixa</Button></div>}

      {modal === 'open' && <Modal title="Abertura de caixa" description="17 de julho de 2026 · horário registrado automaticamente" onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={toggleCash}>Abrir caixa</Button></>}><div className="form-grid"><Field label="Valor inicial"><NumericInput min={0} value={openingAmount} onValueChange={setOpeningAmount} /></Field><Field label="Operador"><input value={currentCash.operator} readOnly /></Field></div><Field label="Observação"><textarea placeholder="Opcional" /></Field></Modal>}
      {modal === 'close' && <Modal title="Fechamento de caixa" description={`Resumo das vendas registradas desde a abertura às ${currentCash.openedAt}.`} onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Continuar aberto</Button><Button variant="danger" onClick={toggleCash}>Confirmar fechamento</Button></>}><div className="cash-close-meta"><span><small>Operador</small><strong>{currentCash.operator}</strong></span><span><small>Período</small><strong>{currentCash.openedAt} às 16:06</strong></span><span><small>Vendas</small><strong>{currentCash.salesCount}</strong></span><span><small>Cancelamentos</small><strong>{currentCash.cancellationCount} · {money(currentCash.cancellationTotal)}</strong></span></div><div className="cash-close-summary">{paymentTotals.map(({ label, value, detail, icon: Icon }) => <div key={label}><span className={`cash-close-summary__icon cash-close-summary__icon--${label.toLowerCase().replace('ã', 'a')}`}><Icon size={19} /></span><span><strong>{label}</strong><small>{detail}</small></span><b>{money(value)}</b></div>)}<div className="cash-close-summary__total"><span><strong>Total em vendas</strong><small>Soma de todos os meios de pagamento</small></span><b>{money(totalSales)}</b></div></div><div className="cash-close-note"><ReceiptText size={18} /><span><strong>Resumo pronto para fechar</strong><small>Valores de fiado entram no total vendido, mesmo sem recebimento no caixa.</small></span></div></Modal>}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}
