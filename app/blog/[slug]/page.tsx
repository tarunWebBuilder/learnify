import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { blogs, getBlogBySlug } from '@/lib/blogs'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) {
    return {
      title: 'Blog not found',
    }
  }
  return {
    title: `${blog.title} | ${blog.exam} prep`,
    description: blog.description,
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            <Sparkles className="h-3 w-3" />
            {blog.exam} • {blog.subject}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{blog.title}</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">{blog.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/#start-exam">
              <Button className="rounded-full gap-2">
                Start free test
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900"
            >
              Back to blogs
            </Link>
          </div>
        </div>

        <Card className="rounded-[32px] border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-4 p-8">
            <p className="text-sm text-slate-600">
              This article is part of the SEO-first exam prep cluster. Pair it with a timed mock to
              move from reading to action.
            </p>
            <Link href="/#start-exam" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              Go to free exam flow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </article>
    </main>
  )
}
