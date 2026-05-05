// components/StubPage.tsx
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
              <div className="text-5xl mb-4">🚧</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title} is under construction
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                {description}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}