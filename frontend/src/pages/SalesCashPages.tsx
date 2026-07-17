import { useState } from 'react'
import { Banknote, CalendarDays, Check, ChevronRight, Clock3, Filter, LockKeyhole, Plus, ReceiptText, Search, WalletCards, XCircle } from 'lucide-react'
import { money, recentSales } from '../data/mockData'
import { Badge, Button, Field, Metric, Modal, PageHeader, Section, Toast } from '../components/Ui'

export function SalesPage() {
  const [selected, setSelected] = useState<(typeof recentSales)[number] | null>(null)
  const [query, setQuery] = useState('')
  const sales = recentSales.filter((sale) => sale.id.includes(query) || sale.customer.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="page">
      <PageHeader eyebrow="Operação" title="Vendas" description="Consulte vendas finalizadas, abertas e canceladas." actions={<Button icon={<Plus size={18} />}>Venda posterior</Button>} />
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
    </div>
  )
}

export function CashPage() {
  const [open, setOpen] = useState(true)
  const [modal, setModal] = useState<'open' | 'close' | null>(null)
  const [counted, setCounted] = useState(1310)
  const [toast, setToast] = useState('')
  const expectedCash = 1284.6
  const difference = counted - expectedCash

  const toggleCash = () => {
    setOpen(!open)
    setModal(null)
    setToast(open ? 'Caixa fechado e conferência registrada' : 'Caixa aberto com sucesso')
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Controle diário" title="Caixa" description={open ? 'Aberto desde 07:42 por Coutinho.' : 'Nenhum caixa aberto no momento.'} actions={<Button variant={open ? 'danger' : 'primary'} icon={open ? <LockKeyhole size={18} /> : <Banknote size={18} />} onClick={() => setModal(open ? 'close' : 'open')}>{open ? 'Fechar caixa' : 'Abrir caixa'}</Button>} />

      {open ? <>
        <div className="cash-banner"><div><span className="cash-banner__pulse" /><span><strong>Caixa em andamento</strong><small>8h24 de operação · atualização agora</small></span></div><strong>R$ 2.847,60</strong></div>
        <div className="metrics-grid metrics-grid--five"><Metric label="Total vendido" value="R$ 3.095,90" detail="42 vendas" featured icon={<ReceiptText size={18} />} /><Metric label="Recebido" value="R$ 2.847,60" detail="92% do vendido" tone="success" icon={<Check size={18} />} /><Metric label="Dinheiro" value="R$ 1.284,60" detail="Trocos incluídos" icon={<Banknote size={18} />} /><Metric label="Pix + Cartão" value="R$ 1.563,00" detail="Confirmados" tone="info" icon={<WalletCards size={18} />} /><Metric label="Fiado" value="R$ 248,30" detail="3 clientes" tone="warning" icon={<Clock3 size={18} />} /></div>
        <div className="dashboard-grid"><Section title="Movimento por forma de pagamento"><div className="cash-composition"><span><i className="money" style={{ height: '78%' }} /><b>R$ 1.284,60</b><small>Dinheiro</small></span><span><i className="pix" style={{ height: '63%' }} /><b>R$ 901,40</b><small>Pix</small></span><span><i className="card" style={{ height: '47%' }} /><b>R$ 661,60</b><small>Cartão</small></span><span><i className="credit" style={{ height: '24%' }} /><b>R$ 248,30</b><small>Fiado</small></span></div></Section><Section title="Últimas vendas"><div className="compact-sales">{recentSales.slice(0, 4).map((sale) => <div key={sale.id}><span><strong>{sale.id}</strong><small>{sale.time} · {sale.payment}</small></span><b>{money(sale.total)}</b></div>)}</div></Section></div>
        <Section title="Histórico recente" action={<Button variant="quiet">Ver caixas anteriores</Button>}><div className="history-line"><span><CalendarDays size={19} /></span><div><strong>16 de julho de 2026</strong><small>07:38 às 19:12 · Coutinho</small></div><Badge tone="success">Sem diferença</Badge><b>{money(5342.8)}</b><ChevronRight size={17} /></div></Section>
      </> : <div className="closed-cash"><span><LockKeyhole size={29} /></span><h2>Caixa fechado</h2><p>Abra um novo caixa para iniciar vendas e acompanhar o movimento.</p><Button variant="primary" icon={<Plus size={17} />} onClick={() => setModal('open')}>Abrir caixa</Button></div>}

      {modal === 'open' && <Modal title="Abertura de caixa" description="17 de julho de 2026 · horário registrado automaticamente" onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={toggleCash}>Abrir caixa</Button></>}><div className="form-grid"><Field label="Valor inicial"><input type="number" defaultValue="200.00" /></Field><Field label="Operador"><input value="Coutinho" readOnly /></Field></div><Field label="Observação"><textarea placeholder="Opcional" /></Field></Modal>}
      {modal === 'close' && <Modal title="Fechamento de caixa" description="Confira os valores antes de encerrar." onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Continuar aberto</Button><Button variant="danger" onClick={toggleCash}>Confirmar fechamento</Button></>}><div className="closing-grid"><div className="closing-expected"><span><small>Dinheiro esperado</small><strong>{money(expectedCash)}</strong></span><span><small>Pix confirmado</small><b>{money(901.4)}</b></span><span><small>Cartão confirmado</small><b>{money(661.6)}</b></span></div><div><Field label="Dinheiro conferido"><input type="number" value={counted} onChange={(event) => setCounted(Number(event.target.value))} /></Field><div className={`difference ${difference === 0 ? 'difference--ok' : 'difference--warning'}`}><small>Diferença encontrada</small><strong>{difference > 0 ? '+' : ''}{money(difference)}</strong></div></div></div><Field label="Observação de fechamento"><textarea placeholder="Explique diferenças encontradas" /></Field></Modal>}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}

