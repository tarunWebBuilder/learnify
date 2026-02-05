// Analytics tracking system for LAB LAND
// Supports Google Analytics 4 and custom event tracking

export type EventCategory = 
  | 'engagement'
  | 'conversion'
  | 'user_behavior'
  | 'performance'

export interface AnalyticsEvent {
  name: string
  category: EventCategory
  parameters: Record<string, string | number | boolean>
}

export interface UserProperties {
  userId?: string
  userType?: 'student' | 'instructor' | 'admin'
  registrationDate?: string
  lastActiveDate?: string
  lifetimeValue?: number
  learningGoals?: string[]
  preferredLanguage?: string
}

export interface SessionProperties {
  sessionId?: string
  sessionSource?: 'organic' | 'paid' | 'referral' | 'direct'
  deviceType?: 'mobile' | 'tablet' | 'desktop'
  browser?: string
  operatingSystem?: string
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private userProps: UserProperties = {}
  private sessionProps: SessionProperties = {}

  /**
   * Initialize analytics with user and session properties
   */
  init(userProps: UserProperties, sessionProps: SessionProperties) {
    this.userProps = userProps
    this.sessionProps = sessionProps
    console.log('[Analytics] Initialized with user and session properties')
  }

  /**
   * Track an engagement event
   */
  trackEngagement(eventName: string, parameters?: Record<string, string | number | boolean>) {
    const event: AnalyticsEvent = {
      name: eventName,
      category: 'engagement',
      parameters: parameters || {},
    }
    this.trackEvent(event)
  }

  /**
   * Track user engagement with learning content
   */
  trackLessonStarted(lessonId: string, courseId: string, duration?: number) {
    this.trackEngagement('lesson_started', {
      lesson_id: lessonId,
      course_id: courseId,
      ...(duration && { duration }),
    })
  }

  trackLessonCompleted(lessonId: string, courseId: string, timeSpent: number) {
    this.trackEngagement('lesson_completed', {
      lesson_id: lessonId,
      course_id: courseId,
      time_spent: timeSpent,
    })
  }

  trackAssignmentSubmitted(assignmentId: string, courseId: string, score?: number) {
    this.trackEngagement('assignment_submitted', {
      assignment_id: assignmentId,
      course_id: courseId,
      ...(score && { score }),
    })
  }

  trackCourseEnrolled(courseId: string, price?: number, referrer?: string) {
    this.trackConversion('course_enrolled', {
      course_id: courseId,
      ...(price && { price }),
      ...(referrer && { referrer }),
    })
  }

  trackCourseCompleted(courseId: string, daysToComplete: number) {
    this.trackEngagement('course_completed', {
      course_id: courseId,
      days_to_complete: daysToComplete,
    })
  }

  trackVideoPlayed(videoId: string, lessonId: string, duration: number) {
    this.trackEngagement('video_played', {
      video_id: videoId,
      lesson_id: lessonId,
      duration,
    })
  }

  trackQuizAnswered(quizId: string, correct: boolean, timeTaken: number) {
    this.trackEngagement('quiz_answered', {
      quiz_id: quizId,
      correct,
      time_taken: timeTaken,
    })
  }

  trackForumPostCreated(courseId: string, postType: string) {
    this.trackEngagement('forum_post_created', {
      course_id: courseId,
      post_type: postType,
    })
  }

  trackFileDownloaded(fileType: string, courseId: string) {
    this.trackEngagement('file_downloaded', {
      file_type: fileType,
      course_id: courseId,
    })
  }

  /**
   * Track conversion events
   */
  trackConversion(eventName: string, parameters?: Record<string, string | number | boolean>) {
    const event: AnalyticsEvent = {
      name: eventName,
      category: 'conversion',
      parameters: parameters || {},
    }
    this.trackEvent(event)
  }

  trackSignUpStarted(source: string, experiment?: string) {
    this.trackConversion('sign_up_started', {
      source,
      ...(experiment && { experiment }),
    })
  }

  trackSignUpCompleted(source: string, signupTime: number) {
    this.trackConversion('sign_up_completed', {
      source,
      signup_time: signupTime,
    })
  }

  trackPaymentInitiated(courseId: string, amount: number) {
    this.trackConversion('payment_initiated', {
      course_id: courseId,
      amount,
    })
  }

  trackPaymentCompleted(courseId: string, amount: number, paymentMethod: string) {
    this.trackConversion('payment_completed', {
      course_id: courseId,
      amount,
      payment_method: paymentMethod,
    })
  }

  trackPurchaseError(courseId: string, errorCode: string) {
    this.trackConversion('purchase_error', {
      course_id: courseId,
      error_code: errorCode,
    })
  }

  /**
   * Track user behavior events
   */
  trackBehavior(eventName: string, parameters?: Record<string, string | number | boolean>) {
    const event: AnalyticsEvent = {
      name: eventName,
      category: 'user_behavior',
      parameters: parameters || {},
    }
    this.trackEvent(event)
  }

  trackSearchPerformed(query: string, resultsCount: number) {
    this.trackBehavior('search_performed', {
      query,
      results_count: resultsCount,
    })
  }

  trackFilterApplied(filterType: string, filterValue: string) {
    this.trackBehavior('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
    })
  }

  trackHelpRequested(helpType: string, page: string) {
    this.trackBehavior('help_requested', {
      help_type: helpType,
      page,
    })
  }

  trackFeedbackSubmitted(feedbackType: string, rating: number) {
    this.trackBehavior('feedback_submitted', {
      feedback_type: feedbackType,
      rating,
    })
  }

  trackFeatureClicked(featureName: string, location: string) {
    this.trackBehavior('feature_clicked', {
      feature_name: featureName,
      location,
    })
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metricName: string, durationMs: number) {
    const event: AnalyticsEvent = {
      name: metricName,
      category: 'performance',
      parameters: {
        duration_ms: durationMs,
      },
    }
    this.trackEvent(event)
  }

  trackApiResponseTime(durationMs: number, endpoint?: string) {
    this.trackPerformance('api_response_time', durationMs)
  }

  trackVideoLoadTime(durationMs: number, videoId?: string) {
    this.trackPerformance('video_load_time', durationMs)
  }

  trackPageLoadTime(durationMs: number, page?: string) {
    this.trackPerformance('page_load_time', durationMs)
  }

  trackFormSubmitDuration(durationMs: number, formName?: string) {
    this.trackPerformance('form_submit_duration', durationMs)
  }

  /**
   * Core event tracking
   */
  private trackEvent(event: AnalyticsEvent) {
    this.events.push(event)
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[Analytics] Event: ${event.name} (${event.category})`,
        event.parameters
      )
    }

    // Send to analytics service
    this.sendToAnalytics(event)
  }

  /**
   * Send event to analytics service (GA4, Segment, etc.)
   */
  private sendToAnalytics(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return

    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, {
        event_category: event.category,
        ...event.parameters,
        user_id: this.userProps.userId,
        user_type: this.userProps.userType,
      })
    }

    // Custom analytics endpoint (optional)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event.name,
          category: event.category,
          parameters: event.parameters,
          userProperties: this.userProps,
          sessionProperties: this.sessionProps,
          timestamp: new Date().toISOString(),
        }),
      }).catch((error) => {
        console.error('[Analytics] Failed to send event:', error)
      })
    }
  }

  /**
   * Get all tracked events (for debugging)
   */
  getEvents() {
    return this.events
  }

  /**
   * Clear events (for testing)
   */
  clearEvents() {
    this.events = []
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Global gtag type declaration
declare let gtag: Function
