'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Check, AlertCircle, Eye, EyeOff } from 'lucide-react'

interface FormInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  suggestion?: string
  validation?: (value: string) => { isValid: boolean; error?: string; suggestion?: string }
  showCheckmark?: boolean
  disabled?: boolean
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  suggestion,
  validation,
  showCheckmark = false,
  disabled = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPassword = type === 'password'
  const displayType = isPassword && !showPassword ? 'password' : 'text'

  const isValid = !error && value && showCheckmark
  const isError = !!error && value

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-lab-neutral-dark mb-2">
        {label}
      </label>

      <div className="relative">
        <Input
          type={displayType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`transition-all ${
            isError
              ? 'border-2 border-lab-error-red focus:ring-lab-error-red/20'
              : isValid
                ? 'border-2 border-lab-success-green focus:ring-lab-success-green/20'
                : isFocused
                  ? 'border-2 border-lab-bright-blue focus:ring-lab-bright-blue/20'
                  : 'border border-lab-neutral-light'
          }`}
        />

        {/* Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-lab-neutral-gray hover:text-lab-neutral-dark transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {isValid && <Check className="h-5 w-5 text-lab-success-green" />}
          {isError && <AlertCircle className="h-5 w-5 text-lab-error-red" />}
        </div>
      </div>

      {/* Hint text */}
      {hint && !error && (
        <p className="mt-1 text-xs text-lab-neutral-gray">{hint}</p>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-lab-error-red font-medium">{error}</p>
      )}

      {/* Suggestion */}
      {suggestion && error && (
        <p className="mt-1 text-xs text-lab-neutral-gray">
          💡 {suggestion}
        </p>
      )}
    </div>
  )
}
