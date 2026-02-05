'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { logCoreWebVitals, getMemoryUsage } from '@/lib/performance'
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'

export default function PerformanceGuidePage() {
  const [coreVitals, setCoreVitals] = useState<Record<string, any>>({})
  const [memory, setMemory] = useState<any>(null)

  useEffect(() => {
    // Log Core Web Vitals
    logCoreWebVitals()

    // Update memory usage every 5 seconds
    const interval = setInterval(() => {
      const currentMemory = getMemoryUsage()
      if (currentMemory) {
        setMemory(currentMemory)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleMeasurePerformance = () => {
    logCoreWebVitals()
  }

  return (
    <div className="min-h-screen bg-lab-neutral-light py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-lab-neutral-dark mb-2">Performance Optimization Guide</h1>
          <p className="text-lab-neutral-gray">
            LAB LAND targets Core Web Vitals metrics for optimal user experience
          </p>
        </div>

        {/* Core Web Vitals Targets */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Core Web Vitals Targets</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LCP */}
            <Card className="border border-lab-neutral-light p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-lab-success-green/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-lab-success-green" />
                </div>
                <div>
                  <h3 className="font-bold text-lab-neutral-dark">LCP</h3>
                  <p className="text-xs text-lab-neutral-gray">Largest Contentful Paint</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-lab-neutral-dark">Target: &lt; 2.5s</p>
                  <p className="text-xs text-lab-neutral-gray">Time until largest content element appears</p>
                </div>

                <div className="pt-3 border-t border-lab-neutral-light space-y-2">
                  <p className="text-xs font-semibold text-lab-neutral-dark">Optimization tips:</p>
                  <ul className="text-xs text-lab-neutral-gray space-y-1">
                    <li>• Optimize images (WebP, lazy loading)</li>
                    <li>• Reduce CSS/JS bundle size</li>
                    <li>• Enable caching</li>
                    <li>• Use CDN for static assets</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* FID */}
            <Card className="border border-lab-neutral-light p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-lab-bright-blue/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-lab-bright-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lab-neutral-dark">FID</h3>
                  <p className="text-xs text-lab-neutral-gray">First Input Delay</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-lab-neutral-dark">Target: &lt; 100ms</p>
                  <p className="text-xs text-lab-neutral-gray">Time until page responds to user input</p>
                </div>

                <div className="pt-3 border-t border-lab-neutral-light space-y-2">
                  <p className="text-xs font-semibold text-lab-neutral-dark">Optimization tips:</p>
                  <ul className="text-xs text-lab-neutral-gray space-y-1">
                    <li>• Use web workers for heavy tasks</li>
                    <li>• Break up long JavaScript tasks</li>
                    <li>• Defer non-critical JS</li>
                    <li>• Optimize event listeners</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* CLS */}
            <Card className="border border-lab-neutral-light p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-lab-warning-amber/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-lab-warning-amber" />
                </div>
                <div>
                  <h3 className="font-bold text-lab-neutral-dark">CLS</h3>
                  <p className="text-xs text-lab-neutral-gray">Cumulative Layout Shift</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-lab-neutral-dark">Target: &lt; 0.1</p>
                  <p className="text-xs text-lab-neutral-gray">Unexpected layout shift of content</p>
                </div>

                <div className="pt-3 border-t border-lab-neutral-light space-y-2">
                  <p className="text-xs font-semibold text-lab-neutral-dark">Optimization tips:</p>
                  <ul className="text-xs text-lab-neutral-gray space-y-1">
                    <li>• Set fixed dimensions for media</li>
                    <li>• Reserve space for ads/embeds</li>
                    <li>• Avoid inserting content above existing</li>
                    <li>• Use transform animations</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Additional Metrics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Additional Performance Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-bold text-lab-neutral-dark mb-3">FCP (First Contentful Paint)</h3>
              <p className="text-sm text-lab-neutral-gray mb-4">
                Time when first content element appears on screen
              </p>
              <p className="text-sm font-semibold text-lab-neutral-dark mb-2">Target: &lt; 1.8s</p>
              <p className="text-xs text-lab-neutral-gray">Impacts perceived performance and user satisfaction</p>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-bold text-lab-neutral-dark mb-3">TTFB (Time to First Byte)</h3>
              <p className="text-sm text-lab-neutral-gray mb-4">
                Time from request initiation to first byte received
              </p>
              <p className="text-sm font-semibold text-lab-neutral-dark mb-2">Target: &lt; 600ms</p>
              <p className="text-xs text-lab-neutral-gray">Depends on server response time and network latency</p>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-bold text-lab-neutral-dark mb-3">TTI (Time to Interactive)</h3>
              <p className="text-sm text-lab-neutral-gray mb-4">
                Time when page is fully interactive and responsive
              </p>
              <p className="text-sm font-semibold text-lab-neutral-dark mb-2">Target: &lt; 3.8s</p>
              <p className="text-xs text-lab-neutral-gray">Critical for user engagement and conversion</p>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-bold text-lab-neutral-dark mb-3">Speed Index</h3>
              <p className="text-sm text-lab-neutral-gray mb-4">
                Average time at which visible parts of page display
              </p>
              <p className="text-sm font-semibold text-lab-neutral-dark mb-2">Target: &lt; 3.4s</p>
              <p className="text-xs text-lab-neutral-gray">Measures overall visual completeness of page</p>
            </Card>
          </div>
        </section>

        {/* Optimization Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-lab-neutral-dark">Optimization Strategies</h2>

          <div className="space-y-4">
            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Image Optimization</h3>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✓ Use modern formats (WebP with fallbacks)</li>
                <li>✓ Implement lazy loading with Intersection Observer</li>
                <li>✓ Serve responsive images (srcset)</li>
                <li>✓ Compress images with tools like TinyPNG</li>
                <li>✓ Use CDN for image delivery</li>
              </ul>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Code Splitting & Bundling</h3>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✓ Route-based code splitting with Next.js</li>
                <li>✓ Dynamic imports for heavy components</li>
                <li>✓ Remove unused CSS/JS</li>
                <li>✓ Minify and compress assets</li>
                <li>✓ Use treeshaking to eliminate dead code</li>
              </ul>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Caching Strategies</h3>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✓ Browser caching with proper headers</li>
                <li>✓ Service Worker for offline support</li>
                <li>✓ Edge caching with CDN</li>
                <li>✓ Database query caching with Redis</li>
                <li>✓ HTTP/2 Server Push for critical resources</li>
              </ul>
            </Card>

            <Card className="border border-lab-neutral-light p-6">
              <h3 className="font-semibold text-lab-neutral-dark mb-3">Runtime Optimization</h3>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✓ Debounce and throttle event handlers</li>
                <li>✓ Virtualize long lists</li>
                <li>✓ Use requestAnimationFrame for animations</li>
                <li>✓ Optimize React renders with memo/useMemo</li>
                <li>✓ Use Web Workers for expensive computations</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Performance Monitoring */}
        <Card className="border border-lab-neutral-light p-8 bg-blue-50">
          <h3 className="font-bold text-lab-neutral-dark mb-4">Real-time Performance Monitoring</h3>
          
          <div className="mb-6">
            <Button
              onClick={handleMeasurePerformance}
              className="bg-lab-bright-blue text-white hover:bg-lab-primary-blue"
            >
              Measure Performance Now
            </Button>
          </div>

          {memory && (
            <div className="bg-white p-4 rounded-lg border border-lab-neutral-light">
              <p className="font-semibold text-lab-neutral-dark mb-2">Memory Usage (Chrome DevTools)</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-lab-neutral-gray">Used Heap</p>
                  <p className="font-bold text-lab-neutral-dark">{memory.usedJSHeapSize} MB</p>
                </div>
                <div>
                  <p className="text-lab-neutral-gray">Total Heap</p>
                  <p className="font-bold text-lab-neutral-dark">{memory.totalJSHeapSize} MB</p>
                </div>
                <div>
                  <p className="text-lab-neutral-gray">Heap Limit</p>
                  <p className="font-bold text-lab-neutral-dark">{memory.jsHeapSizeLimit} MB</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-lab-neutral-gray mt-4">
            Open the browser DevTools (F12) → Performance tab to see detailed metrics. Check the Console tab for logged metrics.
          </p>
        </Card>

        {/* Best Practices */}
        <Card className="border border-lab-neutral-light p-8">
          <h3 className="font-bold text-lab-neutral-dark mb-4">Performance Best Practices</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-lab-neutral-dark mb-3">Do's</p>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✓ Test on real devices and slow networks</li>
                <li>✓ Monitor production performance continuously</li>
                <li>✓ Set performance budgets</li>
                <li>✓ Prioritize user experience</li>
                <li>✓ Use Web Vitals tools regularly</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-lab-neutral-dark mb-3">Don'ts</p>
              <ul className="space-y-2 text-sm text-lab-neutral-gray">
                <li>✗ Load unnecessary JavaScript</li>
                <li>✗ Ignore images optimization</li>
                <li>✗ Perform heavy operations on main thread</li>
                <li>✗ Block rendering with render-blocking resources</li>
                <li>✗ Skip performance monitoring in production</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
