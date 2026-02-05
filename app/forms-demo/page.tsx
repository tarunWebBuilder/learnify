'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/form-input'
import { PasswordStrength } from '@/components/password-strength'
import { validateEmail, validatePassword, validateName } from '@/lib/validations'

export default function FormsDemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Validate on change
    let error = ''
    switch (field) {
      case 'firstName':
      case 'lastName': {
        const validation = validateName(value, field === 'firstName' ? 'First name' : 'Last name')
        error = validation.error || ''
        break
      }
      case 'email': {
        const validation = validateEmail(value)
        error = validation.error || ''
        break
      }
      case 'password': {
        const validation = validatePassword(value)
        error = validation.error || ''
        break
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}

    const firstNameValidation = validateName(formData.firstName, 'First name')
    if (!firstNameValidation.isValid) newErrors.firstName = firstNameValidation.error || ''

    const lastNameValidation = validateName(formData.lastName, 'Last name')
    if (!lastNameValidation.isValid) newErrors.lastName = lastNameValidation.error || ''

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) newErrors.email = emailValidation.error || ''

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error || ''

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <div className="min-h-screen bg-lab-neutral-light py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-lab-neutral-dark mb-2">Form Validation Demo</h1>
          <p className="text-lab-neutral-gray">
            Comprehensive form validation with real-time feedback and progressive disclosure
          </p>
        </div>

        <Card className="border border-lab-neutral-light p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(value) => handleChange('firstName', value)}
                onBlur={() => handleBlur('firstName')}
                error={touched.firstName ? errors.firstName : ''}
                showCheckmark={touched.firstName && !errors.firstName && !!formData.firstName}
              />
              <FormInput
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(value) => handleChange('lastName', value)}
                onBlur={() => handleBlur('lastName')}
                error={touched.lastName ? errors.lastName : ''}
                showCheckmark={touched.lastName && !errors.lastName && !!formData.lastName}
              />
            </div>

            {/* Email Field */}
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : ''}
              hint="We'll never share your email"
              showCheckmark={touched.email && !errors.email && !!formData.email}
            />

            {/* Password Field */}
            <div>
              <FormInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                onBlur={() => handleBlur('password')}
                error={touched.password ? errors.password : ''}
                showCheckmark={touched.password && !errors.password && !!formData.password}
              />

              {formData.password && (
                <div className="mt-4">
                  <PasswordStrength password={formData.password} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
            >
              Create Account
            </Button>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-lab-neutral-dark">
                <strong>Try this:</strong> Fill in each field to see real-time validation feedback. 
                Errors appear as you type, and success checkmarks confirm valid input.
              </p>
            </div>
          </form>
        </Card>

        {/* Validation Patterns Reference */}
        <Card className="border border-lab-neutral-light p-8 shadow-sm mt-8">
          <h2 className="text-2xl font-bold text-lab-neutral-dark mb-4">Validation Patterns</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-lab-neutral-dark mb-2">Email Validation</p>
              <ul className="space-y-1 text-lab-neutral-gray">
                <li>• Must contain @ symbol</li>
                <li>• Must have domain name</li>
                <li>• Real-time feedback on typing</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-lab-neutral-light">
              <p className="font-semibold text-lab-neutral-dark mb-2">Password Requirements</p>
              <ul className="space-y-1 text-lab-neutral-gray">
                <li>• Minimum 8 characters</li>
                <li>• At least one uppercase letter</li>
                <li>• At least one number</li>
                <li>• Optional: special character for maximum strength</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-lab-neutral-light">
              <p className="font-semibold text-lab-neutral-dark mb-2">Name Validation</p>
              <ul className="space-y-1 text-lab-neutral-gray">
                <li>• Minimum 2 characters</li>
                <li>• Letters, spaces, hyphens, and apostrophes allowed</li>
                <li>• Progressive validation feedback</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
