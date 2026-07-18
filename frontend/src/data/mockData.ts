import type { Account, Cart, Customer, Firm, Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    nome: 'Feijão Carioca',
    categoria: 'Grãos',
    unidade: 'KG',
    estoque: 300,
    minimo: 40,
    custo: 5.15,
    ativo: true,
    presentations: [
      { id: 11, nome: '1 kg', fatorBase: 1, preco: 7, codigo: '789100001001' },
      { id: 12, nome: 'Fardo pequeno', fatorBase: 10, preco: 68, codigo: '789100001010' },
      { id: 13, nome: 'Fardo grande', fatorBase: 30, preco: 195, codigo: '789100001030' },
    ],
  },
  {
    id: 2,
    nome: 'Arroz Branco',
    categoria: 'Grãos',
    unidade: 'KG',
    estoque: 180,
    minimo: 35,
    custo: 4.3,
    ativo: true,
    presentations: [
      { id: 21, nome: '1 kg', fatorBase: 1, preco: 6.2, codigo: '789100002001' },
      { id: 22, nome: 'Fardo 10 kg', fatorBase: 10, preco: 59, codigo: '789100002010' },
    ],
  },
  {
    id: 3,
    nome: 'Óleo de Soja',
    categoria: 'Mercearia',
    unidade: 'UN',
    estoque: 48,
    minimo: 24,
    custo: 6.4,
    ativo: true,
    presentations: [
      { id: 31, nome: 'Unidade', fatorBase: 1, preco: 8.9, codigo: '789100003001' },
      { id: 32, nome: 'Caixa com 12', fatorBase: 12, preco: 102, codigo: '789100003012' },
    ],
  },
  {
    id: 4,
    nome: 'Açúcar Cristal',
    categoria: 'Mercearia',
    unidade: 'KG',
    estoque: 11,
    minimo: 25,
    custo: 3.75,
    ativo: true,
    presentations: [
      { id: 41, nome: '1 kg', fatorBase: 1, preco: 5.5, codigo: '789100004001' },
      { id: 42, nome: 'Fardo 10 kg', fatorBase: 10, preco: 52, codigo: '789100004010' },
    ],
  },
  {
    id: 5,
    nome: 'Café Torrado',
    categoria: 'Mercearia',
    unidade: 'UN',
    estoque: 0,
    minimo: 12,
    custo: 12.2,
    ativo: true,
    presentations: [
      { id: 51, nome: 'Pacote 500 g', fatorBase: 1, preco: 17.9, codigo: '789100005001' },
    ],
  },
]

export const initialCarts: Cart[] = [
  {
    id: 1,
    codigo: '#1048',
    horario: '10:32',
    operador: 'Coutinho',
    items: [
      { id: 'i-1', produtoId: 1, nome: 'Feijão Carioca', apresentacao: '1 kg', quantidade: 2, fatorBase: 1, preco: 7, ajuste: 0 },
      { id: 'i-2', produtoId: 3, nome: 'Óleo de Soja', apresentacao: 'Unidade', quantidade: 1, fatorBase: 1, preco: 8.9, ajuste: -2 },
    ],
  },
  {
    id: 2,
    codigo: '#1049',
    horario: '10:41',
    operador: 'Coutinho',
    items: [
      { id: 'i-3', produtoId: 2, nome: 'Arroz Branco', apresentacao: 'Fardo 10 kg', quantidade: 1, fatorBase: 10, preco: 59, ajuste: -3 },
    ],
  },
]

export const customers: Customer[] = [
  { id: 1, nome: 'Maria de Lourdes', apelido: 'Dona Maria', telefone: '(85) 99812-4430', totalAberto: 186.4, totalPago: 420, dividas: 3, ultimoPagamento: '15 jul, 2026', ativo: true },
  { id: 2, nome: 'José Raimundo', apelido: 'Seu José', telefone: '(85) 98742-1198', totalAberto: 74.9, totalPago: 215.5, dividas: 1, ultimoPagamento: '10 jul, 2026', ativo: true },
  { id: 3, nome: 'Ana Paula', telefone: '(85) 99601-7732', totalAberto: 0, totalPago: 318.25, dividas: 0, ultimoPagamento: '02 jul, 2026', ativo: true },
  { id: 4, nome: 'Francisco Alves', apelido: 'Chico', totalAberto: 42, totalPago: 58, dividas: 1, ultimoPagamento: '18 jun, 2026', ativo: false },
]

export const accounts: Account[] = [
  { id: 1, descricao: 'Boleto do fornecedor Norte', tipo: 'Boleto', firma: 'Mercado Compras MEI', vencimento: '18 jul', valor: 1280, status: 'Em aberto' },
  { id: 2, descricao: 'Conta de energia', tipo: 'Despesa', vencimento: '15 jul', valor: 486.72, status: 'Vencida' },
  { id: 3, descricao: 'Nota de compra de bebidas', tipo: 'Compra', firma: 'Coutinho Alimentos LTDA.', vencimento: '22 jul', valor: 2140, status: 'Em aberto' },
  { id: 4, descricao: 'Manutenção do freezer', tipo: 'Outro', vencimento: '08 jul', valor: 280, status: 'Paga' },
]

export const firms: Firm[] = [
  { id: 1, nome: 'Mercado Compras MEI', cnpj: '42.681.920/0001-30', responsavel: 'Mikael Coutinho', limite: 8000, utilizado: 5480, ativo: true },
  { id: 2, nome: 'Coutinho Alimentos LTDA.', cnpj: '18.093.554/0001-12', responsavel: 'Mikael Coutinho', limite: 12000, utilizado: 9140, ativo: true },
  { id: 3, nome: 'Coutinho Varejo', cnpj: '31.177.320/0001-64', responsavel: 'Rosa Coutinho', limite: 5000, utilizado: 0, ativo: false },
]

export const recentSales = [
  { id: '#1047', time: '10:24', items: 4, customer: 'Balcão', payment: 'Pix', total: 42.7, status: 'Finalizada' },
  { id: '#1046', time: '10:08', items: 8, customer: 'Dona Maria', payment: 'Fiado', total: 86.4, status: 'Finalizada' },
  { id: '#1045', time: '09:51', items: 2, customer: 'Balcão', payment: 'Dinheiro', total: 24.4, status: 'Finalizada' },
  { id: '#1044', time: '09:37', items: 11, customer: 'Balcão', payment: 'Cartão', total: 157.3, status: 'Finalizada' },
  { id: '#1043', time: '09:14', items: 3, customer: 'Seu José', payment: 'Fiado', total: 38.5, status: 'Cancelada' },
]

export const currentCash = {
  openedAt: '07:42',
  elapsed: '8h24',
  operator: 'Coutinho',
  salesCount: 42,
  cancellationCount: 1,
  cancellationTotal: 38.5,
  receivedTotal: 2847.6,
  salesTotal: 3095.9,
  creditSalesCount: 3,
  payments: {
    dinheiro: 1284.6,
    pix: 901.4,
    cartao: 661.6,
    fiado: 248.3,
  },
} as const

export const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
