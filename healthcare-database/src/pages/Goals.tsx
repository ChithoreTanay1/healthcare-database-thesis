import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { CheckCircle, Eye, X } from 'lucide-react'
import type { Goal } from '@/types/index'

const Goals: FC = () => {
  const { goals } = useAppStore()
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

  const avgProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + (g.progress ?? 0), 0) / goals.length)
    : 0

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Goals</h1>
        <p className="text-sage-600">Track team objectives and progress</p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {goals.length === 0 ? (
          <p className="text-sage-500 text-sm text-center py-12 col-span-3">No goals yet</p>
        ) : (
          goals.map((goal, idx) => (
            <div
              key={goal.id}
              className="bg-white rounded-xl border border-sage-200 p-6 card-hover"
              style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-sage-900 mb-1">{goal.title}</h3>
                  <p className="text-sm text-sage-600">{goal.team}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-sage-600 flex-shrink-0" />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-sage-900">Progress</span>
                    <span className="text-sm font-bold text-sage-700">{goal.progress ?? 0}%</span>
                  </div>
                  <div className="w-full bg-sage-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-sage-600 to-sage-700 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedGoal(goal)}
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-xl border border-sage-200 p-8 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-sage-900 mb-6">Progress Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Goals', value: goals.length },
            { label: 'Active', value: goals.filter((g) => g.status === 'active').length },
            { label: 'Avg Progress', value: `${avgProgress}%` },
            { label: 'On Track', value: goals.filter((g) => (g.progress ?? 0) >= 50).length },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-sage-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Detail Modal */}
      {selectedGoal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedGoal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-sage-900">{selectedGoal.title}</h2>
                <p className="text-sm text-sage-600 mt-1">{selectedGoal.team}</p>
              </div>
              <button
                onClick={() => setSelectedGoal(null)}
                className="p-2 hover:bg-sage-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-sage-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-sage-900">Progress</span>
                  <span className="text-2xl font-bold text-sage-700">{selectedGoal.progress ?? 0}%</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-sage-600 to-sage-700 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedGoal.progress ?? 0}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sage-50 rounded-lg p-4">
                  <p className="text-xs text-sage-600 mb-1">Status</p>
                  <p className="font-semibold text-sage-900 capitalize">{selectedGoal.status ?? 'active'}</p>
                </div>
                <div className="bg-sage-50 rounded-lg p-4">
                  <p className="text-xs text-sage-600 mb-1">Team</p>
                  <p className="font-semibold text-sage-900">{selectedGoal.team}</p>
                </div>
              </div>

              <div className="bg-sage-50 rounded-lg p-4">
                <p className="text-xs text-sage-600 mb-1">Remaining</p>
                <p className="font-semibold text-sage-900">{100 - (selectedGoal.progress ?? 0)}% to completion</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedGoal(null)}
              className="mt-6 w-full px-4 py-2 bg-sage-800 text-white rounded-lg text-sm font-medium hover:bg-sage-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Goals