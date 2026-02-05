'use client'

import { MessageSquare, Heart, Share2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function CommunityPage() {
  const discussions = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '/placeholder-user.jpg',
      course: 'Mobile Design',
      title: 'Best practices for mobile navigation design',
      excerpt: 'I recently finished the mobile design course and I am curious about what the community thinks are the best practices for navigation...',
      replies: 12,
      likes: 45,
      views: 234,
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: '/placeholder-user.jpg',
      course: 'UX Design Foundations',
      title: 'Color theory assignment feedback needed',
      excerpt: 'Just completed my color theory assignment and would love some constructive feedback from the community...',
      replies: 8,
      likes: 32,
      views: 156,
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: '/placeholder-user.jpg',
      course: 'UI Components',
      title: 'Component library resources',
      excerpt: 'Sharing some amazing resources I found for building UI component libraries. Hope this helps everyone!',
      replies: 24,
      likes: 89,
      views: 512,
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Community</h1>
                <p className="mt-2 text-slate-600">
                  Connect with other learners, share ideas, and grow together
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Start Discussion</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-0 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Active Members</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">15,234</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </Card>

              <Card className="border-0 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Discussions</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">3,456</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
              </Card>

              <Card className="border-0 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">This Week</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">234</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-orange-600" />
                </div>
              </Card>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Discussions</h2>

              {discussions.map(discussion => (
                <Card key={discussion.id} className="border-0 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{discussion.author}</p>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {discussion.course}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-semibold text-slate-900">
                        {discussion.title}
                      </h3>

                      <p className="mt-2 text-slate-600">{discussion.excerpt}</p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <button className="flex items-center gap-1 transition-colors hover:text-red-600">
                          <Heart className="h-4 w-4" />
                          {discussion.likes} likes
                        </button>
                        <button className="flex items-center gap-1 transition-colors hover:text-blue-600">
                          <MessageSquare className="h-4 w-4" />
                          {discussion.replies} replies
                        </button>
                        <span className="flex items-center gap-1">
                          {discussion.views} views
                        </span>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
