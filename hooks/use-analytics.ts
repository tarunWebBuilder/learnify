'use client'

import { useEffect, useCallback } from 'react'
import { analytics } from '@/lib/analytics'

export function useAnalytics() {
  // Track page view
  useEffect(() => {
    const pageName = window.location.pathname
    analytics.trackBehavior('page_view', {
      page_name: pageName,
      url: window.location.href,
    })
  }, [])

  // Track time spent on page
  useEffect(() => {
    const startTime = Date.now()

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      analytics.trackPerformance('page_time_spent', timeSpent * 1000)
    }
  }, [])

  // Event tracking methods
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, string | number | boolean>) => {
    analytics.trackBehavior(eventName, parameters)
  }, [])

  const trackEngagement = useCallback((eventName: string, parameters?: Record<string, string | number | boolean>) => {
    analytics.trackEngagement(eventName, parameters)
  }, [])

  const trackConversion = useCallback((eventName: string, parameters?: Record<string, string | number | boolean>) => {
    analytics.trackConversion(eventName, parameters)
  }, [])

  const trackPerformance = useCallback((metricName: string, durationMs: number) => {
    analytics.trackPerformance(metricName, durationMs)
  }, [])

  return {
    trackEvent,
    trackEngagement,
    trackConversion,
    trackPerformance,
    analytics,
  }
}

/**
 * Hook to measure and track component render time
 */
export function usePerformanceTracking(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      analytics.trackPerformance(`component_render_${componentName}`, duration)
    }
  }, [componentName])
}

/**
 * Hook to measure and track API call duration
 */
export function useApiTiming() {
  const trackApiCall = useCallback(async <T,>(
    apiCall: () => Promise<T>,
    apiName: string
  ): Promise<T> => {
    const startTime = performance.now()
    try {
      const result = await apiCall()
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      analytics.trackApiResponseTime(duration, apiName)
      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      analytics.trackApiResponseTime(duration, apiName)
      throw error
    }
  }, [])

  return { trackApiCall }
}
