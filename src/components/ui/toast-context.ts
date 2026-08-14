import { createContext, useContext } from 'react'

export type ToastTone = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  title: string
  description?: string
  tone: ToastTone
}

export interface ToastInput {
  title: string
  description?: string
  tone?: ToastTone
  /** Milliseconds on screen. Defaults to 4500. */
  duration?: number
}

export interface ToastContextValue {
  toast: (input: ToastInput) => void
  dismiss: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a <ToastProvider>')
  return context
}
