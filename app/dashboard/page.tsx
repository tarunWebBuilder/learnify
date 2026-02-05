'use client'

import { Clock, Award, BookOpen, ArrowRight, CheckCircle2, Clock2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { mockUser, mockCourses, mockAssignments } from '@/lib/mock-data'
import Link from 'next/link'

export default function DashboardPage() {
  const enrolledCourses = mockCourses.filter(c => c.progress > 0)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border border-lab-neutral-light bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-lab-neutral-gray">Hours Spent</p>
                    <p className="mt-2 text-3xl font-bold text-lab-neutral-dark">
                      {(mockUser.hoursSpent / 1000).toFixed(1)}K
                    </p>
                    <p className="mt-2 text-xs font-medium text-lab-success-green">+105.23%</p>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Clock className="h-6 w-6 text-lab-bright-blue" />
                  </div>
                </div>
              </Card>

              <Card className="border border-lab-neutral-light bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-lab-neutral-gray">Average Result</p>
                    <p className="mt-2 text-3xl font-bold text-lab-neutral-dark">
                      {mockUser.averageScore}/200
                    </p>
                    <p className="mt-2 text-xs font-medium text-lab-success-green">+105.23%</p>
                  </div>
                  <div className="rounded-lg bg-emerald-100 p-3">
                    <Award className="h-6 w-6 text-lab-success-green" />
                  </div>
                </div>
              </Card>

              <Card className="border border-lab-neutral-light bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-lab-neutral-gray">Courses Completed</p>
                    <p className="mt-2 text-3xl font-bold text-lab-neutral-dark">
                      {mockUser.coursesCompleted}
                    </p>
                    <p className="mt-2 text-xs font-medium text-lab-success-green">+105.23%</p>
                  </div>
                  <div className="rounded-lg bg-purple-100 p-3">
                    <BookOpen className="h-6 w-6 text-lab-accent-purple" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Enrolled Courses */}
              <div className="lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-lab-neutral-dark">My Learning</h2>
                  <Link href="/courses">
                    <Button variant="ghost" className="gap-2 text-lab-bright-blue hover:bg-lab-neutral-light">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {enrolledCourses.map(course => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <Card className="group relative overflow-hidden border border-lab-neutral-light bg-white shadow-sm hover:shadow-md transition-all">
                        <div className={`h-40 ${course.color} p-6 relative overflow-hidden`}>
                          <div className="flex items-start justify-between relative z-10">
                            <div>
                              <p className="text-sm font-medium text-lab-neutral-gray">{course.category}</p>
                              <h3 className="mt-3 text-lg font-semibold text-lab-neutral-dark">{course.title}</h3>
                            </div>
                            <span className="text-2xl">{course.icon}</span>
                          </div>
                        </div>

                        <div className="space-y-4 p-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-lab-neutral-gray">Progress</span>
                              <span className="text-sm font-semibold text-lab-neutral-dark">
                                {course.progress}%
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-lab-neutral-light">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-lab-bright-blue to-lab-primary-blue transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-xs text-lab-neutral-gray">
                            {course.completed} of {course.lessons} lessons completed
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Upcoming Assignments */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-lab-neutral-dark">My Assignments</h2>

                <div className="space-y-3">
                  {mockAssignments.map(assignment => (
                    <Card
                      key={assignment.id}
                      className="border border-lab-neutral-light bg-white p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {assignment.status === 'Completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-lab-success-green" />
                          ) : (
                            <Clock2 className="h-5 w-5 text-lab-warning-amber" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-lab-neutral-dark text-sm">
                            {assignment.title}
                          </p>
                          <p className="text-xs text-lab-neutral-gray mt-1">{assignment.course}</p>

                          {assignment.status === 'Completed' && assignment.score && (
                            <p className="mt-2 text-xs font-semibold text-lab-success-green">
                              {assignment.score}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-lab-neutral-gray">
                            {assignment.status === 'Completed'
                              ? `Completed ${assignment.completedDate}`
                              : `Due ${assignment.dueDate}`}
                          </p>
                        </div>

                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                            assignment.status === 'Completed'
                              ? 'bg-emerald-100 text-lab-success-green'
                              : 'bg-amber-100 text-lab-warning-amber'
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    </Card>
                  ))}

                  <Link href="/assignments">
                    <Button className="w-full gap-2 bg-lab-bright-blue text-white hover:bg-lab-primary-blue">
                      <ArrowRight className="h-4 w-4" />
                      View All Assignments
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
