import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import { LogOut, Home, MessageCircle, BarChart3, CheckCircle, ClipboardList, User } from 'lucide-react'

const Sidebar: FC = () => {
  const { sidebarOpen, currentPage, setCurrentPage, logout, currentUser } = useAppStore()

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'goals', label: 'Goals', icon: CheckCircle },
    { id: 'surveys', label: 'Surveys', icon: ClipboardList },
  ]

  const handleSignOut = () => {
    logout()
    // Redirect to login page after logout
    window.location.href = '/login'
  }

  return (
    <aside 
      className={`bg-gradient-to-b from-sage-900 to-sage-800 text-white shadow-lg flex-shrink-0 flex flex-col h-full transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0'
      }`}
      style={{ overflowY: 'auto', position: 'relative' }}
    >
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo Section */}
        <div className="p-6">
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

        {/* Spacer to push user section to bottom */}
        <div className="flex-1" />
      </div>

      {/* User Profile & Sign Out Section - Fixed */}
      <div className="border-t border-sage-700 p-4 mt-auto">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 bg-sage-700 rounded-full flex items-center justify-center font-bold text-white">
            T
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{currentUser?.name || 'tanaychithore58'}</p>
            <p className="text-xs text-sage-300">{currentUser?.role || 'Admin'}</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sage-100 hover:bg-sage-700 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar