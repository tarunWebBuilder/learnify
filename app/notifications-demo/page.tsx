'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/spinner'
import { CourseCardSkeleton, DashboardStatsSkeleton, LessonContentSkeleton } from '@/components/skeletons'
import { Check, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'

export default function NotificationsDemoPage() {
  const [loadingState, setLoadingState] = useState<'idle' | 'loading'>('idle')

  const handleSimulateLoad = () => {
    setLoadingState('loading')
    setTimeout(() => setLoadingState('idle'), 2000)
  }

  return (
    <div className="min-h-screen bg-lab-neutral-light py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-lab-neutral-dark mb-2">Notifications & Loading States</h1>
          <p className="text-lab-neutral-gray">
            Comprehensive feedback patterns including toast notifications, spinners, and skeleton screens
          </p>
        </div>

        {/* Toast Notifications Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Toast Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Success Toast */}
            <Card className="border border-lab-neutral-light p-4 bg-emerald-50">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-lab-success-green flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lab-neutral-dark">Course saved</p>
                  <p className="text-sm text-lab-neutral-gray">Added to your wishlist</p>
                </div>
                <button className="text-lab-neutral-gray hover:text-lab-neutral-dark">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-lab-neutral-gray mt-3">Auto-dismisses in 4 seconds</p>
            </Card>

            {/* Error Toast */}
            <Card className="border border-lab-neutral-light p-4 bg-red-50">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-lab-error-red flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lab-neutral-dark">Upload failed</p>
                  <p className="text-sm text-lab-neutral-gray">Please check the file and try again</p>
                </div>
                <Button variant="ghost" size="sm" className="text-lab-error-red hover:bg-red-100">
                  Retry
                </Button>
              </div>
              <p className="text-xs text-lab-neutral-gray mt-3">Auto-dismisses in 5 seconds</p>
            </Card>

            {/* Info Toast */}
            <Card className="border border-lab-neutral-light p-4 bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-lab-bright-blue flex items-center justify-center flex-shrink-0">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lab-neutral-dark">New lesson available</p>
                  <p className="text-sm text-lab-neutral-gray">A new lesson has been released in your course</p>
                </div>
                <Button variant="ghost" size="sm" className="text-lab-bright-blue">
                  View
                </Button>
              </div>
              <p className="text-xs text-lab-neutral-gray mt-3">Auto-dismisses in 4 seconds</p>
            </Card>

            {/* Warning Toast */}
            <Card className="border border-lab-neutral-light p-4 bg-amber-50">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-lab-warning-amber flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lab-neutral-dark">Assignment due soon</p>
                  <p className="text-sm text-lab-neutral-gray">You have an assignment due in 24 hours</p>
                </div>
                <button className="text-lab-neutral-gray hover:text-lab-neutral-dark">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-lab-neutral-gray mt-3">Auto-dismisses in 4 seconds</p>
            </Card>
          </div>
        </section>

        {/* Loading States Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Loading States</h2>

          {/* Spinner Demo */}
          <Card className="border border-lab-neutral-light p-8">
            <h3 className="font-semibold text-lab-neutral-dark mb-6">Spinners</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <Spinner size="sm" />
                <p className="text-sm text-lab-neutral-gray">Small (inline)</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Spinner size="md" />
                <p className="text-sm text-lab-neutral-gray">Medium (default)</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-sm text-lab-neutral-gray">Large (prominent)</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-lab-neutral-light">
              <p className="text-sm text-lab-neutral-gray mb-4">With message:</p>
              <Spinner size="md" message="Loading your courses..." />
            </div>
          </Card>
        </section>

        {/* Skeleton Screens Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Skeleton Screens</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lab-neutral-dark mb-4">Course Cards Skeleton</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lab-neutral-dark mb-4">Dashboard Stats Skeleton</h3>
              <DashboardStatsSkeleton />
            </div>

            <div>
              <h3 className="font-semibold text-lab-neutral-dark mb-4">Lesson Content Skeleton</h3>
              <Card className="border border-lab-neutral-light p-6">
                <LessonContentSkeleton />
              </Card>
            </div>
          </div>
        </section>

        {/* Button Loading States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Button Loading States</h2>

          <Card className="border border-lab-neutral-light p-8">
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                onClick={handleSimulateLoad}
                disabled={loadingState === 'loading'}
                className="bg-lab-bright-blue text-white hover:bg-lab-primary-blue gap-2"
              >
                {loadingState === 'loading' && <span className="inline-block">⟳</span>}
                {loadingState === 'loading' ? 'Loading...' : 'Submit Assignment'}
              </Button>

              <Button
                onClick={handleSimulateLoad}
                disabled={loadingState === 'loading'}
                className="bg-lab-success-green text-white hover:bg-emerald-700 gap-2"
              >
                {loadingState === 'loading' && <span className="inline-block">⟳</span>}
                {loadingState === 'loading' ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                onClick={handleSimulateLoad}
                disabled={loadingState === 'loading'}
                variant="outline"
                className="border-lab-neutral-light gap-2 bg-transparent"
              >
                {loadingState === 'loading' && <span className="inline-block">⟳</span>}
                {loadingState === 'loading' ? 'Processing...' : 'Download Receipt'}
              </Button>
            </div>

            <p className="text-xs text-lab-neutral-gray mt-4">
              {loadingState === 'loading' 
                ? 'Buttons are disabled and show spinner for 2 seconds'
                : 'Click a button to see loading state'}
            </p>
          </Card>
        </section>

        {/* UX Guidelines */}
        <Card className="border border-lab-neutral-light p-8 bg-blue-50">
          <h3 className="font-semibold text-lab-neutral-dark mb-4">UX Guidelines</h3>
          <ul className="space-y-3 text-sm text-lab-neutral-dark">
            <li className="flex gap-3">
              <span className="font-bold text-lab-bright-blue">✓</span>
              <span><strong>Toast Duration:</strong> Success (4s), Error (5s), Info (4s), Warning (4s)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-lab-bright-blue">✓</span>
              <span><strong>Spinner Feedback:</strong> Rotate 2s per full rotation, always show message</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-lab-bright-blue">✓</span>
              <span><strong>Skeleton Screens:</strong> Shimmer animation (1s repeat) mimics content shape</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-lab-bright-blue">✓</span>
              <span><strong>Button States:</strong> Disable on click, show spinner, update text to action in progress</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-lab-bright-blue">✓</span>
              <span><strong>Position:</strong> Toast notifications bottom-right, spinners centered or inline</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
