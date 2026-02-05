export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const passwordRegex = {
  minLength: (pwd: string) => pwd.length >= 8,
  hasUppercase: (pwd: string) => /[A-Z]/.test(pwd),
  hasLowercase: (pwd: string) => /[a-z]/.test(pwd),
  hasNumber: (pwd: string) => /\d/.test(pwd),
  hasSpecial: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
}

export interface ValidationResult {
  isValid: boolean
  error?: string
  suggestion?: string
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
      suggestion: 'Example: you@example.com',
    }
  }
  return { isValid: true }
}

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }
  if (!passwordRegex.minLength(password)) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters long',
    }
  }
  return { isValid: true }
}

export const getPasswordStrength = (password: string) => {
  const checks = {
    minLength: passwordRegex.minLength(password),
    uppercase: passwordRegex.hasUppercase(password),
    lowercase: passwordRegex.hasLowercase(password),
    number: passwordRegex.hasNumber(password),
    special: passwordRegex.hasSpecial(password),
  }

  const passedChecks = Object.values(checks).filter(Boolean).length
  
  if (passedChecks <= 2) return { strength: 'Weak', percentage: 30 }
  if (passedChecks === 3) return { strength: 'Medium', percentage: 60 }
  if (passedChecks === 4) return { strength: 'Strong', percentage: 85 }
  return { strength: 'Very Strong', percentage: 100 }
}

export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  if (name.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` }
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`,
    }
  }
  return { isValid: true }
}
