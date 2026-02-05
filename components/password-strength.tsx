'use client'

import { getPasswordStrength, passwordRegex } from '@/lib/validations'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { strength, percentage } = getPasswordStrength(password)

  const checks = [
    { label: '8+ characters', met: passwordRegex.minLength(password) },
    { label: 'Uppercase letter', met: passwordRegex.hasUppercase(password) },
    { label: 'Number', met: passwordRegex.hasNumber(password) },
    { label: 'Special character', met: passwordRegex.hasSpecial(password) },
  ]

  const strengthColor = {
    Weak: 'bg-lab-error-red',
    Medium: 'bg-lab-warning-amber',
    Strong: 'bg-lab-bright-blue',
    'Very Strong': 'bg-lab-success-green',
  }

  return (
    <div className="space-y-4">
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-lab-neutral-gray">Password strength</span>
          <span className={`text-xs font-semibold ${strengthColor[strength as keyof typeof strengthColor]?.includes('error') ? 'text-lab-error-red' : strengthColor[strength as keyof typeof strengthColor]?.includes('warning') ? 'text-lab-warning-amber' : 'text-lab-neutral-gray'}`}>
            {strength}
          </span>
        </div>
        <div className="w-full h-2 bg-lab-neutral-light rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${strengthColor[strength as keyof typeof strengthColor] || 'bg-lab-neutral-light'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-lab-neutral-gray">Requirements:</p>
        <div className="space-y-1">
          {checks.map((check) => (
            <div key={check.label} className="flex items-center gap-2">
              {check.met ? (
                <Check className="h-4 w-4 text-lab-success-green" />
              ) : (
                <X className="h-4 w-4 text-lab-neutral-light" />
              )}
              <span className={`text-xs ${check.met ? 'text-lab-neutral-dark' : 'text-lab-neutral-gray'}`}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
