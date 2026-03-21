// Minimal placeholder data to satisfy existing pages without heavy mock content.

export const mockUser = {
  id: '1',
  name: 'Learner',
  email: 'user@example.com',
  avatar: '/placeholder.svg',
  hoursSpent: 0,
  coursesCompleted: 0,
  averageScore: 0,
}

export const mockCourses = [
  {
    id: '1',
    title: 'Starter Course',
    category: 'General',
    progress: 0,
    hours: 0,
    color: 'bg-slate-100',
    badge: 'bg-slate-200 text-slate-800',
    icon: '📘',
    description: 'Placeholder course',
    instructor: 'Staff',
    students: 0,
    rating: 0,
    price: 0,
    duration: '0 weeks',
    level: 'Beginner',
    lessons: 0,
    completed: 0,
  },
]

export const mockAssignments = [
  {
    id: '1',
    title: 'Sample Assignment',
    course: 'Starter Course',
    score: null,
    status: 'Upcoming',
    dueDate: 'TBD',
    completedDate: null,
  },
]

export const mockLessons = [
  {
    id: '1',
    title: 'Intro Lesson',
    duration: 0,
    completed: false,
    course: 'Starter Course',
  },
]

export const categories = ['All Courses', 'General']

export const mockBlogs = []
