'use client'

import { useState } from 'react'
import { Star, Users, Clock, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { mockCourses, categories } from '@/lib/mock-data'
import Link from 'next/link'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Courses')

  const filteredCourses =
    selectedCategory === 'All Courses'
      ? mockCourses
      : mockCourses.filter(c => c.category === selectedCategory)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-lab-neutral-dark">Discover Courses</h1>
              <p className="mt-3 text-base text-lab-neutral-gray">
                Explore our collection of world-class courses designed for your success
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-lab-bright-blue text-white shadow-md'
                      : 'bg-white text-lab-neutral-gray border border-lab-neutral-light hover:border-lab-bright-blue hover:text-lab-bright-blue'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map(course => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <Card className="group overflow-hidden border border-lab-neutral-light bg-white shadow-sm hover:shadow-md transition-all">
                    {/* Course Header */}
                    <div className={`h-40 ${course.color} p-6 relative overflow-hidden`}>
                      <div className="flex items-start justify-between relative z-10">
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${course.badge} mb-2`}>
                            {course.category}
                          </span>
                          <h3 className="mt-2 text-lg font-semibold text-lab-neutral-dark">{course.title}</h3>
                        </div>
                        <span className="text-2xl">{course.icon}</span>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-4 bg-white p-6">
                      <p className="text-sm text-lab-neutral-gray line-clamp-2">{course.description}</p>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              {(course.students / 1000).toFixed(1)}k students
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-slate-600">{course.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{course.level}</span>
                          </div>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-xs text-slate-500">Instructor</p>
                        <p className="mt-1 font-semibold text-slate-900">{course.instructor}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-slate-900">
                            ${(course.price / 100).toFixed(0)}
                          </span>
                        </div>

                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
