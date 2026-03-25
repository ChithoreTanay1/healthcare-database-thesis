import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import LoginPage from '@pages/LoginPage'
import Dashboard from '@pages/Dashboard'
import Feedback from '@pages/Feedback'
import Reports from '@pages/Reports'
import Goals from '@pages/Goals'
import Surveys from '@pages/Surveys'
import Sidebar from '@components/Sidebar'
import TopBar from '@components/TopBar'

const App: FC = () => {
  const { currentUser, currentPage, sidebarOpen } = useAppStore()

  if (!currentUser) {
    return <LoginPage />
  }

  return (
    <div className="flex h-screen bg-sage-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'feedback' && <Feedback />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'goals' && <Goals />}
          {currentPage === 'surveys' && <Surveys />}
        </main>
      </div>
    </div>
  )
}

export default App
