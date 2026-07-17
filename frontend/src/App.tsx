import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { AdminPage } from './pages/AdminPage'
import { CustomersPage } from './pages/CustomersPage'
import { DashboardPage } from './pages/DashboardPage'
import { FinancePage, FirmsPage } from './pages/FinancePages'
import { InventoryPage } from './pages/InventoryPage'
import { LoginPage } from './pages/LoginPage'
import { BackupsPage, AccountPage, ReportsPage } from './pages/MiscPages'
import { PdvPage } from './pages/PdvPage'
import { CashPage, SalesPage } from './pages/SalesCashPages'
import type { Role, ViewId } from './types'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [role, setRole] = useState<Role>('MERCADO')
  const [activeView, setActiveView] = useState<ViewId>('dashboard')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeView])

  const login = (nextRole: Role) => {
    setRole(nextRole)
    setActiveView(nextRole === 'APP_ADMIN' ? 'administracao' : 'dashboard')
    setAuthenticated(true)
  }

  const changeRole = (nextRole: Role) => {
    setRole(nextRole)
    setActiveView(nextRole === 'APP_ADMIN' ? 'administracao' : 'dashboard')
  }

  if (!authenticated) return <LoginPage onLogin={login} />

  const renderMarketView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardPage onNavigate={setActiveView} />
      case 'pdv': return <PdvPage />
      case 'vendas': return <SalesPage />
      case 'caixa': return <CashPage />
      case 'estoque': return <InventoryPage />
      case 'clientes': return <CustomersPage />
      case 'financeiro': return <FinancePage />
      case 'firmas': return <FirmsPage />
      case 'relatorios': return <ReportsPage />
      case 'backups': return <BackupsPage />
      case 'conta': return <AccountPage role={role} />
      default: return <DashboardPage onNavigate={setActiveView} />
    }
  }

  const renderAdminView = () => {
    if (activeView === 'administracao') return <AdminPage section="global" />
    if (activeView === 'dashboard') return <AdminPage section="markets" />
    if (activeView === 'clientes') return <AdminPage section="admins" />
    return <AccountPage role={role} />
  }

  return (
    <AppShell role={role} activeView={activeView} onNavigate={setActiveView} onLogout={() => setAuthenticated(false)} onRoleChange={changeRole}>
      {role === 'APP_ADMIN' ? renderAdminView() : renderMarketView()}
    </AppShell>
  )
}

