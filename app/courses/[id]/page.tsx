'use client'

import { useState } from 'react'
import { ArrowLeft, Star, Users, Clock, Award, BookOpen, CheckCircle2, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { mockCourses, mockLessons } from '@/lib/mock-data'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find(c => c.id === courseId)
  const [selectedTab, setSelectedTab] = useState<'lessons' | 'overview'>('overview')

  if (!course) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="ml-64 flex flex-1 flex-col">
          <Header />
          <div className="flex items-center justify-center p-8">
            <p className="text-slate-600">Course not found</p>
          </div>
        </div>
      </div>
    )
  }

  const courseLessons = mockLessons.filter(l => l.course === course.title)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Back Button */}
            <Link href="/courses">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Button>
            </Link>

            {/* Course Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className={`h-80 rounded-xl bg-gradient-to-br ${course.color} p-8 text-white`}>
                  <p className="text-sm font-medium opacity-90">{course.category}</p>
                  <h1 className="mt-4 text-4xl font-bold">{course.title}</h1>
                  <p className="mt-4 text-lg opacity-90">{course.description}</p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                      <span className="font-semibold">{course.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold">
                        {(course.students / 1000).toFixed(1)}k students
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-slate-200">
                  <div className="flex gap-8">
                    <button
                      onClick={() => setSelectedTab('overview')}
                      className={`border-b-2 px-1 py-4 font-medium transition-colors ${
                        selectedTab === 'overview'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setSelectedTab('lessons')}
                      className={`border-b-2 px-1 py-4 font-medium transition-colors ${
                        selectedTab === 'lessons'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Lessons ({courseLessons.length})
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8 space-y-6">
                  {selectedTab === 'overview' && (
                    <>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">What you'll learn</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {[
                            'Master core design principles',
                            'Create beautiful user interfaces',
                            'Design for mobile and web',
                            'User research and testing',
                            'Design systems and components',
                            'Prototype and handoff to developers',
                          ].map(item => (
                            <div key={item} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                              <span className="text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Course Details</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                          <Card className="border-0 bg-white p-4 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                              <BookOpen className="h-8 w-8 text-blue-600" />
                              <p className="mt-2 text-sm font-medium text-slate-600">Lessons</p>
                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {course.lessons}
                              </p>
                            </div>
                          </Card>

                          <Card className="border-0 bg-white p-4 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                              <Clock className="h-8 w-8 text-orange-600" />
                              <p className="mt-2 text-sm font-medium text-slate-600">Duration</p>
                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {course.duration}
                              </p>
                            </div>
                          </Card>

                          <Card className="border-0 bg-white p-4 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                              <Award className="h-8 w-8 text-purple-600" />
                              <p className="mt-2 text-sm font-medium text-slate-600">Level</p>
                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {course.level}
                              </p>
                            </div>
                          </Card>

                          <Card className="border-0 bg-white p-4 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                              <Users className="h-8 w-8 text-green-600" />
                              <p className="mt-2 text-sm font-medium text-slate-600">Students</p>
                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {(course.students / 1000).toFixed(1)}K
                              </p>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">About the Instructor</h2>
                        <Card className="mt-4 border-0 bg-white p-6 shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                            <div>
                              <p className="font-semibold text-slate-900">{course.instructor}</p>
                              <p className="text-sm text-slate-600">
                                Expert instructor with 10+ years of experience
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </>
                  )}

                  {selectedTab === 'lessons' && (
                    <div className="space-y-3">
                      {courseLessons.length > 0 ? (
                        courseLessons.map((lesson, idx) => (
                          <Card key={lesson.id} className="border-0 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                {lesson.completed ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <span className="text-sm font-semibold text-blue-600">
                                    {idx + 1}
                                  </span>
                                )}
                              </div>

                              <div className="flex-1">
                                <p className="font-semibold text-slate-900">{lesson.title}</p>
                                <p className="text-sm text-slate-500">{lesson.duration} min</p>
                              </div>

                              <Button variant="ghost" size="sm" className="gap-2">
                                <PlayCircle className="h-4 w-4" />
                                {lesson.completed ? 'Review' : 'Start'}
                              </Button>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-slate-600">No lessons available</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="border-0 bg-white p-6 shadow-sm sticky top-24">
                  <div className="space-y-6">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">
                        ${(course.price / 100).toFixed(0)}
                      </p>
                    </div>

                    {course.progress > 0 ? (
                      <div>
                        <p className="text-sm text-slate-600">Your Progress</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                          {course.progress}%
                        </p>
                        <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                          Continue Learning
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Enroll Now
                      </Button>
                    )}

                    <div className="space-y-3 border-t border-slate-200 pt-6">
                      <div className="flex gap-2">
                        <Award className="h-5 w-5 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-slate-700">Certificate of completion</span>
                      </div>
                      <div className="flex gap-2">
                        <Clock className="h-5 w-5 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-slate-700">Learn at your own pace</span>
                      </div>
                      <div className="flex gap-2">
                        <BookOpen className="h-5 w-5 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-slate-700">Lifetime access</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
