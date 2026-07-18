import { useEffect, useRef, useState } from 'react'
import {
  Banknote,
  Barcode,
  Check,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Edit3,
  Minus,
  PackagePlus,
  Percent,
  Plus,
  QrCode,
  ReceiptText,
  Search,
  ShoppingBasket,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { initialCarts, money, products, customers } from '../data/mockData'
import type { Cart, CartItem, Product } from '../types'
import { Badge, Button, Field, Modal, Toast, type ToastTone } from '../components/Ui'

type ModalName = 'new-cart' | 'product' | 'manual' | 'adjust' | 'payment' | 'cancel' | null
type PaymentMethod = 'Dinheiro' | 'Pix' | 'Cartão' | 'Fiado'
type CartIdentification = 'none' | 'customer' | 'nickname'

const cartTotal = (cart: Cart) => cart.items.reduce((sum, item) => sum + (item.preco * item.quantidade) + item.ajuste, 0)

const parseCurrencyInput = (value: string) => {
  const parsed = Number.parseFloat(value.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}

const formatCurrencyInput = (value: number) => value.toFixed(2).replace('.', ',')

const getCustomerLabel = (customerId?: number) => {
  const customer = customers.find((item) => item.id === customerId)
  return customer ? customer.apelido ?? customer.nome : undefined
}

const getCartLabel = (cart: Cart) => cart.apelido?.trim() || getCustomerLabel(cart.clienteId)

export function PdvPage() {
  const cartTabsRef = useRef<HTMLDivElement>(null)
  const [carts, setCarts] = useState<Cart[]>(initialCarts)
  const [activeId, setActiveId] = useState(1)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<ModalName>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [presentationId, setPresentationId] = useState(11)
  const [quantity, setQuantity] = useState(1)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)
  const [adjustType, setAdjustType] = useState<'desconto' | 'acrescimo'>('desconto')
  const [adjustValueInput, setAdjustValueInput] = useState('2,00')
  const [manualName, setManualName] = useState('Saco de gelo')
  const [manualPrice, setManualPrice] = useState(5)
  const [method, setMethod] = useState<PaymentMethod>('Dinheiro')
  const [received, setReceived] = useState(100)
  const [splitPayment, setSplitPayment] = useState(false)
  const [pixValue, setPixValue] = useState(0)
  const [customerId, setCustomerId] = useState<number | ''>('')
  const [cartIdentification, setCartIdentification] = useState<CartIdentification>('none')
  const [newCartCustomerId, setNewCartCustomerId] = useState(customers.find((customer) => customer.ativo)?.id ?? 0)
  const [newCartNickname, setNewCartNickname] = useState('')
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)

  const activeCart = carts.find((cart) => cart.id === activeId) ?? carts[0]
  const total = activeCart ? cartTotal(activeCart) : 0
  const filteredProducts = products.filter((product) => {
    const term = query.toLowerCase().trim()
    return !term || product.nome.toLowerCase().includes(term) || product.presentations.some((item) => item.codigo.includes(term))
  })

  const selectedPresentation = selectedProduct?.presentations.find((item) => item.id === presentationId) ?? selectedProduct?.presentations[0]
  const productSubtotal = selectedPresentation ? selectedPresentation.preco * quantity : 0
  const adjustValue = parseCurrencyInput(adjustValueInput)
  const adjustmentAmount = selectedItem ? (adjustType === 'desconto' ? -adjustValue : adjustValue) : 0
  const previewItemTotal = selectedItem ? selectedItem.preco * selectedItem.quantidade + adjustmentAmount : 0
  const moneyPart = splitPayment ? Math.max(0, total - pixValue) : total
  const change = method === 'Dinheiro' ? Math.max(0, received - moneyPart) : 0
  const nextCartId = Math.max(...carts.map((cart) => cart.id), 0) + 1
  const nextCartCode = `#${1047 + nextCartId}`
  const newCartLabel = cartIdentification === 'customer'
    ? getCustomerLabel(newCartCustomerId)
    : cartIdentification === 'nickname'
      ? newCartNickname.trim()
      : undefined

  useEffect(() => {
    const container = cartTabsRef.current
    const activeTab = container?.querySelector<HTMLElement>('[data-active="true"]')
    if (!container || !activeTab) return
    container.scrollLeft = activeTab.offsetLeft - container.offsetLeft - 2
  }, [activeId, carts.length])

  const updateCartItems = (updater: (items: CartItem[]) => CartItem[]) => {
    setCarts((current) => current.map((cart) => cart.id === activeId ? { ...cart, items: updater(cart.items) } : cart))
  }

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setPresentationId(product.presentations[0].id)
    setQuantity(1)
    setModal('product')
  }

  const addProduct = () => {
    if (!selectedProduct || !selectedPresentation) return
    const item: CartItem = {
      id: crypto.randomUUID(),
      produtoId: selectedProduct.id,
      nome: selectedProduct.nome,
      apresentacao: selectedPresentation.nome,
      quantidade: quantity,
      fatorBase: selectedPresentation.fatorBase,
      preco: selectedPresentation.preco,
      ajuste: 0,
    }
    updateCartItems((items) => [...items, item])
    setModal(null)
    setQuery('')
    setToast({ message: `${selectedProduct.nome} adicionado à venda`, tone: 'success' })
  }

  const addManual = () => {
    if (!manualName.trim() || manualPrice <= 0) return
    updateCartItems((items) => [...items, { id: crypto.randomUUID(), nome: manualName, apresentacao: 'Item manual', quantidade: 1, fatorBase: 0, preco: manualPrice, ajuste: 0, manual: true }])
    setModal(null)
    setToast({ message: 'Item manual adicionado sem movimentar estoque', tone: 'warning' })
  }

  const openAdjustment = (item: CartItem) => {
    setSelectedItem(item)
    setAdjustType(item.ajuste > 0 ? 'acrescimo' : 'desconto')
    setAdjustValueInput(formatCurrencyInput(Math.abs(item.ajuste) || 2))
    setModal('adjust')
  }

  const saveAdjustment = () => {
    if (!selectedItem || adjustValue <= 0) return
    updateCartItems((items) => items.map((item) => item.id === selectedItem.id ? { ...item, ajuste: adjustmentAmount } : item))
    setModal(null)
    setToast({ message: 'Preço praticado atualizado', tone: 'success' })
  }

  const openNewCart = () => {
    setToast(null)
    setCartIdentification('none')
    setNewCartCustomerId(customers.find((customer) => customer.ativo)?.id ?? 0)
    setNewCartNickname('')
    setModal('new-cart')
  }

  const addCart = () => {
    if (cartIdentification === 'nickname' && !newCartNickname.trim()) return

    const clienteId = cartIdentification === 'customer' ? newCartCustomerId : undefined
    const apelido = cartIdentification === 'nickname' ? newCartNickname.trim() : undefined
    setCarts((current) => [...current, {
      id: nextCartId,
      codigo: nextCartCode,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      operador: 'Coutinho',
      clienteId,
      apelido,
      items: [],
    }])
    setActiveId(nextCartId)
    setCustomerId(clienteId ?? '')
    setModal(null)
    setToast({ message: `${newCartLabel ? `${newCartLabel} · ` : ''}Venda ${nextCartCode} iniciada`, tone: 'success' })
  }

  const openPayment = () => {
    setToast(null)
    setMethod('Dinheiro')
    setSplitPayment(false)
    setCustomerId(activeCart.clienteId ?? '')
    setModal('payment')
  }

  const selectPaymentMethod = (name: PaymentMethod) => {
    setMethod(name)
    setSplitPayment(false)
    if (name === 'Fiado') setCustomerId(activeCart.clienteId ?? '')
  }

  const cancelCart = () => {
    if (carts.length === 1) {
      setCarts([{ ...activeCart, items: [] }])
    } else {
      const remaining = carts.filter((cart) => cart.id !== activeId)
      setCarts(remaining)
      setActiveId(remaining[0].id)
    }
    setModal(null)
    setToast({ message: 'Venda cancelada e registrada no histórico', tone: 'error' })
  }

  const finishSale = () => {
    if (method === 'Fiado' && !customerId) return
    const code = activeCart.codigo
    const remaining = carts.filter((cart) => cart.id !== activeId)
    if (remaining.length) {
      setCarts(remaining)
      setActiveId(remaining[0].id)
    } else {
      setCarts([{ id: activeCart.id + 1, codigo: `#${Number(code.slice(1)) + 1}`, horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), operador: 'Coutinho', items: [] }])
      setActiveId(activeCart.id + 1)
    }
    setModal(null)
    setToast({ message: `Venda ${code} finalizada. Estoque atualizado.`, tone: 'success' })
  }

  if (!activeCart) return null

  return (
    <div className="pdv-page">
      <header className="pdv-header">
        <div><span>PDV · Caixa aberto</span><h1>Venda {activeCart.codigo}</h1></div>
        <div><span>Operador</span><strong>Coutinho</strong></div>
        <Button variant="primary" icon={<Plus size={18} />} onClick={openNewCart}>Nova venda</Button>
      </header>

      <div className="pdv-layout">
        <aside className="cart-rail">
          <div className="cart-rail__header"><span>Carrinhos abertos</span><Badge tone="info">{carts.length}</Badge></div>
          <div className="cart-tabs" ref={cartTabsRef}>
            {carts.map((cart) => {
              const cartLabel = getCartLabel(cart)
              return (
                <button key={cart.id} data-active={cart.id === activeId} className={cart.id === activeId ? 'active' : ''} onClick={() => setActiveId(cart.id)}>
                  <div className="cart-tab__head">
                    <span className="cart-tab__identity">
                      <strong>{cartLabel ?? cart.codigo}</strong>
                      {cartLabel && <small>{cart.codigo}</small>}
                    </span>
                    <span className="cart-tab__time">{cart.horario}</span>
                  </div>
                  <small className="cart-tab__items">{cart.items.length ? `${cart.items.length} itens` : 'Carrinho vazio'}</small>
                  <b>{money(cartTotal(cart))}</b>
                </button>
              )
            })}
          </div>
          <div className="cart-rail__foot"><span><i /> Estoque reservado somente ao finalizar</span></div>
        </aside>

        <section className="product-workspace">
          <div className="product-search">
            <Search size={21} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto ou ler código de barras" />
            <button aria-label="Ler código de barras" onClick={() => setQuery('789100004001')}><Barcode size={22} /></button>
          </div>

          {query ? (
            <div className="product-results">
              <div className="product-results__head"><span>{filteredProducts.length} produtos encontrados</span><button onClick={() => setQuery('')}><X size={15} /> Limpar</button></div>
              {filteredProducts.map((product) => {
                const low = product.estoque <= product.minimo
                return (
                  <button key={product.id} className="product-result" onClick={() => openProduct(product)} disabled={product.estoque === 0}>
                    <span className="product-symbol">{product.nome.slice(0, 2).toUpperCase()}</span>
                    <span><strong>{product.nome}</strong><small>{product.categoria} · {product.presentations.length} apresentações</small></span>
                    <span><small>Estoque base</small><strong className={low ? 'text-warning' : ''}>{product.estoque} {product.unidade}</strong></span>
                    <span><small>A partir de</small><strong>{money(product.presentations[0].preco)}</strong></span>
                    <Plus size={18} />
                  </button>
                )
              })}
            </div>
          ) : activeCart.items.length ? (
            <div className="cart-items">
              <div className="cart-items__head"><span>Item</span><span>Quantidade</span><span>Preço</span><span>Total</span><span /></div>
              {activeCart.items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span className={`product-symbol ${item.manual ? 'product-symbol--manual' : ''}`}>{item.manual ? <Edit3 size={17} /> : item.nome.slice(0, 2).toUpperCase()}</span>
                  <span className="cart-item__product"><strong>{item.nome} {item.manual && <Badge tone="warning">Manual</Badge>}</strong><small>{item.apresentacao}{!item.manual && ` · ${item.fatorBase} ${products.find((p) => p.id === item.produtoId)?.unidade} em estoque base`}</small></span>
                  <span className="quantity-control"><button aria-label="Diminuir" onClick={() => updateCartItems((items) => items.map((current) => current.id === item.id ? { ...current, quantidade: Math.max(1, current.quantidade - 1) } : current))}><Minus size={14} /></button><b>{item.quantidade}</b><button aria-label="Aumentar" onClick={() => updateCartItems((items) => items.map((current) => current.id === item.id ? { ...current, quantidade: current.quantidade + 1 } : current))}><Plus size={14} /></button></span>
                  <span className="cart-item__price"><strong>{money(item.preco)}</strong>{item.ajuste !== 0 && <small className={item.ajuste < 0 ? 'text-success' : 'text-warning'}>{item.ajuste < 0 ? 'desconto' : 'acréscimo'} {money(Math.abs(item.ajuste))}</small>}</span>
                  <strong className="cart-item__total">{money(item.preco * item.quantidade + item.ajuste)}</strong>
                  <span className="row-actions"><button aria-label="Aplicar desconto ou acréscimo" onClick={() => openAdjustment(item)}><Percent size={16} /></button><button aria-label="Remover item" onClick={() => updateCartItems((items) => items.filter((current) => current.id !== item.id))}><Trash2 size={16} /></button></span>
                </div>
              ))}
              <button className="manual-item" onClick={() => setModal('manual')}><PackagePlus size={18} /><span><strong>Adicionar item manual</strong><small>Não movimenta o estoque</small></span><Plus size={17} /></button>
            </div>
          ) : (
            <div className="pdv-empty">
              <span><ShoppingBasket size={31} /></span><strong>Pronto para a próxima venda</strong><p>Busque pelo nome ou leia o código de barras do produto.</p>
              <Button icon={<PackagePlus size={17} />} onClick={() => setModal('manual')}>Adicionar item manual</Button>
            </div>
          )}
        </section>

        <aside className="sale-summary">
          <div className="sale-summary__head"><span>Resumo da venda</span><small>{activeCart.items.length} {activeCart.items.length === 1 ? 'item' : 'itens'}</small></div>
          <div className="summary-lines"><span><small>Subtotal</small><b>{money(activeCart.items.reduce((sum, item) => sum + item.preco * item.quantidade, 0))}</b></span><span><small>Ajustes</small><b className={activeCart.items.reduce((sum, item) => sum + item.ajuste, 0) <= 0 ? 'text-success' : 'text-warning'}>{money(activeCart.items.reduce((sum, item) => sum + item.ajuste, 0))}</b></span></div>
          <div className="summary-total"><span>Total a pagar</span><strong>{money(total)}</strong><small>Estoque atualiza ao finalizar</small></div>
          <div className="summary-payment-preview"><span>Pagamento</span><div><Banknote size={18} /><span><strong>A definir</strong><small>Dinheiro, Pix, cartão ou fiado</small></span><ChevronDown size={16} /></div></div>
          <div className="summary-actions">
            <Button variant="quiet" icon={<Trash2 size={17} />} onClick={() => setModal('cancel')} disabled={!activeCart.items.length}>Cancelar</Button>
            <Button variant="primary" icon={<Check size={18} />} onClick={openPayment} disabled={!activeCart.items.length}>Finalizar <span className="summary-actions__value">{money(total)}</span></Button>
          </div>
        </aside>
      </div>

      {modal === 'new-cart' && (
        <Modal
          title="Nova venda"
          description="Identifique o carrinho para encontrá-lo mais rápido. Esta etapa é opcional."
          size="small"
          onClose={() => setModal(null)}
          footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={addCart} disabled={cartIdentification === 'nickname' && !newCartNickname.trim()}>Criar carrinho</Button></>}
        >
          <div className="cart-identification-switch role-switch" role="group" aria-label="Como identificar o carrinho">
            <button className={cartIdentification === 'none' ? 'active' : ''} aria-pressed={cartIdentification === 'none'} onClick={() => setCartIdentification('none')}><ShoppingBasket size={18} />Sem nome</button>
            <button className={cartIdentification === 'customer' ? 'active' : ''} aria-pressed={cartIdentification === 'customer'} onClick={() => setCartIdentification('customer')}><UserRound size={18} />Cliente</button>
            <button className={cartIdentification === 'nickname' ? 'active' : ''} aria-pressed={cartIdentification === 'nickname'} onClick={() => setCartIdentification('nickname')}><Edit3 size={18} />Apelido</button>
          </div>

          <div className="cart-identification-field">
            {cartIdentification === 'customer' && (
              <Field label="Cliente cadastrado" hint="Esse cliente será preenchido automaticamente se a venda for no fiado.">
                <select value={newCartCustomerId} onChange={(event) => setNewCartCustomerId(Number(event.target.value))}>
                  {customers.filter((customer) => customer.ativo).map((customer) => <option value={customer.id} key={customer.id}>{customer.apelido ?? customer.nome} · {customer.nome}</option>)}
                </select>
              </Field>
            )}
            {cartIdentification === 'nickname' && (
              <Field label="Apelido do carrinho" hint="Pode ser o nome do cliente ou qualquer referência para o vendedor.">
                <input value={newCartNickname} maxLength={40} autoFocus placeholder="Ex.: Entrega da Rua 8" onChange={(event) => setNewCartNickname(event.target.value)} />
              </Field>
            )}
          </div>

          <div className="cart-identification-preview">
            <span>PRÉVIA DO CARRINHO</span>
            <strong>{newCartLabel || nextCartCode}</strong>
            {newCartLabel ? <small>{nextCartCode} aparecerá logo abaixo</small> : <small>Somente o código será exibido</small>}
          </div>
        </Modal>
      )}

      {modal === 'product' && selectedProduct && selectedPresentation && (
        <Modal title={selectedProduct.nome} description={`${selectedProduct.estoque} ${selectedProduct.unidade} disponíveis em estoque base`} onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={addProduct}>Adicionar · {money(productSubtotal)}</Button></>}>
          <div className="form-grid">
            <Field label="Apresentação">
              <select value={presentationId} onChange={(event) => setPresentationId(Number(event.target.value))}>{selectedProduct.presentations.map((item) => <option key={item.id} value={item.id}>{item.nome} · {money(item.preco)}</option>)}</select>
            </Field>
            <Field label="Quantidade">
              <input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} />
            </Field>
          </div>
          <div className="conversion-ticket"><span><PackagePlus size={19} /></span><div><small>Conversão para estoque</small><strong>{quantity} × {selectedPresentation.nome} = {quantity * selectedPresentation.fatorBase} {selectedProduct.unidade}</strong></div><b>{money(productSubtotal)}</b></div>
        </Modal>
      )}

      {modal === 'manual' && (
        <Modal title="Adicionar item manual" description="Este item será registrado na venda sem movimentar o estoque." onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" onClick={addManual}>Adicionar item</Button></>}>
          <div className="manual-warning"><Edit3 size={18} /><span><strong>Item fora do catálogo</strong><small>O histórico indicará este lançamento como manual.</small></span></div>
          <div className="form-grid"><Field label="Nome do item"><input value={manualName} onChange={(event) => setManualName(event.target.value)} /></Field><Field label="Quantidade"><input type="number" min="1" defaultValue="1" /></Field><Field label="Preço unitário"><input type="number" min="0.01" step="0.01" value={manualPrice} onChange={(event) => setManualPrice(Number(event.target.value))} /></Field><Field label="Observação (opcional)"><input placeholder="Ex.: venda avulsa" /></Field></div>
        </Modal>
      )}

      {modal === 'adjust' && selectedItem && (
        <Modal title="Ajustar preço do item" description={selectedItem.nome} onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Cancelar</Button><Button variant="primary" disabled={adjustValue <= 0} onClick={saveAdjustment}>Aplicar ajuste</Button></>}>
          <div className="role-switch"><button className={adjustType === 'desconto' ? 'active' : ''} onClick={() => setAdjustType('desconto')}><Minus size={16} />Desconto</button><button className={adjustType === 'acrescimo' ? 'active' : ''} onClick={() => setAdjustType('acrescimo')}><Plus size={16} />Acréscimo</button></div>
          <div className="form-grid"><Field label="Valor do ajuste"><div className="money-input"><span>R$</span><input type="text" inputMode="decimal" value={adjustValueInput} onFocus={(event) => event.currentTarget.select()} onBlur={() => setAdjustValueInput(formatCurrencyInput(adjustValue))} onChange={(event) => { const nextValue = event.currentTarget.value.replace(/[^\d,.]/g, ''); if (/^\d*([,.]\d{0,2})?$/.test(nextValue)) setAdjustValueInput(nextValue) }} aria-label="Valor do ajuste em reais" /></div></Field><Field label="Motivo"><select defaultValue="fidelidade"><option value="fidelidade">Cliente fidelidade</option><option value="promocao">Promoção</option><option value="negociacao">Negociação</option><option value="outro">Outro</option></select></Field></div>
          <div className="price-comparison"><span><small>Preço original</small><b>{money(selectedItem.preco * selectedItem.quantidade)}</b></span><ArrowRightIcon /><span><small>Preço praticado</small><strong>{money(previewItemTotal)}</strong></span></div>
        </Modal>
      )}

      {modal === 'payment' && (
        <Modal title="Finalizar venda" description={`${activeCart.codigo} · ${activeCart.items.length} itens`} size="large" onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Voltar</Button><Button variant="primary" icon={<Check size={18} />} disabled={method === 'Fiado' && !customerId} onClick={finishSale}>Confirmar pagamento</Button></>}>
          <div className="payment-total"><span>Total da venda</span><strong>{money(total)}</strong><small>Falta distribuir: {money(splitPayment ? Math.max(0, total - moneyPart - pixValue) : 0)}</small></div>
          <div className="payment-methods">
            {([{ name: 'Dinheiro', icon: Banknote }, { name: 'Pix', icon: QrCode }, { name: 'Cartão', icon: CreditCard }, { name: 'Fiado', icon: UserRound }] as { name: PaymentMethod; icon: typeof Banknote }[]).map(({ name, icon: Icon }) => <button key={name} className={method === name ? 'active' : ''} onClick={() => selectPaymentMethod(name)}><Icon size={21} /><span>{name}</span>{method === name && <Check size={15} />}</button>)}
          </div>
          <label className="toggle-row"><span><strong>Dividir pagamento</strong><small>Combinar dinheiro e Pix</small></span><input type="checkbox" checked={splitPayment} onChange={(event) => { setSplitPayment(event.target.checked); setMethod('Dinheiro'); setPixValue(event.target.checked ? Math.min(20, total) : 0) }} /></label>
          {splitPayment ? <div className="split-fields"><Field label="Dinheiro"><input type="number" value={moneyPart} readOnly /></Field><Field label="Pix"><input type="number" value={pixValue} onChange={(event) => setPixValue(Math.min(total, Math.max(0, Number(event.target.value))))} /></Field></div> : method === 'Dinheiro' ? <div className="cash-payment"><Field label="Valor recebido"><input type="number" value={received} onChange={(event) => setReceived(Number(event.target.value))} /></Field><span><small>Troco</small><strong>{money(change)}</strong></span></div> : method === 'Pix' ? <div className="confirmation-panel"><QrCode size={22} /><span><strong>Aguardando confirmação manual</strong><small>Confirme o recebimento antes de concluir.</small></span><Button icon={<Check size={16} />}>Marcar como recebido</Button></div> : method === 'Cartão' ? <div className="confirmation-panel"><CreditCard size={22} /><span><strong>Pagamento na maquininha</strong><small>Registre após a aprovação do cartão.</small></span><Button icon={<Check size={16} />}>Marcar como pago</Button></div> : <div className="fiado-payment"><Field label="Cliente" hint={activeCart.clienteId ? 'Cliente preenchido a partir do carrinho.' : 'Selecione quem ficará responsável pelo fiado.'}><select value={customerId} onChange={(event) => setCustomerId(event.target.value ? Number(event.target.value) : '')}><option value="" disabled>Selecione um cliente</option>{customers.filter((customer) => customer.ativo).map((customer) => <option value={customer.id} key={customer.id}>{customer.apelido ?? customer.nome} · aberto {money(customer.totalAberto)}</option>)}</select></Field><Button icon={<Plus size={16} />}>Cliente rápido</Button><Field label="Observação da dívida"><input placeholder="Pagamento combinado para o fim do mês" /></Field></div>}
          <div className="payment-rule"><CircleDollarSign size={17} /><span>A venda finalizada não permite editar itens ou valores. Cancelamentos preservam o histórico.</span></div>
        </Modal>
      )}

      {modal === 'cancel' && (
        <Modal title="Cancelar esta venda?" description="Os itens serão removidos e o cancelamento ficará no histórico." size="small" onClose={() => setModal(null)} footer={<><Button variant="quiet" onClick={() => setModal(null)}>Manter venda</Button><Button variant="danger" onClick={cancelCart}>Cancelar venda</Button></>}>
          <div className="cancel-summary"><ReceiptText size={21} /><span><strong>{activeCart.codigo} · {activeCart.items.length} itens</strong><small>Total atual {money(total)}</small></span></div>
        </Modal>
      )}

      {toast && <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />}
    </div>
  )
}

function ArrowRightIcon() {
  return <span className="comparison-arrow">→</span>
}
