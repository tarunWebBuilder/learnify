'use client'

import { Search, Bell } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { mockUser } from '@/lib/mock-data'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-lab-neutral-light bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 text-2xl font-bold text-lab-neutral-dark">
          <span>Hi, {mockUser.name.split(' ')[0]}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-lab-neutral-gray" />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="rounded-lg border border-lab-neutral-light bg-lab-neutral-light py-2 pl-10 pr-4 text-sm text-lab-neutral-dark placeholder-lab-neutral-gray focus:border-lab-bright-blue focus:bg-white focus:outline-none focus:ring-1 focus:ring-lab-bright-blue"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-lab-neutral-gray hover:bg-lab-neutral-light hover:text-lab-neutral-dark"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-lab-error-red" />
          </Button>

          <div className="flex items-center gap-3 border-l border-lab-neutral-light pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-lab-neutral-dark">{mockUser.name}</p>
              <p className="text-xs text-lab-neutral-gray">Student</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
