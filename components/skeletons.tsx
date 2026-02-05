export function CourseCardSkeleton() {
  return (
    <div className="border border-lab-neutral-light rounded-lg overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-lab-neutral-light via-white to-lab-neutral-light animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-lab-neutral-light rounded animate-pulse" />
        <div className="h-4 bg-lab-neutral-light rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-lab-neutral-light rounded w-1/2 animate-pulse" />
      </div>
    </div>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-lab-neutral-light rounded-lg p-6">
          <div className="h-4 bg-lab-neutral-light rounded w-1/2 animate-pulse mb-4" />
          <div className="h-8 bg-lab-neutral-light rounded w-2/3 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function LessonContentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-lab-neutral-light rounded animate-pulse" />
      <div className="h-4 bg-lab-neutral-light rounded animate-pulse" />
      <div className="h-4 bg-lab-neutral-light rounded w-5/6 animate-pulse" />
      <div className="h-40 bg-lab-neutral-light rounded animate-pulse mt-6" />
      <div className="h-4 bg-lab-neutral-light rounded animate-pulse" />
      <div className="h-4 bg-lab-neutral-light rounded animate-pulse" />
    </div>
  )
}

export function AssignmentListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-lab-neutral-light rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-lab-neutral-light rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-lab-neutral-light rounded animate-pulse mb-2" />
              <div className="h-3 bg-lab-neutral-light rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
