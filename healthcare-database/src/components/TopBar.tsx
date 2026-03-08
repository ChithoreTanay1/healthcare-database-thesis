import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import { Menu } from 'lucide-react'

const TopBar: FC = () => {
  const { currentUser, toggleSidebar } = useAppStore()

  return (
    <header className="bg-white border-b border-sage-200 sticky top-0 z-30 shadow-sm">
      <div className="px-8 py-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-sage-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-sage-700" />
        </button>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-sage-900">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-sage-600 capitalize">{currentUser?.role}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser?.email[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
