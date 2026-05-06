// components/StubPage.tsx
import { Sparkles } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

type StubPageProps = {
  title: string
  description: string
  userName: string
  userCompany: string
}

export function StubPage({ title, description, userName, userCompany }: StubPageProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={userName} userCompany={userCompany} />

      <div className="flex-1 flex flex-col">
        <TopBar title={title} />

        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gray-500" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
                {title}
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                {description}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600">
                Coming soon
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}