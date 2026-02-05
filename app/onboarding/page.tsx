'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { validateEmail, validateName, getPasswordStrength } from '@/lib/validations'

type OnboardingStep = 'welcome' | 'setup' | 'preferences' | 'courses' | 'complete'

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    learningGoal: '',
    learningStyle: '',
    timeCommitment: 10,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNext = async () => {
    setLoading(true)
    
    switch (step) {
      case 'welcome':
        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
          setErrors({ email: emailValidation.error || '' })
          setLoading(false)
          return
        }
        setErrors({})
        setStep('setup')
        break
      
      case 'setup':
        const firstNameValidation = validateName(formData.firstName, 'First name')
        const lastNameValidation = validateName(formData.lastName, 'Last name')
        
        if (!firstNameValidation.isValid || !lastNameValidation.isValid) {
          setErrors({
            firstName: firstNameValidation.error || '',
            lastName: lastNameValidation.error || '',
          })
          setLoading(false)
          return
        }
        
        if (!formData.learningGoal) {
          setErrors({ learningGoal: 'Please select a learning goal' })
          setLoading(false)
          return
        }
        
        setErrors({})
        setStep('preferences')
        break
      
      case 'preferences':
        if (!formData.learningStyle) {
          setErrors({ learningStyle: 'Please select a learning style' })
          setLoading(false)
          return
        }
        setErrors({})
        setStep('courses')
        break
      
      case 'courses':
        setStep('complete')
        break
    }
    
    setLoading(false)
  }

  const handleBack = () => {
    const steps: OnboardingStep[] = ['welcome', 'setup', 'preferences', 'courses']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleSkip = () => {
    if (step === 'setup') {
      setStep('preferences')
    } else if (step === 'preferences') {
      setStep('courses')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lab-neutral-light to-white">
      {/* Navigation */}
      <div className="border-b border-lab-neutral-light bg-white sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-lab-bright-blue flex items-center justify-center">
              <span className="text-white font-bold">LL</span>
            </div>
            <span className="font-bold text-lab-neutral-dark">LAB LAND</span>
          </div>
          {step !== 'complete' && step !== 'welcome' && (
            <button
              onClick={() => setStep('welcome')}
              className="text-sm text-lab-neutral-gray hover:text-lab-neutral-dark"
            >
              Back to start
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          {step !== 'welcome' && step !== 'complete' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {['setup', 'preferences', 'courses'].map((s, idx) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        ['setup', 'preferences', 'courses'].indexOf(step) > idx
                          ? 'bg-lab-success-green text-white'
                          : ['setup', 'preferences', 'courses'].indexOf(step) === idx
                            ? 'bg-lab-bright-blue text-white'
                            : 'bg-lab-neutral-light text-lab-neutral-gray'
                      }`}
                    >
                      {['setup', 'preferences', 'courses'].indexOf(step) > idx ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    {idx < 2 && (
                      <div
                        className={`h-1 w-12 mx-2 ${
                          ['setup', 'preferences', 'courses'].indexOf(step) > idx
                            ? 'bg-lab-success-green'
                            : 'bg-lab-neutral-light'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-lab-neutral-gray text-center">
                Step {['setup', 'preferences', 'courses'].indexOf(step) + 1} of 3
              </p>
            </div>
          )}

          {/* Welcome Screen */}
          {step === 'welcome' && (
            <Card className="border border-lab-neutral-light p-8 shadow-sm">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-lab-neutral-dark mb-4">
                  Welcome to LAB LAND!
                </h1>
                <p className="text-lg text-lab-neutral-gray">
                  Start your learning journey with world-class courses
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lab-neutral-dark mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setErrors({ ...errors, email: '' })
                    }}
                    className="border border-lab-neutral-light focus:border-lab-bright-blue focus:ring-1 focus:ring-lab-bright-blue"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-lab-error-red">{errors.email}</p>
                  )}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
                >
                  {loading ? 'Signing up...' : 'Sign up with email'}
                </Button>

                <Button variant="outline" className="w-full border-lab-neutral-light text-lab-neutral-gray hover:bg-lab-neutral-light bg-transparent">
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-lab-neutral-gray">
                  Already have an account?{' '}
                  <a href="/login" className="text-lab-bright-blue hover:underline">
                    Log in
                  </a>
                </p>
              </div>
            </Card>
          )}

          {/* Setup Screen */}
          {step === 'setup' && (
            <Card className="border border-lab-neutral-light p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-lab-neutral-dark mb-6">
                Set up your account
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-lab-neutral-dark mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value })
                        setErrors({ ...errors, firstName: '' })
                      }}
                      className="border border-lab-neutral-light focus:border-lab-bright-blue focus:ring-1 focus:ring-lab-bright-blue"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-lab-error-red">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lab-neutral-dark mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value })
                        setErrors({ ...errors, lastName: '' })
                      }}
                      className="border border-lab-neutral-light focus:border-lab-bright-blue focus:ring-1 focus:ring-lab-bright-blue"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-lab-error-red">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-lab-neutral-dark mb-3">
                    What's your learning goal?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'career', label: 'Career change' },
                      { value: 'skill', label: 'Skill development' },
                      { value: 'academic', label: 'Academic' },
                      { value: 'hobby', label: 'Hobby' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center p-3 border border-lab-neutral-light rounded-lg cursor-pointer hover:bg-lab-neutral-light transition-colors"
                      >
                        <input
                          type="radio"
                          name="learningGoal"
                          value={option.value}
                          checked={formData.learningGoal === option.value}
                          onChange={(e) => {
                            setFormData({ ...formData, learningGoal: e.target.value })
                            setErrors({ ...errors, learningGoal: '' })
                          }}
                          className="h-4 w-4 accent-lab-bright-blue"
                        />
                        <span className="ml-3 text-lab-neutral-dark font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.learningGoal && (
                    <p className="mt-2 text-sm text-lab-error-red">{errors.learningGoal}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-5 w-5 text-lab-bright-blue" />
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 accent-lab-bright-blue" defaultChecked />
                    <span className="ml-2 text-sm text-lab-neutral-gray">Subscribe to weekly updates</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={handleBack} className="flex-1 border-lab-neutral-light bg-transparent">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue gap-2"
                >
                  {loading ? 'Next...' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Preferences Screen */}
          {step === 'preferences' && (
            <Card className="border border-lab-neutral-light p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-lab-neutral-dark mb-6">
                How do you prefer to learn?
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="space-y-2 mb-6">
                    {[
                      { value: 'visual', label: 'Visual', description: 'Diagrams, videos, infographics' },
                      { value: 'hands-on', label: 'Hands-on', description: 'Projects, practice, exercises' },
                      { value: 'reading', label: 'Reading', description: 'Texts, articles, documentation' },
                      { value: 'discussion', label: 'Discussion', description: 'Group learning, peer interaction' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start p-4 border border-lab-neutral-light rounded-lg cursor-pointer hover:bg-lab-neutral-light transition-colors"
                      >
                        <input
                          type="radio"
                          name="learningStyle"
                          value={option.value}
                          checked={formData.learningStyle === option.value}
                          onChange={(e) => {
                            setFormData({ ...formData, learningStyle: e.target.value })
                            setErrors({ ...errors, learningStyle: '' })
                          }}
                          className="h-4 w-4 accent-lab-bright-blue mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-lab-neutral-dark">{option.label}</p>
                          <p className="text-sm text-lab-neutral-gray">{option.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.learningStyle && (
                    <p className="text-sm text-lab-error-red">{errors.learningStyle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-lab-neutral-dark mb-4">
                    How much time can you commit per week?
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={formData.timeCommitment}
                      onChange={(e) => setFormData({ ...formData, timeCommitment: parseInt(e.target.value) })}
                      className="flex-1 accent-lab-bright-blue"
                    />
                    <span className="text-lg font-semibold text-lab-neutral-dark min-w-24">
                      {formData.timeCommitment} hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={handleBack} className="flex-1 border-lab-neutral-light bg-transparent">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue gap-2"
                >
                  {loading ? 'Next...' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Courses Screen */}
          {step === 'courses' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-lab-neutral-dark mb-2">
                  Courses recommended for you
                </h2>
                <p className="text-lab-neutral-gray">
                  Based on your preferences, we recommend these courses
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Mobile Design Fundamentals', instructor: 'Sarah Johnson', price: '$99' },
                  { title: 'UX Design Foundations', instructor: 'Michael Chen', price: '$99' },
                  { title: 'Web Development Basics', instructor: 'David Miller', price: '$79' },
                ].map((course, idx) => (
                  <Card key={idx} className="border border-lab-neutral-light overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-lab-bright-blue/10 to-lab-accent-purple/10 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lab-neutral-dark mb-1">{course.title}</h3>
                      <p className="text-sm text-lab-neutral-gray mb-3">{course.instructor}</p>
                      <p className="text-lg font-bold text-lab-neutral-dark mb-3">{course.price}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-lab-neutral-light text-lab-bright-blue bg-transparent">
                          Save
                        </Button>
                        <Button className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 border-lab-neutral-light bg-transparent">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
                >
                  {loading ? 'Completing...' : 'Complete setup'}
                </Button>
              </div>
            </div>
          )}

          {/* Complete Screen */}
          {step === 'complete' && (
            <div className="text-center">
              <div className="inline-block mb-6 animate-bounce">
                <div className="h-16 w-16 rounded-full bg-lab-success-green flex items-center justify-center">
                  <Check className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-lab-neutral-dark mb-3">
                You're all set!
              </h1>
              <p className="text-lg text-lab-neutral-gray mb-8">
                Welcome to LAB LAND. Ready to start learning?
              </p>
              <Button
                onClick={() => (window.location.href = '/dashboard')}
                className="bg-lab-bright-blue text-white hover:bg-lab-primary-blue gap-2 px-8"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
