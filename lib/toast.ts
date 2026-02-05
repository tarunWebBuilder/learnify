'use client';

import { useToast } from '@/hooks/use-toast'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastOptions {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

export const showToast = (type: ToastType, options: ToastOptions) => {
  const { toast } = useToast()

  const variants: Record<ToastType, any> = {
    success: {
      title: options.title || 'Success',
      description: options.description,
      action: options.action,
      duration: options.duration || 4000,
    },
    error: {
      title: options.title || 'Error',
      description: options.description,
      action: options.action || { label: 'Retry', onClick: () => {} },
      duration: options.duration || 5000,
      variant: 'destructive',
    },
    info: {
      title: options.title || 'Info',
      description: options.description,
      action: options.action,
      duration: options.duration || 4000,
    },
    warning: {
      title: options.title || 'Warning',
      description: options.description,
      action: options.action,
      duration: options.duration || 4000,
    },
  }

  toast(variants[type])
}

export const toastMessages = {
  success: {
    courseSaved: { title: 'Course saved', description: 'Added to your wishlist' },
    courseEnrolled: { title: 'Enrollment successful', description: 'You can now access all course materials' },
    assignmentSubmitted: { title: 'Submission successful', description: 'Your assignment has been submitted' },
    profileUpdated: { title: 'Profile updated', description: 'Your changes have been saved' },
  },
  error: {
    uploadFailed: { title: 'Upload failed', description: 'Please check the file and try again' },
    submissionFailed: { title: 'Submission failed', description: 'Please try again' },
    networkError: { title: 'Network error', description: 'Please check your connection' },
  },
  info: {
    newLesson: { title: 'New lesson available', description: 'A new lesson has been released in your course' },
    reminderDue: { title: 'Assignment due soon', description: 'You have an assignment due in 24 hours' },
  },
}
