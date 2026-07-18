import { useEffect, useRef, useState } from 'react'
import type { BrowserMultiFormatReader as BrowserMultiFormatReaderType, IScannerControls } from '@zxing/browser'
import { AlertTriangle, Camera, Keyboard, ScanLine } from 'lucide-react'
import { Button, Field, Modal } from './Ui'

interface BarcodeScannerProps {
  title?: string
  description?: string
  onClose: () => void
  onDetected: (code: string) => void
}

const cameraErrorMessage = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'NotAllowedError') return 'Permissão da câmera negada. Libere o acesso no navegador ou informe o código manualmente.'
  if (error instanceof DOMException && error.name === 'NotFoundError') return 'Nenhuma câmera foi encontrada neste dispositivo.'
  if (!window.isSecureContext) return 'A câmera exige HTTPS ou acesso por localhost.'
  return 'Não foi possível iniciar a câmera. Você ainda pode informar o código manualmente.'
}

export function BarcodeScanner({ title = 'Ler código', description = 'Aponte a câmera para o código de barras ou QR Code.', onClose, onDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onDetectedRef = useRef(onDetected)
  const handledRef = useRef(false)
  const [status, setStatus] = useState<'starting' | 'scanning' | 'error'>('starting')
  const [errorMessage, setErrorMessage] = useState('')
  const [manualCode, setManualCode] = useState('')

  useEffect(() => {
    onDetectedRef.current = onDetected
  }, [onDetected])

  useEffect(() => {
    let controls: IScannerControls | undefined
    let ReaderClass: typeof BrowserMultiFormatReaderType | undefined
    let cancelled = false

    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera API unavailable')
        const scannerModule = await import('@zxing/browser')
        ReaderClass = scannerModule.BrowserMultiFormatReader
        const reader = new ReaderClass(undefined, { delayBetweenScanAttempts: 120, delayBetweenScanSuccess: 700 })
        controls = await reader.decodeFromConstraints(
          { audio: false, video: { facingMode: { ideal: 'environment' } } },
          videoRef.current ?? undefined,
          (result, _error, scannerControls) => {
            if (!result || handledRef.current || cancelled) return
            handledRef.current = true
            scannerControls.stop()
            navigator.vibrate?.(80)
            onDetectedRef.current(result.getText().trim())
          },
        )
        if (!cancelled) setStatus('scanning')
      } catch (error) {
        if (cancelled) return
        setStatus('error')
        setErrorMessage(cameraErrorMessage(error))
      }
    }

    void start()
    return () => {
      cancelled = true
      controls?.stop()
      ReaderClass?.releaseAllStreams()
    }
  }, [])

  const confirmManualCode = () => {
    const code = manualCode.trim()
    if (code) onDetected(code)
  }

  return (
    <Modal
      title={title}
      description={description}
      size="small"
      onClose={onClose}
      footer={<><Button variant="quiet" onClick={onClose}>Cancelar</Button><Button variant="primary" icon={<Keyboard size={17} />} disabled={!manualCode.trim()} onClick={confirmManualCode}>Usar código</Button></>}
    >
      <div className="scanner-view">
        <video ref={videoRef} muted playsInline aria-label="Visualização da câmera para leitura de código" />
        <div className="scanner-frame" aria-hidden="true"><span /><ScanLine size={28} /></div>
        <div className={`scanner-status scanner-status--${status}`}>
          {status === 'error' ? <AlertTriangle size={18} /> : <Camera size={18} />}
          <span>{status === 'starting' ? 'Iniciando câmera…' : status === 'scanning' ? 'Centralize o código dentro da marcação' : errorMessage}</span>
        </div>
      </div>
      <div className="scanner-manual">
        <Field label="Informar código manualmente" hint="Use quando o código estiver danificado ou a câmera não estiver disponível.">
          <input value={manualCode} inputMode="numeric" autoComplete="off" placeholder="Digite o código" onChange={(event) => setManualCode(event.target.value.replace(/\s/g, ''))} onKeyDown={(event) => event.key === 'Enter' && confirmManualCode()} />
        </Field>
      </div>
    </Modal>
  )
}
