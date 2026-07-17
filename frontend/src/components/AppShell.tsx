import { useState, type ReactNode } from 'react'
import {
  Archive,
  Banknote,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Menu,
  PackageSearch,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'
import type { NavItem, Role, ViewId } from '../types'
import { Badge } from './Ui'

const marketNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pdv', label: 'PDV', icon: ShoppingCart },
  { id: 'vendas', label: 'Vendas', icon: ReceiptText },
  { id: 'caixa', label: 'Caixa', icon: Banknote },
  { id: 'estoque', label: 'Estoque', icon: Boxes },
  { id: 'clientes', label: 'Clientes / Fiado', icon: UsersRound },
  { id: 'financeiro', label: 'Financeiro', icon: CircleDollarSign },
  { id: 'firmas', label: 'Firmas', icon: Building2 },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  { id: 'backups', label: 'Backups', icon: Archive },
]

const adminNav: NavItem[] = [
  { id: 'administracao', label: 'Visão global', icon: ShieldCheck },
  { id: 'dashboard', label: 'Mercadinhos', icon: Store },
  { id: 'clientes', label: 'Administradores', icon: UserRound },
  { id: 'conta', label: 'Configurações', icon: Settings },
]

const bottomIds: ViewId[] = ['dashboard', 'pdv', 'estoque', 'clientes']

interface AppShellProps {
  children: ReactNode
  role: Role
  activeView: ViewId
  onNavigate: (view: ViewId) => void
  onLogout: () => void
  onRoleChange: (role: Role) => void
}

export function AppShell({ children, role, activeView, onNavigate, onLogout, onRoleChange }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigation = role === 'APP_ADMIN' ? adminNav : marketNav

  const navigate = (view: ViewId) => {
    onNavigate(view)
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="brand">
          <span className="brand__mark"><PackageSearch size={23} /></span>
          <div><strong>My Box</strong><span>PDV</span></div>
          <button className="icon-button sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={20} /></button>
        </div>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          <span className="nav-label">{role === 'APP_ADMIN' ? 'Administração' : 'Operação'}</span>
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className={`nav-item ${activeView === item.id ? 'nav-item--active' : ''}`} onClick={() => navigate(item.id)}>
                <Icon size={19} />
                <span>{item.label}</span>
                {item.id === 'clientes' && role === 'MERCADO' && <span className="nav-count">4</span>}
              </button>
            )
          })}
        </nav>

        <div className="sidebar__foot">
          {role === 'MERCADO' && (
            <div className="cash-status">
              <span className="cash-status__dot" />
              <div><strong>Caixa aberto</strong><small>desde 07:42</small></div>
              <span>8h24</span>
            </div>
          )}
          <button className={`nav-item ${activeView === 'conta' ? 'nav-item--active' : ''}`} onClick={() => navigate('conta')}>
            <Settings size={19} /><span>Minha conta</span>
          </button>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />}

      <div className="workspace">
        <header className="topbar">
          <button className="icon-button menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button>
          <div className="topbar__market">
            <span className="market-avatar">MC</span>
            <div><strong>{role === 'APP_ADMIN' ? 'Administração My Box' : 'Mercadinho Coutinho'}</strong><small>{role === 'APP_ADMIN' ? 'Visão global' : 'Fortaleza, CE'}</small></div>
          </div>
          <label className="global-search">
            <Search size={18} />
            <input aria-label="Busca rápida" placeholder="Buscar produto, venda ou cliente" />
            <kbd>Ctrl K</kbd>
          </label>
          <div className="topbar__actions">
            {role === 'MERCADO' && <Badge tone="success">Caixa aberto</Badge>}
            <button className="icon-button notification-button" aria-label="Notificações"><Bell size={19} /><span /></button>
            <div className="profile-menu">
              <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}>
                <span>CO</span><ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="profile-popover">
                  <div><strong>Coutinho</strong><small>coutinho@mybox.com</small></div>
                  <button onClick={() => { onRoleChange(role === 'MERCADO' ? 'APP_ADMIN' : 'MERCADO'); setProfileOpen(false) }}>
                    <ShieldCheck size={17} />{role === 'MERCADO' ? 'Entrar como APP_ADMIN' : 'Entrar como mercado'}
                  </button>
                  <button onClick={onLogout}><ClipboardList size={17} />Sair da conta</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">{children}</main>

        {role === 'MERCADO' && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {marketNav.filter((item) => bottomIds.includes(item.id)).map((item) => {
              const Icon = item.icon
              return <button key={item.id} className={activeView === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><Icon size={20} /><span>{item.label === 'Clientes / Fiado' ? 'Fiado' : item.label}</span></button>
            })}
            <button onClick={() => setMenuOpen(true)}><Menu size={20} /><span>Mais</span></button>
          </nav>
        )}
      </div>
    </div>
  )
}

