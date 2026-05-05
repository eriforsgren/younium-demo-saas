// lib/mock/tasks.ts

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done'

export type Task = {
  id: string
  title: string
  status: TaskStatus
  assignee: { name: string; initials: string; color: string }
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

// Avatar color helpers — different "users" get different colors
const USERS = {
  bob: { name: 'Bob Lee', initials: 'BL', color: 'bg-blue-500' },
  jane: { name: 'Jane Doe', initials: 'JD', color: 'bg-green-500' },
  raj: { name: 'Raj Patel', initials: 'RP', color: 'bg-purple-500' },
  emma: { name: 'Emma Stone', initials: 'ES', color: 'bg-pink-500' },
}

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Redesign onboarding flow',
    status: 'todo',
    assignee: USERS.jane,
    dueDate: 'May 12',
    priority: 'high',
    tags: ['Design', 'UX'],
  },
  {
    id: 't2',
    title: 'Q2 roadmap planning doc',
    status: 'todo',
    assignee: USERS.bob,
    dueDate: 'May 8',
    priority: 'medium',
    tags: ['Planning'],
  },
  {
    id: 't3',
    title: 'Update API documentation',
    status: 'todo',
    assignee: USERS.raj,
    priority: 'low',
    tags: ['Docs'],
  },
  {
    id: 't4',
    title: 'Investigate dashboard performance',
    status: 'in_progress',
    assignee: USERS.raj,
    dueDate: 'May 10',
    priority: 'high',
    tags: ['Engineering', 'Bug'],
  },
  {
    id: 't5',
    title: 'New landing page hero section',
    status: 'in_progress',
    assignee: USERS.emma,
    dueDate: 'May 14',
    priority: 'medium',
    tags: ['Design', 'Marketing'],
  },
  {
    id: 't6',
    title: 'Set up customer feedback loop',
    status: 'review',
    assignee: USERS.bob,
    dueDate: 'May 9',
    priority: 'medium',
    tags: ['Process'],
  },
  {
    id: 't7',
    title: 'Refactor billing module',
    status: 'review',
    assignee: USERS.raj,
    priority: 'high',
    tags: ['Engineering'],
  },
  {
    id: 't8',
    title: 'Quarterly team retro notes',
    status: 'done',
    assignee: USERS.jane,
    priority: 'low',
    tags: ['Process'],
  },
  {
    id: 't9',
    title: 'Migrate to new analytics provider',
    status: 'done',
    assignee: USERS.emma,
    priority: 'medium',
    tags: ['Engineering', 'Analytics'],
  },
]

export const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To do' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'review', label: 'In review' },
  { id: 'done', label: 'Done' },
]