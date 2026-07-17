import { useState } from 'react'
import { AlertTriangle, Barcode, ChevronRight, CircleDollarSign, Filter, History, PackageCheck, PackagePlus, Plus, Search, SlidersHorizontal, Warehouse } from 'lucide-react'
import { money, products } from '../data/mockData'
import type { Product } from '../types'
import { Badge, Button, Field, Metric, Modal, PageHeader, Progress, Section, Toast } from '../components/Ui'

export function InventoryPage() {
  const [query, setQuery] = useState('')
  const [onlyLow, setOnlyLow] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [modal, setModal] = useState<'movement' | 'product' | null>(null)
  const [movementType, setMovementType] = useState('Entrada de mercadoria')
  const [movementPresentation, setMovementPresentation] = useState(0)
  const [movementQuantity, setMovementQuantity] = useState(1)
  const [toast, setToast] = useState('')
  const visible = products.filter((product) => (!query || product.nome.toLowerCase().includes(query.toLowerCase()) || product.presentations.some((presentation) => presentation.codigo.includes(query))) && (!onlyLow || product.estoque <= product.minimo))
  const movementProduct = selected ?? products[0]
  const movementFactor = movementProduct.presentations[movementPresentation]?.fatorBase ?? 1

  const openMovement = (product?: Product) => {
    setSelected(product ?? products[0])
    setMovementPresentation(0)
    setMovementQuantity(1)
    setModal('movement')
  }

  const saveMovement = () => {
    setModal(null)
    setToast(`${movementType} registrada: ${movementQuantity * movementFactor} ${movementProduct.unidade} em estoque base`)
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Produtos e movimentações" title="Estoque" description="Tudo é controlado na unidade base de cada produto." actions={<><Button icon={<PackagePlus size={18} />} onClick={() => openMovement()}>Movimentar estoque</Button><Button variant="primary" icon={<Plus size={18} />} onClick={() => setModal('product')}>Novo produto</Button></>} />
      <div className="metrics-grid"><Metric label="Produtos ativos" value="128" detail="5 categorias" icon={<Warehouse size={18} />} /><Metric label="Estoque baixo" value="2" detail="Precisam de reposição" tone="warning" icon={<AlertTriangle size={18} />} /><Metric label="Sem estoque" value="1" detail="Café Torrado" tone="danger" icon={<PackageCheck size={18} />} /><Metric label="Margem média" value="27,8%" detail="+1,2% no mês" tone="success" icon={<CircleDollarSign size={18} />} /></div>
      <div className="filterbar"><label className="filter-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome ou código de barras" /></label><button onClick={() => setOnlyLow(!onlyLow)} className={onlyLow ? 'active' : ''}><AlertTriangle size={17} /> Estoque baixo</button><button><Filter size={17} /> Categoria</button><button><SlidersHorizontal size={17} /> Filtros</button></div>
      <div className="table-shell">
        <div className="table-title"><div><strong>Catálogo de produtos</strong><small>{visible.length} de 128 produtos</small></div><span className="stock-legend"><i /> Estoque disponível em unidade base</span></div>
        <div className="responsive-table inventory-table">
          <div className="responsive-table__head"><span>Produto</span><span>Unidade base</span><span>Estoque</span><span>Disponibilidade</span><span>Menor preço</span><span>Status</span><span /></div>
          {visible.map((product) => {
            const percent = Math.min(100, (product.estoque / Math.max(product.minimo * 3, 1)) * 100)
            const status = product.estoque === 0 ? 'Zerado' : product.estoque <= product.minimo ? 'Estoque baixo' : 'Normal'
            const tone = product.estoque === 0 ? 'danger' : product.estoque <= product.minimo ? 'warning' : 'success'
            return <button key={product.id} className="responsive-table__row" onClick={() => setSelected(product)}><span data-label="Produto" className="product-cell"><span className="product-symbol">{product.nome.slice(0, 2).toUpperCase()}</span><span><strong>{product.nome}</strong><small>{product.categoria} · {product.presentations.length} apresentações</small></span></span><strong data-label="Unidade">{product.unidade}</strong><span data-label="Estoque"><strong>{product.estoque} {product.unidade}</strong><small>Mínimo {product.minimo}</small></span><span data-label="Disponibilidade"><Progress value={percent} tone={tone} /></span><strong data-label="Preço">{money(product.presentations[0].preco)}</strong><span data-label="Status"><Badge tone={tone}>{status}</Badge></span><ChevronRight size={17} /></button>
          })}
        </div>
      </div>

      {selected && !modal && <div className="drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><aside className="detail-drawer"><div className="detail-drawer__header"><button onClick={() => setSelected(null)} aria-label="Fechar">×</button><span className="product-symbol product-symbol--large">{selected.nome.slice(0, 2).toUpperCase()}</span><div><Badge tone={selected.estoque <= selected.minimo ? 'warning' : 'success'}>{selected.estoque <= selected.minimo ? 'Estoque baixo' : 'Ativo'}</Badge><h2>{selected.nome}</h2><p>{selected.categoria} · unidade base {selected.unidade}</p></div></div><div className="drawer-stock"><span><small>Estoque atual</small><strong>{selected.estoque} {selected.unidade}</strong></span><Button variant="primary" icon={<PackagePlus size={17} />} onClick={() => openMovement(selected)}>Movimentar</Button></div><Section title="Apresentações comerciais"><div className="presentation-list">{selected.presentations.map((presentation) => <div key={presentation.id}><span><strong>{presentation.nome}</strong><small><Barcode size={13} /> {presentation.codigo}</small></span><span><small>Converte para</small><b>{presentation.fatorBase} {selected.unidade}</b></span><strong>{money(presentation.preco)}</strong></div>)}</div></Section><Section title="Margem estimada"><div className="margin-list">{selected.presentations.map((presentation) => { const cost = selected.custo * presentation.fatorBase; const margin = ((presentation.preco - cost) / presentation.preco) * 100; return <div key={presentation.id}><span>{presentation.nome}</span><Progress value={margin} tone={margin > 25 ? 'success' : 'warning'} /><b>{margin.toFixed(1)}%</b></div> })}</div></Section><Section title="Últimas movimentações"><div className="timeline"><div><i className="success" /><span><strong>Entrada de mercadoria</strong><small>Hoje, 08:14 · Coutinho</small></span><b>+30 {selected.unidade}</b></div><div><i className="info" /><span><strong>Venda #1042</strong><small>Ontem, 18:47 · PDV</small></span><b>-2 {selected.unidade}</b></div><div><i className="warning" /><span><strong>Ajuste manual</strong><small>15 jul, 16:20 · Coutinho</small></span><b>-1 {selected.unidade}</b></div></div></Section></aside></div>}

      {modal === 'movement' && <Modal title="Movimentar estoque" description="Toda movimentação será convertida e gravada na unidade base." onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={saveMovement}>Registrar movimentação</Button></>}><div className="form-grid"><Field label="Produto"><select value={movementProduct.id} onChange={(event) => { setSelected(products.find((product) => product.id === Number(event.target.value)) ?? products[0]); setMovementPresentation(0) }}>{products.map((product) => <option key={product.id} value={product.id}>{product.nome}</option>)}</select></Field><Field label="Tipo de movimentação"><select value={movementType} onChange={(event) => setMovementType(event.target.value)}><option>Entrada de mercadoria</option><option>Ajuste manual</option><option>Perda / avaria</option><option>Devolução</option><option>Consumo interno</option></select></Field><Field label="Apresentação informada"><select value={movementPresentation} onChange={(event) => setMovementPresentation(Number(event.target.value))}>{movementProduct.presentations.map((presentation, index) => <option key={presentation.id} value={index}>{presentation.nome} ({presentation.fatorBase} {movementProduct.unidade})</option>)}</select></Field><Field label="Quantidade"><input type="number" min="0.01" step="0.01" value={movementQuantity} onChange={(event) => setMovementQuantity(Number(event.target.value))} /></Field></div><div className="conversion-ticket"><span><History size={19} /></span><div><small>Movimentação em unidade base</small><strong>{movementQuantity} × {movementFactor} = {movementQuantity * movementFactor} {movementProduct.unidade}</strong></div><Badge tone={movementType.includes('Entrada') || movementType === 'Devolução' ? 'success' : 'warning'}>{movementType.includes('Entrada') || movementType === 'Devolução' ? 'Entrada' : 'Saída'}</Badge></div><Field label="Observação"><textarea placeholder="Nota, fornecedor ou motivo do ajuste" /></Field></Modal>}

      {modal === 'product' && <Modal title="Novo produto" description="Cadastre a unidade base antes das apresentações de venda." onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={() => { setModal(null); setToast('Produto salvo como ativo') }}>Salvar produto</Button></>}><div className="form-grid"><Field label="Nome"><input placeholder="Nome do produto" /></Field><Field label="Categoria"><select><option>Mercearia</option><option>Grãos</option><option>Bebidas</option><option>Limpeza</option></select></Field><Field label="Unidade base"><select><option>KG</option><option>UN</option><option>PAR</option></select></Field><Field label="Estoque mínimo"><input type="number" placeholder="0" /></Field><Field label="Custo base"><input type="number" placeholder="R$ 0,00" /></Field><Field label="Preço base (opcional)"><input type="number" placeholder="R$ 0,00" /></Field></div><Section title="Primeira apresentação"><div className="form-grid"><Field label="Nome"><input placeholder="Ex.: 1 kg" /></Field><Field label="Fator base"><input type="number" placeholder="1" /></Field><Field label="Preço de venda"><input type="number" placeholder="R$ 0,00" /></Field><Field label="Código de barras"><input placeholder="Opcional" /></Field></div></Section></Modal>}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}

