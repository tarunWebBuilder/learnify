import Link from 'next/link'
import { ArrowRight, Sparkles, Clock3 } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { blogs } from '@/lib/blogs'

export const metadata = {
  title: 'tutorly-ai Experience - Fast Exam CTA and SEO Blogs',
  description:
    'A lean landing page that lets users start a free test immediately and dive into India-focused exam blogs for JEE, CLAT, NID, and NIFT.',
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                <Sparkles className="h-3 w-3" />
                Focused. Fast. Clear.
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Start a free exam in seconds, then keep learning through India exam blogs.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                No clutter. One CTA to test, one path to read. Designed for exam takers who want
                action first and context right after.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button className="rounded-full gap-2">
                    Start free test
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900"
                >
                  View blogs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-[#faf7f2] p-6">
              <p className="text-sm font-semibold text-slate-700">Why this page</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>• Single CTA to start a test—no scrolling required.</p>
                <p>• Direct links to SEO-strength exam blogs.</p>
                <p>• Minimal layout for faster time-to-action.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured blogs</h2>
              <p className="text-sm text-slate-600">Lean posts that push readers into testing.</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900"
            >
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {blogs.slice(0, 4).map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block">
                <Card className="h-full rounded-[28px] border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{blog.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-slate-600">
                      <Clock3 className="h-4 w-4" />
                      {blog.exam} • {blog.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-6 text-slate-600">{blog.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      Read and start tests
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
