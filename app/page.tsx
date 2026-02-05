'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-lab-neutral-light px-8 py-4 sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3 text-2xl font-bold text-lab-neutral-dark">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lab-bright-blue">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span>Learnify</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#features">
            <Button variant="ghost" className="text-lab-neutral-gray hover:text-lab-bright-blue">Features</Button>
          </Link>
          <Link href="#courses">
            <Button variant="ghost" className="text-lab-neutral-gray hover:text-lab-bright-blue">Courses</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-lab-bright-blue text-white hover:bg-lab-primary-blue">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-8 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold leading-tight text-lab-neutral-dark md:text-6xl">
                Learn Anything,<br /><span className="text-lab-accent-purple">Become Anything</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-lab-neutral-gray">
                Transform your future with world-class courses taught by industry experts. Learn at your pace, on your terms.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg" className="gap-2 bg-lab-bright-blue text-white hover:bg-lab-primary-blue shadow-md">
                    Explore Courses
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border border-lab-neutral-light text-lab-bright-blue hover:bg-lab-neutral-light bg-transparent">
                  Watch Demo
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-lab-neutral-dark">500K+</p>
                  <p className="text-sm text-lab-neutral-gray">Active Learners</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-lab-neutral-dark">100+</p>
                  <p className="text-sm text-lab-neutral-gray">Expert Courses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-lab-neutral-dark">95%</p>
                  <p className="text-sm text-lab-neutral-gray">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative space-y-4">
                {[
                  { title: 'Mobile Design', color: 'bg-blue-50', icon: '📱' },
                  { title: 'UX Design', color: 'bg-purple-50', icon: '✨' },
                  { title: 'Web Dev', color: 'bg-green-50', icon: '💻' },
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    className={`border border-lab-neutral-light ${item.color} p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:scale-105`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="font-semibold text-lab-neutral-dark">{item.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-slate-200 px-8 py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">Why Choose Learnify?</h2>
            <p className="mt-4 text-xl text-slate-600">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your learning journey with detailed analytics and progress tracking',
              },
              {
                icon: Users,
                title: 'Learn Together',
                description: 'Connect with other learners, share ideas, and grow as a community',
              },
              {
                icon: Award,
                title: 'Get Certified',
                description: 'Earn certificates to showcase your achievements to employers',
              },
              {
                icon: Zap,
                title: 'Learn Fast',
                description: 'Accelerated learning paths designed for busy professionals',
              },
              {
                icon: Star,
                title: 'Quality Content',
                description: 'Curated content from industry experts and thought leaders',
              },
              {
                icon: BookOpen,
                title: 'Lifetime Access',
                description: 'Access course materials anytime, anywhere, forever',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="border-0 bg-white p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white text-center">
          <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of students who are already transforming their careers with Learnify
          </p>
          <Link href="/courses">
            <Button size="lg" className="mt-8 bg-white text-blue-600 hover:bg-slate-100">
              Browse Courses Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 px-8 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Learnify</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Transform your future through world-class education
              </p>
            </div>

            {[
              { title: 'Product', links: ['Courses', 'Pricing', 'Blog'] },
              { title: 'Company', links: ['About', 'Contact', 'Careers'] },
              { title: 'Resources', links: ['Help Center', 'Community', 'Privacy'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold">{section.title}</h4>
                <ul className="mt-4 space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Learnify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
