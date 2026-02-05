'use client'

import { Bell, Lock, Eye, Globe, Shield, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { mockUser } from '@/lib/mock-data'

export default function SettingsPage() {
  const settings = [
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      description: 'Receive email updates about your courses and progress',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'course-reminders',
      title: 'Course Reminders',
      description: 'Get reminders for upcoming lessons and assignments',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'community-updates',
      title: 'Community Updates',
      description: 'Be notified about new discussions and replies',
      icon: Bell,
      enabled: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Emails',
      description: 'Receive updates about new courses and special offers',
      icon: Bell,
      enabled: false,
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
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="mt-2 text-slate-600">Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <Card className="border-0 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Profile Settings</h2>

              <div className="mt-6 flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Section */}
            <Card className="border-0 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Security</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Password</p>
                      <p className="text-sm text-slate-500">Change your password regularly</p>
                    </div>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="border-0 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>

              <div className="mt-6 space-y-4">
                {settings.map(setting => {
                  const Icon = setting.icon
                  return (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{setting.title}</p>
                          <p className="text-sm text-slate-500">{setting.description}</p>
                        </div>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Privacy Section */}
            <Card className="border-0 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Privacy & Data</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Eye className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Profile Visibility</p>
                      <p className="text-sm text-slate-500">Make your profile visible to other users</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                      <Globe className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Data Sharing</p>
                      <p className="text-sm text-slate-500">Share anonymized learning data for research</p>
                    </div>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 border-l-4 border-l-red-500 bg-red-50 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>

              <div className="mt-6 space-y-4">
                <p className="text-sm text-red-700">
                  Be careful with these actions as they cannot be undone
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent">
                    Download My Data
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Delete Account
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
