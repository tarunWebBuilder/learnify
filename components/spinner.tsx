import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  centered?: boolean
}

export function Spinner({ size = 'md', message, centered = false }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const spinnerContent = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${sizeClasses[size]} text-lab-bright-blue animate-spin`} />
      {message && <p className="text-sm text-lab-neutral-gray">{message}</p>}
    </div>
  )

  if (centered) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinnerContent}
      </div>
    )
  }

  return spinnerContent
}

export function ButtonSpinner() {
  return <Loader2 className="h-4 w-4 animate-spin" />
}

export function InlineSpinner() {
  return <Loader2 className="h-4 w-4 inline animate-spin" />
}
