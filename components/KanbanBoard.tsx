// components/KanbanBoard.tsx
import { MOCK_TASKS, COLUMNS, Task } from '@/lib/mock/tasks'

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-gray-50 text-gray-700 border-gray-200',
}

export function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((column) => {
        const tasks = MOCK_TASKS.filter((t) => t.status === column.id)
        return (
          <div key={column.id} className="bg-gray-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-sm font-semibold text-gray-700">
                {column.label}
              </h3>
              <span className="text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full">
                {tasks.length}
              </span>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition cursor-pointer"
                >
                  {/* Title */}
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {task.title}
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer: priority + due date + avatar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md border ${PRIORITY_COLORS[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500">
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full ${task.assignee.color} text-white text-xs font-semibold flex items-center justify-center`}
                      title={task.assignee.name}
                    >
                      {task.assignee.initials}
                    </div>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-6 italic">
                  No tasks
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}