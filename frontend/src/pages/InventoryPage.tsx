import { useState } from 'react'
import { AlertTriangle, Barcode, ChevronRight, Edit3, Filter, History, PackagePlus, Plus, Save, ScanLine, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { BarcodeScanner } from '../components/BarcodeScanner'
import { Badge, Button, Field, Modal, PageHeader, Progress, Section, Toast, type ToastTone } from '../components/Ui'
import { money, products as initialProducts } from '../data/mockData'
import type { Presentation, Product } from '../types'

type InventoryModal = 'movement' | 'product' | 'edit' | 'scan-consult' | 'scan-product' | 'scan-edit' | null

const cloneProduct = (product: Product): Product => ({ ...product, presentations: product.presentations.map((presentation) => ({ ...presentation })) })

const createEmptyProduct = (catalog: Product[]): Product => ({
  id: Math.max(0, ...catalog.map((product) => product.id)) + 1,
  nome: '',
  categoria: 'Mercearia',
  unidade: 'UN',
  estoque: 0,
  minimo: 0,
  custo: 0,
  ativo: true,
  presentations: [{ id: Date.now(), nome: 'Unidade', fatorBase: 1, preco: 0, codigo: '' }],
})

interface ProductEditorProps {
  draft: Product
  mode: 'product' | 'edit'
  onChange: (draft: Product) => void
  onScan: (presentationIndex: number) => void
}

function ProductEditor({ draft, mode, onChange, onScan }: ProductEditorProps) {
  const updatePresentation = (index: number, patch: Partial<Presentation>) => {
    onChange({ ...draft, presentations: draft.presentations.map((presentation, currentIndex) => currentIndex === index ? { ...presentation, ...patch } : presentation) })
  }

  const addPresentation = () => {
    const nextId = Math.max(Date.now(), ...draft.presentations.map((presentation) => presentation.id + 1))
    onChange({ ...draft, presentations: [...draft.presentations, { id: nextId, nome: '', fatorBase: 1, preco: 0, codigo: '' }] })
  }

  const removePresentation = (index: number) => {
    if (draft.presentations.length === 1) return
    onChange({ ...draft, presentations: draft.presentations.filter((_, currentIndex) => currentIndex !== index) })
  }

  return (
    <>
      <div className="form-grid product-editor__base">
        <Field label="Nome"><input value={draft.nome} placeholder="Nome do produto" onChange={(event) => onChange({ ...draft, nome: event.target.value })} /></Field>
        <Field label="Categoria"><select value={draft.categoria} onChange={(event) => onChange({ ...draft, categoria: event.target.value })}><option>Mercearia</option><option>Grãos</option><option>Bebidas</option><option>Limpeza</option></select></Field>
        <Field label="Unidade base"><select value={draft.unidade} onChange={(event) => onChange({ ...draft, unidade: event.target.value as Product['unidade'] })}><option value="UN">Unidade (UN)</option><option value="KG">Quilograma (KG)</option></select></Field>
        <Field label="Estoque mínimo"><input type="number" min="0" step="0.01" value={draft.minimo} onChange={(event) => onChange({ ...draft, minimo: Math.max(0, Number(event.target.value)) })} /></Field>
        <Field label="Custo da unidade base"><input type="number" min="0" step="0.01" value={draft.custo} onChange={(event) => onChange({ ...draft, custo: Math.max(0, Number(event.target.value)) })} /></Field>
        {mode === 'edit' && <Field label="Estoque atual" hint="Use Movimentar estoque para registrar entradas e saídas."><input value={`${draft.estoque} ${draft.unidade}`} readOnly /></Field>}
      </div>

      <Section title="Apresentações comerciais" action={<Button icon={<Plus size={16} />} onClick={addPresentation}>Adicionar apresentação</Button>} className="product-editor__presentations">
        <div className="presentation-editor-list">
          {draft.presentations.map((presentation, index) => (
            <article className="presentation-editor" key={presentation.id}>
              <header><strong>Apresentação {index + 1}</strong><button aria-label={`Remover apresentação ${index + 1}`} disabled={draft.presentations.length === 1} onClick={() => removePresentation(index)}><Trash2 size={17} /></button></header>
              <div className="form-grid">
                <Field label="Nome"><input value={presentation.nome} placeholder="Ex.: Fardo 10 kg" onChange={(event) => updatePresentation(index, { nome: event.target.value })} /></Field>
                <Field label="Converte para"><input type="number" min="0.01" step="0.01" value={presentation.fatorBase} onChange={(event) => updatePresentation(index, { fatorBase: Math.max(0, Number(event.target.value)) })} /></Field>
                <Field label="Preço de venda"><input type="number" min="0.01" step="0.01" value={presentation.preco} onChange={(event) => updatePresentation(index, { preco: Math.max(0, Number(event.target.value)) })} /></Field>
                <Field label="Código de barras ou QR Code" hint="Digite ou use a câmera do celular."><div className="input-with-action"><input value={presentation.codigo} inputMode="numeric" placeholder="Opcional" onChange={(event) => updatePresentation(index, { codigo: event.target.value.replace(/\s/g, '') })} /><button type="button" onClick={() => onScan(index)} aria-label={`Escanear código da apresentação ${index + 1}`}><ScanLine size={20} /></button></div></Field>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

export function InventoryPage() {
  const [catalog, setCatalog] = useState<Product[]>(() => initialProducts.map(cloneProduct))
  const [query, setQuery] = useState('')
  const [onlyLow, setOnlyLow] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [modal, setModal] = useState<InventoryModal>(null)
  const [draft, setDraft] = useState<Product>(() => createEmptyProduct(initialProducts))
  const [scannerPresentationIndex, setScannerPresentationIndex] = useState(0)
  const [movementType, setMovementType] = useState('Entrada de mercadoria')
  const [movementPresentation, setMovementPresentation] = useState(0)
  const [movementQuantity, setMovementQuantity] = useState(1)
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)

  const visible = catalog.filter((product) => (!query || product.nome.toLowerCase().includes(query.toLowerCase()) || product.presentations.some((presentation) => presentation.codigo.includes(query))) && (!onlyLow || product.estoque <= product.minimo))
  const movementProduct = selected ?? catalog[0]
  const movementFactor = movementProduct.presentations[movementPresentation]?.fatorBase ?? 1
  const validDraft = Boolean(draft.nome.trim()) && draft.presentations.length > 0 && draft.presentations.every((presentation) => presentation.nome.trim() && presentation.fatorBase > 0 && presentation.preco > 0)

  const openMovement = (product?: Product) => {
    setSelected(product ?? catalog[0])
    setMovementPresentation(0)
    setMovementQuantity(1)
    setModal('movement')
  }

  const openNewProduct = () => {
    setDraft(createEmptyProduct(catalog))
    setModal('product')
  }

  const openEditProduct = (product: Product) => {
    setDraft(cloneProduct(product))
    setModal('edit')
  }

  const saveMovement = () => {
    setModal(null)
    setToast({ message: `${movementType} registrada: ${movementQuantity * movementFactor} ${movementProduct.unidade} em estoque base`, tone: 'success' })
  }

  const saveProduct = (mode: 'product' | 'edit') => {
    if (!validDraft) return
    const saved = cloneProduct(draft)
    setCatalog((current) => mode === 'product' ? [...current, saved] : current.map((product) => product.id === saved.id ? saved : product))
    setSelected(mode === 'edit' ? saved : null)
    setModal(null)
    setToast({ message: mode === 'product' ? 'Produto cadastrado como ativo' : 'Produto e apresentações atualizados', tone: 'success' })
  }

  const openPresentationScanner = (mode: 'product' | 'edit', presentationIndex: number) => {
    setScannerPresentationIndex(presentationIndex)
    setModal(mode === 'product' ? 'scan-product' : 'scan-edit')
  }

  const closeScanner = () => {
    if (modal === 'scan-product') setModal('product')
    else if (modal === 'scan-edit') setModal('edit')
    else setModal(null)
  }

  const handleScannedCode = (code: string) => {
    if (modal === 'scan-consult') {
      const found = catalog.find((product) => product.presentations.some((presentation) => presentation.codigo === code))
      setQuery(code)
      setOnlyLow(false)
      setModal(null)
      if (found) {
        setSelected(found)
        setToast({ message: `${found.nome} localizado pela câmera`, tone: 'success' })
      } else {
        setToast({ message: `Código ${code} não encontrado no catálogo`, tone: 'error' })
      }
      return
    }

    setDraft((current) => ({ ...current, presentations: current.presentations.map((presentation, index) => index === scannerPresentationIndex ? { ...presentation, codigo: code } : presentation) }))
    setModal(modal === 'scan-product' ? 'product' : 'edit')
    setToast({ message: 'Código preenchido na apresentação', tone: 'success' })
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Produtos e movimentações" title="Estoque" description="Tudo é controlado na unidade base de cada produto." />
      <div className="inventory-actions" aria-label="Ações de estoque">
        <button className="inventory-action inventory-action--primary" onClick={openNewProduct}><span><Plus size={22} /></span><span><strong>Novo produto</strong><small>Cadastrar no estoque</small></span><ChevronRight size={18} /></button>
        <button className="inventory-action" onClick={() => setModal('scan-consult')}><span><Barcode size={22} /></span><span><strong>Consultar produto</strong><small>Via código de barras</small></span><ChevronRight size={18} /></button>
        <button className="inventory-action" onClick={() => openMovement()}><span><PackagePlus size={22} /></span><span><strong>Movimentar estoque</strong><small>Entrada, saída ou ajuste</small></span><ChevronRight size={18} /></button>
      </div>
      <div className="filterbar"><label className="filter-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome ou código de barras" /></label><button onClick={() => setOnlyLow(!onlyLow)} className={onlyLow ? 'active' : ''}><AlertTriangle size={17} /> Estoque baixo</button><button><Filter size={17} /> Categoria</button><button><SlidersHorizontal size={17} /> Filtros</button></div>
      <div className="table-shell">
        <div className="table-title"><div><strong>Catálogo de produtos</strong><small>{visible.length} de {catalog.length} produtos</small></div><span className="stock-legend"><i /> Estoque disponível em unidade base</span></div>
        <div className="responsive-table inventory-table">
          <div className="responsive-table__head"><span>Produto</span><span>Unidade base</span><span>Estoque</span><span>Disponibilidade</span><span>Menor preço</span><span>Status</span><span /></div>
          {visible.map((product) => {
            const percent = Math.min(100, (product.estoque / Math.max(product.minimo * 3, 1)) * 100)
            const status = product.estoque === 0 ? 'Zerado' : product.estoque <= product.minimo ? 'Estoque baixo' : 'Normal'
            const tone = product.estoque === 0 ? 'danger' : product.estoque <= product.minimo ? 'warning' : 'success'
            return <button key={product.id} className="responsive-table__row" onClick={() => setSelected(product)}><span data-label="Produto" className="product-cell"><span className="product-symbol">{product.nome.slice(0, 2).toUpperCase()}</span><span><strong>{product.nome}</strong><small>{product.categoria} · {product.presentations.length} apresentações</small></span></span><strong className="inventory-unit" data-label="Unidade">{product.unidade}</strong><span className="inventory-stock" data-label="Estoque"><strong>{product.estoque} {product.unidade}</strong><small>Mínimo {product.minimo}</small></span><span className="inventory-progress" data-label="Disponibilidade"><Progress value={percent} tone={tone} /></span><strong className="inventory-price" data-label="Preço">{money(product.presentations[0].preco)}</strong><span className="inventory-status" data-label="Status"><Badge tone={tone}>{status}</Badge></span><ChevronRight size={17} /></button>
          })}
        </div>
      </div>

      {selected && !modal && <div className="drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><aside className="detail-drawer"><div className="detail-drawer__header"><button onClick={() => setSelected(null)} aria-label="Fechar">×</button><span className="product-symbol product-symbol--large">{selected.nome.slice(0, 2).toUpperCase()}</span><div><Badge tone={selected.estoque <= selected.minimo ? 'warning' : 'success'}>{selected.estoque <= selected.minimo ? 'Estoque baixo' : 'Ativo'}</Badge><h2>{selected.nome}</h2><p>{selected.categoria} · unidade base {selected.unidade}</p></div></div><div className="drawer-stock"><span><small>Estoque atual</small><strong>{selected.estoque} {selected.unidade}</strong></span><div className="drawer-stock__actions"><Button icon={<Edit3 size={17} />} onClick={() => openEditProduct(selected)}>Editar</Button><Button variant="primary" icon={<PackagePlus size={17} />} onClick={() => openMovement(selected)}>Movimentar</Button></div></div><Section title="Apresentações comerciais"><div className="presentation-list">{selected.presentations.map((presentation) => <div key={presentation.id}><span><strong>{presentation.nome}</strong><small><Barcode size={13} /> {presentation.codigo || 'Sem código'}</small></span><span><small>Converte para</small><b>{presentation.fatorBase} {selected.unidade}</b></span><strong>{money(presentation.preco)}</strong></div>)}</div></Section><Section title="Margem estimada"><div className="margin-list">{selected.presentations.map((presentation) => { const cost = selected.custo * presentation.fatorBase; const margin = ((presentation.preco - cost) / presentation.preco) * 100; return <div key={presentation.id}><span>{presentation.nome}</span><Progress value={margin} tone={margin > 25 ? 'success' : 'warning'} /><b>{margin.toFixed(1)}%</b></div> })}</div></Section><Section title="Últimas movimentações"><div className="timeline"><div><i className="success" /><span><strong>Entrada de mercadoria</strong><small>Hoje, 08:14 · Coutinho</small></span><b>+30 {selected.unidade}</b></div><div><i className="info" /><span><strong>Venda #1042</strong><small>Ontem, 18:47 · PDV</small></span><b>-2 {selected.unidade}</b></div><div><i className="warning" /><span><strong>Ajuste manual</strong><small>15 jul, 16:20 · Coutinho</small></span><b>-1 {selected.unidade}</b></div></div></Section></aside></div>}

      {modal === 'movement' && <Modal title="Movimentar estoque" description="Toda movimentação será convertida e gravada na unidade base." onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={saveMovement}>Registrar movimentação</Button></>}><div className="form-grid"><Field label="Produto"><select value={movementProduct.id} onChange={(event) => { setSelected(catalog.find((product) => product.id === Number(event.target.value)) ?? catalog[0]); setMovementPresentation(0) }}>{catalog.map((product) => <option key={product.id} value={product.id}>{product.nome}</option>)}</select></Field><Field label="Tipo de movimentação"><select value={movementType} onChange={(event) => setMovementType(event.target.value)}><option>Entrada de mercadoria</option><option>Ajuste manual</option><option>Perda / avaria</option><option>Devolução</option><option>Consumo interno</option></select></Field><Field label="Apresentação informada"><select value={movementPresentation} onChange={(event) => setMovementPresentation(Number(event.target.value))}>{movementProduct.presentations.map((presentation, index) => <option key={presentation.id} value={index}>{presentation.nome} ({presentation.fatorBase} {movementProduct.unidade})</option>)}</select></Field><Field label="Quantidade"><input type="number" min="0.01" step="0.01" value={movementQuantity} onChange={(event) => setMovementQuantity(Number(event.target.value))} /></Field></div><div className="conversion-ticket"><span><History size={19} /></span><div><small>Movimentação em unidade base</small><strong>{movementQuantity} × {movementFactor} = {movementQuantity * movementFactor} {movementProduct.unidade}</strong></div><Badge tone={movementType.includes('Entrada') || movementType === 'Devolução' ? 'success' : 'warning'}>{movementType.includes('Entrada') || movementType === 'Devolução' ? 'Entrada' : 'Saída'}</Badge></div><Field label="Observação"><textarea placeholder="Nota, fornecedor ou motivo do ajuste" /></Field></Modal>}

      {(modal === 'product' || modal === 'edit') && <Modal title={modal === 'product' ? 'Novo produto' : `Editar ${draft.nome}`} description={modal === 'product' ? 'Cadastre os dados e pelo menos uma apresentação de venda.' : 'Altere dados, estoque mínimo e apresentações comerciais.'} onClose={() => setModal(null)} size="large" footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" icon={<Save size={17} />} disabled={!validDraft} onClick={() => saveProduct(modal)}>Salvar produto</Button></>}><ProductEditor draft={draft} mode={modal} onChange={setDraft} onScan={(index) => openPresentationScanner(modal, index)} /></Modal>}

      {(modal === 'scan-consult' || modal === 'scan-product' || modal === 'scan-edit') && <BarcodeScanner title={modal === 'scan-consult' ? 'Consultar produto' : 'Código da apresentação'} description={modal === 'scan-consult' ? 'Leia o código para abrir preço, estoque e apresentações.' : 'O código reconhecido será preenchido nesta apresentação.'} onClose={closeScanner} onDetected={handleScannedCode} />}
      {toast && <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />}
    </div>
  )
}
