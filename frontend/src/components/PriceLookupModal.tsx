import { useMemo, useState } from 'react'
import { Barcode, Boxes, Camera, Check, PackageSearch, Search } from 'lucide-react'
import { money, products } from '../data/mockData'
import type { Presentation, Product } from '../types'
import { BarcodeScanner } from './BarcodeScanner'
import { Badge, Button, Modal } from './Ui'

interface PriceLookupModalProps {
  onClose: () => void
}

interface LookupResult {
  product: Product
  presentationId: number
}

const findByCode = (code: string) => {
  for (const product of products) {
    const presentation = product.presentations.find((item) => item.codigo === code)
    if (presentation) return { product, presentationId: presentation.id }
  }
  return null
}

export function PriceLookupModal({ onClose }: PriceLookupModalProps) {
  const [mode, setMode] = useState<'search' | 'scanner' | 'result'>('search')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<LookupResult | null>(null)
  const [feedback, setFeedback] = useState('')

  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('pt-BR')
    if (!term) return []
    return products.filter((product) => (
      product.nome.toLocaleLowerCase('pt-BR').includes(term)
      || product.categoria.toLocaleLowerCase('pt-BR').includes(term)
      || product.presentations.some((presentation) => presentation.codigo.includes(term))
    )).slice(0, 5)
  }, [query])

  const showProduct = (product: Product, presentationId = product.presentations[0].id) => {
    setResult({ product, presentationId })
    setFeedback('')
    setMode('result')
  }

  const search = () => {
    const term = query.trim()
    if (!term) return
    const codeResult = findByCode(term)
    if (codeResult) {
      showProduct(codeResult.product, codeResult.presentationId)
      return
    }
    if (matches[0]) {
      showProduct(matches[0])
      return
    }
    setFeedback('Nenhum produto encontrado. Confira o nome ou o código informado.')
  }

  const handleDetected = (code: string) => {
    const codeResult = findByCode(code)
    if (codeResult) {
      showProduct(codeResult.product, codeResult.presentationId)
      return
    }
    setQuery(code)
    setFeedback(`O código ${code} não está cadastrado em nenhum produto.`)
    setMode('search')
  }

  const startNewLookup = () => {
    setQuery('')
    setFeedback('')
    setResult(null)
    setMode('search')
  }

  if (mode === 'scanner') {
    return (
      <BarcodeScanner
        title="Consultar preço"
        description="Aponte a câmera para o código de barras ou QR Code do produto."
        onClose={() => setMode('search')}
        onDetected={handleDetected}
      />
    )
  }

  if (mode === 'result' && result) {
    const { product } = result
    const presentation = product.presentations.find((item) => item.id === result.presentationId) ?? product.presentations[0]
    const stockTone = product.estoque === 0 ? 'danger' : product.estoque <= product.minimo ? 'warning' : 'success'
    const stockLabel = product.estoque === 0 ? 'Sem estoque' : product.estoque <= product.minimo ? 'Estoque baixo' : 'Disponível'

    return (
      <Modal
        title="Resumo do produto"
        description="Preço e informações essenciais para uma consulta rápida."
        size="small"
        onClose={onClose}
        footer={<><Button onClick={startNewLookup}>Nova consulta</Button><Button variant="primary" onClick={onClose}>Fechar</Button></>}
      >
        <div className="price-lookup-product">
          <header>
            <span className="price-lookup-product__symbol">{product.nome.slice(0, 2).toUpperCase()}</span>
            <div><Badge tone={stockTone}>{stockLabel}</Badge><h3>{product.nome}</h3><p>{product.categoria}</p></div>
          </header>

          <div className="price-lookup-price">
            <span>Preço de {presentation.nome}</span>
            <strong>{money(presentation.preco)}</strong>
            <small><Barcode size={15} /> {presentation.codigo || 'Apresentação sem código'}</small>
          </div>

          <div className="price-lookup-facts">
            <span><small>Estoque atual</small><strong>{product.estoque} {product.unidade}</strong></span>
            <span><small>Estoque mínimo</small><strong>{product.minimo} {product.unidade}</strong></span>
            <span><small>Unidade base</small><strong>{product.unidade}</strong></span>
          </div>

          {product.presentations.length > 1 && (
            <section className="price-lookup-presentations">
              <h4>Outras apresentações</h4>
              <div>
                {product.presentations.map((item) => (
                  <button className={item.id === presentation.id ? 'active' : ''} key={item.id} onClick={() => setResult({ product, presentationId: item.id })}>
                    <span>{item.id === presentation.id ? <Check size={18} /> : <Boxes size={18} />}</span>
                    <span><strong>{item.nome}</strong><small>{item.fatorBase} {product.unidade}</small></span>
                    <b>{money(item.preco)}</b>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      title="Consulta de preço"
      description="Encontre pelo nome ou leia o código com a câmera."
      size="small"
      onClose={onClose}
      footer={<Button variant="quiet" onClick={onClose}>Fechar</Button>}
    >
      <div className="price-lookup">
        <form className="price-lookup-search" onSubmit={(event) => { event.preventDefault(); search() }}>
          <label>
            <Search size={22} />
            <input
              value={query}
              placeholder="Nome ou código de barras"
              autoComplete="off"
              onChange={(event) => { setQuery(event.target.value); setFeedback('') }}
            />
          </label>
          <Button type="submit" variant="primary" disabled={!query.trim()}>Buscar</Button>
        </form>

        <button className="price-lookup-scanner" onClick={() => setMode('scanner')}>
          <span><Camera size={25} /></span>
          <span><strong>Ler código de barras</strong><small>Abrir a câmera do celular</small></span>
          <Barcode size={24} />
        </button>

        {feedback && <div className="price-lookup-feedback"><PackageSearch size={21} /><span>{feedback}</span></div>}

        {query.trim() && matches.length > 0 && (
          <div className="price-lookup-results">
            <span>Produtos encontrados</span>
            {matches.map((product) => {
              const matchedPresentation: Presentation | undefined = product.presentations.find((item) => item.codigo === query.trim())
              const presentation = matchedPresentation ?? product.presentations[0]
              return (
                <button key={product.id} onClick={() => showProduct(product, presentation.id)}>
                  <span className="price-lookup-results__symbol">{product.nome.slice(0, 2).toUpperCase()}</span>
                  <span><strong>{product.nome}</strong><small>{presentation.nome} · {product.estoque} {product.unidade} em estoque</small></span>
                  <b>{money(presentation.preco)}</b>
                </button>
              )
            })}
          </div>
        )}

        {!query.trim() && (
          <div className="price-lookup-hint"><PackageSearch size={24} /><span><strong>Consulta rápida no balcão</strong><small>Digite parte do nome ou use a câmera para ler a embalagem.</small></span></div>
        )}
      </div>
    </Modal>
  )
}
