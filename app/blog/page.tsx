import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { blogs } from '@/lib/blogs'

export const metadata = {
  title: 'Blogs | Exam Prep + AI',
  description:
    'Fast, CTA-first blog list for JEE, NEET, UPSC, CAT, SSC, GATE, CUET, NDA and more. Jump to a post or start a free exam.',
}

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                <Sparkles className="h-3 w-3" />
                Blogs built for action
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Exam prep blogs with a single CTA to start testing
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                Each post is lean, SEO-friendly, and points you straight to the free exam flow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/#start-exam">
                  <Button className="rounded-full gap-2">
                    Start free test
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-[#faf7f2] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Sponsored</p>
              <div className="mt-3 flex h-24 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm font-semibold text-slate-500">
                Banner Ad 300x100
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="block">
              <Card className="h-full rounded-[28px] border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <CardDescription className="text-slate-600">
                    {blog.exam} · {blog.subject}
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
        </section>
      </div>
    </main>
  )
}
