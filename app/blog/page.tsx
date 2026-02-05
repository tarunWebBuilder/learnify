'use client'

import { Search, Calendar, User, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { mockBlogs } from '@/lib/mock-data'
import Link from 'next/link'
import { useState } from 'react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Design', 'Development', 'Business']
  const featuredBlogs = mockBlogs.filter(b => b.featured)
  const regularBlogs = mockBlogs.filter(
    b => !b.featured && (selectedCategory === 'All' || b.category === selectedCategory)
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="space-y-8 p-8">
            {/* Featured Blogs Hero */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-lab-neutral-dark">Learning Hub</h1>
                <p className="mt-3 text-base text-lab-neutral-gray">
                  Insights, tips, and inspiration from industry experts
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-lab-neutral-light bg-white px-4 py-3 focus-within:border-lab-bright-blue focus-within:shadow-sm transition-all">
                <Search className="h-5 w-5 text-lab-neutral-gray" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="flex-1 bg-transparent outline-none text-lab-neutral-dark placeholder:text-lab-neutral-gray"
                />
              </div>
            </div>

            {/* Featured Posts */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-lab-neutral-dark">Featured Stories</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {featuredBlogs.map((blog, idx) => (
                  <Card
                    key={blog.id}
                    className={`overflow-hidden border border-lab-neutral-light ${blog.color} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="space-y-4 p-6">
                      <div className="relative h-40 rounded-lg bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center overflow-hidden">
                        <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">
                          {blog.sticker}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-full bg-lab-neutral-light px-3 py-1 text-xs font-semibold text-lab-neutral-gray">
                            {blog.category}
                          </span>
                          <span className="text-xs text-lab-neutral-gray">{blog.readTime}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lab-neutral-dark line-clamp-2 text-balance text-lg">
                          {blog.title}
                        </h3>
                        
                        <p className="text-sm text-lab-neutral-gray line-clamp-2">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                        <div className="text-xs text-slate-600">
                          <User className="h-3 w-3 inline mr-1" />
                          {blog.author}
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-300 text-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Recent Articles */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Recent Articles</h2>
              <div className="space-y-4">
                {regularBlogs.map(blog => (
                  <Card
                    key={blog.id}
                    className={`border-0 shadow-sm transition-all hover:shadow-md cursor-pointer group ${blog.color}`}
                  >
                    <div className="flex gap-6 p-6">
                      <div className="hidden sm:flex h-24 w-24 items-center justify-center rounded-lg bg-white/50 flex-shrink-0">
                        <span className="text-4xl">{blog.sticker}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                                {blog.category}
                              </span>
                              <span className="text-xs text-slate-600">{blog.readTime}</span>
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg hover:text-purple-600 transition-colors line-clamp-2 text-balance">
                              {blog.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                              {blog.excerpt}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(blog.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {blog.author}
                                </span>
                              </div>
                              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {regularBlogs.length === 0 && (
                <Card className="border-0 bg-white p-12 text-center shadow-sm">
                  <p className="text-slate-600">No articles found in this category.</p>
                </Card>
              )}
            </div>

            {/* Newsletter CTA */}
            <Card className="border-0 bg-gradient-to-r from-purple-200 to-blue-200 p-12 shadow-sm">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Stay Updated</h3>
                <p className="text-slate-700 max-w-2xl mx-auto">
                  Subscribe to our newsletter to get the latest articles, tips, and industry insights delivered to your inbox.
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
