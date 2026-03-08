import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import { LogOut, Home, MessageCircle, BarChart3, CheckCircle, ClipboardList } from 'lucide-react'

const Sidebar: FC = () => {
  const { sidebarOpen, currentPage, setCurrentPage, logout } = useAppStore()

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'goals', label: 'Goals', icon: CheckCircle },
    { id: 'surveys', label: 'Surveys', icon: ClipboardList },
  ]

  if (!sidebarOpen) return null

  return (
    <aside className="w-64 bg-gradient-to-b from-sage-900 to-sage-800 text-white shadow-lg fixed inset-y-0 left-0 z-40 overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-sage-700">
            M
          </div>
          <span className="text-lg font-bold">MediHub</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-sage-800'
                    : 'text-sage-100 hover:bg-sage-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sage-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sage-100 hover:bg-sage-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
