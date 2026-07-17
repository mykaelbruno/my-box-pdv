import type { LucideIcon } from 'lucide-react'

export type ViewId =
  | 'dashboard'
  | 'pdv'
  | 'vendas'
  | 'caixa'
  | 'estoque'
  | 'clientes'
  | 'financeiro'
  | 'firmas'
  | 'relatorios'
  | 'backups'
  | 'administracao'
  | 'conta'

export type Role = 'MERCADO' | 'APP_ADMIN'

export interface NavItem {
  id: ViewId
  label: string
  icon: LucideIcon
}

export interface Presentation {
  id: number
  nome: string
  fatorBase: number
  preco: number
  codigo: string
}

export interface Product {
  id: number
  nome: string
  categoria: string
  unidade: 'KG' | 'UN'
  estoque: number
  minimo: number
  custo: number
  ativo: boolean
  presentations: Presentation[]
}

export interface CartItem {
  id: string
  produtoId?: number
  nome: string
  apresentacao: string
  quantidade: number
  fatorBase: number
  preco: number
  ajuste: number
  manual?: boolean
}

export interface Cart {
  id: number
  codigo: string
  horario: string
  operador: string
  clienteId?: number
  apelido?: string
  items: CartItem[]
}

export interface Customer {
  id: number
  nome: string
  apelido?: string
  telefone?: string
  totalAberto: number
  totalPago: number
  dividas: number
  ultimoPagamento: string
  ativo: boolean
}

export interface Account {
  id: number
  descricao: string
  tipo: string
  firma?: string
  vencimento: string
  valor: number
  status: 'Em aberto' | 'Paga' | 'Vencida' | 'Cancelada'
}

export interface Firm {
  id: number
  nome: string
  cnpj: string
  responsavel: string
  limite: number
  utilizado: number
  ativo: boolean
}
