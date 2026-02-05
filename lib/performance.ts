// Performance optimization utilities for LAB LAND
// Targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

interface WebVital {
  name: string
  value: number
  target: number
  status: 'good' | 'needs-improvement' | 'poor'
}

/**
 * Report Web Vitals metrics
 */
export function reportWebVitals(metric: any) {
  const vitals: WebVital = {
    name: metric.name,
    value: metric.value,
    target: getTarget(metric.name),
    status: getStatus(metric.name, metric.value),
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Web Vitals] ${vitals.name}: ${vitals.value.toFixed(2)}ms (target: ${vitals.target}ms) - ${vitals.status.toUpperCase()}`
    )
  }

  // Send to analytics
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      type: 'web_vital',
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    })

    // Use `navigator.sendBeacon()` if available, otherwise fallback to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body)
    } else {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, { body, method: 'POST', keepalive: true })
    }
  }
}

function getTarget(metricName: string): number {
  const targets: Record<string, number> = {
    'LCP': 2500,      // Largest Contentful Paint < 2.5s
    'FID': 100,       // First Input Delay < 100ms
    'CLS': 0.1,       // Cumulative Layout Shift < 0.1
    'FCP': 1800,      // First Contentful Paint < 1.8s
    'TTFB': 600,      // Time to First Byte < 600ms
  }
  return targets[metricName] || 0
}

function getStatus(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    'LCP': { good: 2500, needsImprovement: 4000 },
    'FID': { good: 100, needsImprovement: 300 },
    'CLS': { good: 0.1, needsImprovement: 0.25 },
    'FCP': { good: 1800, needsImprovement: 3000 },
    'TTFB': { good: 600, needsImprovement: 1800 },
  }

  const threshold = thresholds[metricName]
  if (!threshold) return 'needs-improvement'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

/**
 * Debounce function for optimizing event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function for rate-limiting event handlers
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load an image with intersection observer
 */
export function lazyLoadImage(imgElement: HTMLImageElement) {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    imgElement.src = imgElement.dataset.src || ''
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        observer.unobserve(img)
      }
    })
  })

  observer.observe(imgElement)
}

/**
 * Prefetch a resource
 */
export function prefetchResource(url: string, as: 'script' | 'style' | 'image' = 'script') {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = as
  link.href = url
  document.head.appendChild(link)
}

/**
 * Preconnect to an origin
 */
export function preconnect(origin: string) {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  document.head.appendChild(link)
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string) {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'dns-prefetch'
  link.href = `//${domain}`
  document.head.appendChild(link)
}

/**
 * Measure performance of a function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> {
  const startTime = performance.now()
  const result = await Promise.resolve(fn())
  const endTime = performance.now()
  const duration = Math.round(endTime - startTime)

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration}ms`)
  }

  return result
}

/**
 * Get memory usage (if available)
 */
export function getMemoryUsage() {
  if (typeof performance === 'undefined' || !(performance as any).memory) {
    return null
  }

  const memory = (performance as any).memory
  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
  }
}

/**
 * Log Core Web Vitals
 */
export function logCoreWebVitals() {
  if (typeof window === 'undefined') return

  // LCP (Largest Contentful Paint)
  const lcpEntries = performance.getEntriesByName('largest-contentful-paint')
  if (lcpEntries.length > 0) {
    const lcp = lcpEntries[lcpEntries.length - 1]
    console.log(`[Core Web Vitals] LCP: ${lcp.startTime.toFixed(2)}ms`)
  }

  // CLS (Cumulative Layout Shift)
  const clsEntries = performance.getEntriesByType('layout-shift')
  let cls = 0
  clsEntries.forEach((entry: any) => {
    if (!entry.hadRecentInput) {
      cls += entry.value
    }
  })
  console.log(`[Core Web Vitals] CLS: ${cls.toFixed(4)}`)

  // FCP (First Contentful Paint)
  const fcpEntries = performance.getEntriesByName('first-contentful-paint')
  if (fcpEntries.length > 0) {
    console.log(`[Core Web Vitals] FCP: ${fcpEntries[0].startTime.toFixed(2)}ms`)
  }

  // Memory usage
  const memory = getMemoryUsage()
  if (memory) {
    console.log(`[Memory] Used: ${memory.usedJSHeapSize}MB / ${memory.totalJSHeapSize}MB`)
  }
}
