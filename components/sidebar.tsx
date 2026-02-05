'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, LogOut, Settings, BarChart3, ListTodo, Users, Newspaper } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-lab-neutral-light bg-lab-neutral-light p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lab-bright-blue">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-lab-neutral-dark">Learnify</span>
      </div>

      <nav className="space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/dashboard')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          href="/courses"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/courses')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="font-medium">Courses</span>
        </Link>

        <Link
          href="/assignments"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/assignments')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <ListTodo className="h-5 w-5" />
          <span className="font-medium">Assignments</span>
        </Link>

        <Link
          href="/community"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/community')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">Community</span>
        </Link>

        <Link
          href="/blog"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/blog')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <Newspaper className="h-5 w-5" />
          <span className="font-medium">Learning Hub</span>
        </Link>
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-1 border-t border-lab-neutral-light pt-4">
        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-all ${
            isActive('/settings')
              ? 'bg-white text-lab-bright-blue shadow-sm border-l-4 border-lab-bright-blue'
              : 'text-lab-neutral-gray hover:bg-white hover:text-lab-neutral-dark'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>

        <button className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-lab-neutral-gray transition-all hover:bg-white hover:text-lab-neutral-dark">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}
