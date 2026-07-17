import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, PackageSearch, ShieldCheck, Store } from 'lucide-react'
import type { Role } from '../types'
import { Button, Field } from '../components/Ui'

export function LoginPage({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>('MERCADO')
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState('coutinho')
  const [password, setPassword] = useState('mercado123')
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!identifier.trim() || !password.trim()) {
      setError('Usuário ou senha inválidos')
      return
    }
    onLogin(role)
  }

  const chooseRole = (nextRole: Role) => {
    setRole(nextRole)
    setIdentifier(nextRole === 'MERCADO' ? 'coutinho' : 'admin.mybox')
    setPassword(nextRole === 'MERCADO' ? 'mercado123' : 'admin123')
    setError('')
  }

  return (
    <main className="login-page">
      <section className="login-context">
        <div className="login-brand"><span><PackageSearch size={25} /></span><strong>My Box <b>PDV</b></strong></div>
        <div className="login-context__copy">
          <span className="login-kicker">Mercadinho Coutinho</span>
          <h1>Seu balcão, caixa e caderno no mesmo lugar.</h1>
          <p>Um dia de trabalho mais claro, da primeira venda ao fechamento.</p>
        </div>
        <div className="receipt-preview">
          <div className="receipt-preview__head"><span>Movimento de hoje</span><strong>17 JUL</strong></div>
          <div className="receipt-preview__total"><small>Vendas recebidas</small><strong>R$ 2.847,60</strong><span>+12,4% ontem</span></div>
          <div className="receipt-preview__lines"><span /><span /><span /></div>
          <div className="receipt-preview__foot"><span>Caixa aberto</span><b>07:42</b></div>
        </div>
        <small className="login-version">My Box PDV · Protótipo V1</small>
      </section>

      <section className="login-panel">
        <form className="login-form" onSubmit={submit}>
          <div className="login-form__intro">
            <span className="login-form__icon"><LockKeyhole size={21} /></span>
            <h2>Bem-vindo de volta</h2>
            <p>Acesse o ambiente do seu mercado.</p>
          </div>

          <div className="role-switch" aria-label="Perfil de acesso">
            <button type="button" className={role === 'MERCADO' ? 'active' : ''} onClick={() => chooseRole('MERCADO')}><Store size={17} />Mercado</button>
            <button type="button" className={role === 'APP_ADMIN' ? 'active' : ''} onClick={() => chooseRole('APP_ADMIN')}><ShieldCheck size={17} />APP_ADMIN</button>
          </div>

          <Field label="Usuário ou e-mail">
            <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} autoComplete="username" />
          </Field>
          <Field label="Senha">
            <div className="input-with-action">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </Field>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div className="login-form__meta"><label><input type="checkbox" /> Manter conectado</label><button type="button">Esqueci minha senha</button></div>
          <Button variant="primary" type="submit" className="login-submit">Entrar</Button>
          <p className="login-security"><ShieldCheck size={16} /> Acesso protegido e monitorado</p>
        </form>
      </section>
    </main>
  )
}

