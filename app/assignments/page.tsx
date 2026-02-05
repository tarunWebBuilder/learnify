'use client'

import { useState } from 'react'
import { CheckCircle2, Clock2, FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { mockAssignments } from '@/lib/mock-data'

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all')

  const filteredAssignments = mockAssignments.filter(a => {
    if (filter === 'completed') return a.status === 'Completed'
    if (filter === 'upcoming') return a.status === 'Upcoming'
    return true
  })

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Assignments</h1>
              <p className="mt-2 text-slate-600">
                Track and manage all your course assignments in one place
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-white">
                <TabsTrigger value="all">All ({mockAssignments.length})</TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({mockAssignments.filter(a => a.status === 'Completed').length})
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  Upcoming ({mockAssignments.filter(a => a.status === 'Upcoming').length})
                </TabsTrigger>
              </TabsList>

              {['all', 'completed', 'upcoming'].map(tab => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  {filteredAssignments.map(assignment => (
                    <Card key={assignment.id} className="border-0 bg-white p-6 shadow-sm">
                      <div className="flex items-start gap-6">
                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                          {assignment.status === 'Completed' ? (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                              <Clock2 className="h-6 w-6 text-orange-600" />
                            </div>
                          )}
                        </div>

                        {/* Assignment Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-slate-400" />
                            <h3 className="text-lg font-semibold text-slate-900">
                              {assignment.title}
                            </h3>
                          </div>

                          <p className="mt-2 text-sm text-slate-600">{assignment.course}</p>

                          <div className="mt-4 flex flex-wrap gap-6">
                            <div>
                              <p className="text-xs text-slate-500">
                                {assignment.status === 'Completed' ? 'Completed' : 'Due'}
                              </p>
                              <p className="mt-1 flex items-center gap-2 font-medium text-slate-900">
                                <Calendar className="h-4 w-4" />
                                {assignment.status === 'Completed'
                                  ? assignment.completedDate
                                  : assignment.dueDate}
                              </p>
                            </div>

                            {assignment.status === 'Completed' && assignment.score && (
                              <div>
                                <p className="text-xs text-slate-500">Score</p>
                                <p className="mt-1 text-lg font-bold text-green-600">
                                  {assignment.score}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-shrink-0 flex-col gap-2">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${
                              assignment.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {assignment.status}
                          </span>

                          <Button
                            variant={assignment.status === 'Completed' ? 'outline' : 'default'}
                            className={
                              assignment.status === 'Completed'
                                ? ''
                                : 'bg-blue-600 hover:bg-blue-700'
                            }
                          >
                            {assignment.status === 'Completed' ? 'View Details' : 'Start Now'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {filteredAssignments.length === 0 && (
                    <Card className="border-0 bg-white p-12 shadow-sm">
                      <div className="text-center">
                        <FileText className="mx-auto h-12 w-12 text-slate-300" />
                        <p className="mt-4 text-slate-600">
                          {tab === 'completed'
                            ? 'No completed assignments yet'
                            : tab === 'upcoming'
                              ? 'No upcoming assignments'
                              : 'No assignments found'}
                        </p>
                      </div>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
