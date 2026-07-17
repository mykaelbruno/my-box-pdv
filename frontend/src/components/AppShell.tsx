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
  House,
  LogOut,
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

const marketOperationNav: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: House },
  { id: 'pdv', label: 'Vender', icon: ShoppingCart },
  { id: 'clientes', label: 'Caderno de Fiado', icon: UsersRound },
  { id: 'estoque', label: 'Estoque', icon: Boxes },
]

const marketFinanceNav: NavItem[] = [
  { id: 'caixa', label: 'Caixa', icon: Banknote },
  { id: 'vendas', label: 'Vendas', icon: ReceiptText },
  { id: 'firmas', label: 'Firmas', icon: Building2 },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
]

const marketSystemNav: NavItem[] = [
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
  const [financeOpen, setFinanceOpen] = useState(true)

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
          {role === 'APP_ADMIN' ? (
            <>
              <span className="nav-label">Administração</span>
              {adminNav.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.id} className={`nav-item ${activeView === item.id ? 'nav-item--active' : ''}`} onClick={() => navigate(item.id)}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </>
          ) : (
            <>
              <span className="nav-label">Operação</span>
              {marketOperationNav.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.id} className={`nav-item ${activeView === item.id ? 'nav-item--active' : ''}`} onClick={() => navigate(item.id)}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                    {item.id === 'clientes' && <span className="nav-count">4</span>}
                  </button>
                )
              })}

              <div className="nav-group">
                <button
                  className={`nav-item nav-group__toggle ${activeView === 'financeiro' || marketFinanceNav.some((item) => item.id === activeView) ? 'nav-item--group-active' : ''}`}
                  onClick={() => setFinanceOpen((open) => !open)}
                  aria-expanded={financeOpen}
                  aria-controls="finance-navigation"
                >
                  <CircleDollarSign size={19} />
                  <span>Financeiro</span>
                  <ChevronDown className="nav-group__chevron" size={17} />
                </button>
                {financeOpen && (
                  <div className="nav-submenu" id="finance-navigation">
                    {marketFinanceNav.map((item) => {
                      const Icon = item.icon
                      return (
                        <button key={item.id} className={`nav-item ${activeView === item.id ? 'nav-item--active' : ''}`} onClick={() => navigate(item.id)}>
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <span className="nav-label nav-label--section">Sistema</span>
              {marketSystemNav.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.id} className={`nav-item ${activeView === item.id ? 'nav-item--active' : ''}`} onClick={() => navigate(item.id)}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </>
          )}
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
          <button className="nav-item sidebar__logout" onClick={onLogout}>
            <LogOut size={19} /><span>Sair</span>
          </button>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />}

      <div className={`workspace ${activeView === 'pdv' ? 'workspace--pdv' : ''}`}>
        <header className={`topbar ${role === 'MERCADO' && activeView !== 'dashboard' ? 'topbar--mobile-hidden' : ''}`}>
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
            {bottomIds.map((id) => marketOperationNav.find((item) => item.id === id)).filter((item): item is NavItem => Boolean(item)).map((item) => {
              const Icon = item.icon
              return <button key={item.id} className={activeView === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><Icon size={24} /><span>{item.id === 'clientes' ? 'Fiado' : item.label}</span></button>
            })}
            <button onClick={() => setMenuOpen(true)}><Menu size={24} /><span>Mais</span></button>
          </nav>
        )}
      </div>
    </div>
  )
}
