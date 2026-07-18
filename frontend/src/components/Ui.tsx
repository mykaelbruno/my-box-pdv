import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type PropsWithChildren, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, Check, Info, X } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

export function Button({ variant = 'secondary', icon, children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`} {...props}>
      {icon}
      {children && <span>{children}</span>}
    </button>
  )
}

type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: BadgeTone }>) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="page-header__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  )
}

interface MetricProps {
  label: string
  value: string
  detail?: string
  tone?: BadgeTone
  featured?: boolean
  icon?: ReactNode
}

export function Metric({ label, value, detail, tone = 'neutral', featured, icon }: MetricProps) {
  return (
    <article className={`metric ${featured ? 'metric--featured' : ''}`}>
      <div className="metric__top">
        <span>{label}</span>
        {icon && <span className={`metric__icon metric__icon--${tone}`}>{icon}</span>}
      </div>
      <strong>{value}</strong>
      {detail && <small className={`text-${tone}`}>{detail}</small>}
    </article>
  )
}

interface ModalProps {
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  size?: 'small' | 'medium' | 'large'
}

export function Modal({ title, description, onClose, children, footer, size = 'medium' }: ModalProps) {
  useEffect(() => {
    document.documentElement.classList.add('modal-open')
    document.body.classList.add('modal-open')

    return () => {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }
  }, [])

  return createPortal(
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <dialog className={`modal modal--${size}`} open aria-labelledby="modal-title">
        <div className="modal__header">
          <div>
            <h2 id="modal-title">{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </dialog>
    </div>,
    document.body,
  )
}

interface NumericInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'min' | 'max' | 'step'> {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  decimalScale?: number
}

const formatNumericValue = (value: number, decimalScale: number) => decimalScale === 0
  ? Math.round(value).toString()
  : value.toFixed(decimalScale).replace('.', ',')

const parseNumericValue = (value: string) => {
  const parsed = Number.parseFloat(value.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

export function NumericInput({ value, onValueChange, min, max, decimalScale = 2, onFocus, onBlur, ...props }: NumericInputProps) {
  const focused = useRef(false)
  const [draft, setDraft] = useState(() => formatNumericValue(value, decimalScale))

  useEffect(() => {
    if (!focused.current) setDraft(formatNumericValue(value, decimalScale))
  }, [decimalScale, value])

  const updateDraft = (nextValue: string) => {
    const withDecimalSeparator = nextValue.replace('.', ',')
    const normalized = decimalScale === 0
      ? withDecimalSeparator.split(',')[0].replace(/[^\d]/g, '')
      : withDecimalSeparator.replace(/[^\d,]/g, '')
    const pattern = decimalScale === 0 ? /^\d*$/ : new RegExp(`^\\d*(,\\d{0,${decimalScale}})?$`)
    if (!pattern.test(normalized)) return

    setDraft(normalized)
    const parsed = parseNumericValue(normalized)
    onValueChange(parsed ?? 0)
  }

  const commitValue = () => {
    focused.current = false
    const parsed = parseNumericValue(draft)
    const fallback = min ?? 0
    const bounded = Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, parsed ?? fallback))
    const rounded = decimalScale === 0 ? Math.round(bounded) : Math.round(bounded * (10 ** decimalScale)) / (10 ** decimalScale)
    onValueChange(rounded)
    setDraft(formatNumericValue(rounded, decimalScale))
  }

  return (
    <input
      {...props}
      type="text"
      inputMode={decimalScale === 0 ? 'numeric' : 'decimal'}
      value={draft}
      onChange={(event) => updateDraft(event.currentTarget.value)}
      onFocus={(event) => {
        focused.current = true
        onFocus?.(event)
      }}
      onBlur={(event) => {
        commitValue()
        onBlur?.(event)
      }}
    />
  )
}

export function Field({ label, hint, children }: PropsWithChildren<{ label: string; hint?: string }>) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  )
}

export function Section({ title, action, children, className = '' }: PropsWithChildren<{ title: string; action?: ReactNode; className?: string }>) {
  return (
    <section className={`section ${className}`}>
      <div className="section__header">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark"><Info size={20} /></div>
      <strong>{title}</strong>
      <p>{description}</p>
      {action}
    </div>
  )
}

export type ToastTone = 'success' | 'warning' | 'error'

export function Toast({ message, tone = 'success', onClose }: { message: string; tone?: ToastTone; onClose: () => void }) {
  const Icon = tone === 'success' ? Check : AlertTriangle
  return (
    <div className={`toast toast--${tone}`} role="status">
      <Icon size={18} />
      <span>{message}</span>
      <button onClick={onClose} aria-label="Fechar aviso"><X size={16} /></button>
    </div>
  )
}

export function Progress({ value, max = 100, tone = 'success' }: { value: number; max?: number; tone?: BadgeTone }) {
  const width = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="progress" aria-label={`${Math.round(width)}%`}>
      <span className={`progress__bar progress__bar--${tone}`} style={{ width: `${width}%` }} />
    </div>
  )
}
