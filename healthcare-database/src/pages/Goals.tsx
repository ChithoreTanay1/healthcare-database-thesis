import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { CheckCircle, Eye, X, Users, TrendingUp, Target } from 'lucide-react'
import type { Goal } from '@/types/index'

const GoalDetailModal: FC<{ goal: Goal; onClose: () => void }> = ({ goal, onClose }) => {
  const statusColor =
    goal.status === 'active'
      ? 'bg-green-100 text-green-700'
      : goal.status === 'completed'
      ? 'bg-sage-200 text-sage-800'
      : 'bg-yellow-100 text-yellow-700'

  const milestones = [
    { label: 'Planning', pct: 0 },
    { label: 'In Progress', pct: 25 },
    { label: 'Halfway', pct: 50 },
    { label: 'Nearly Done', pct: 75 },
    { label: 'Complete', pct: 100 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in-down">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-sage-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-sage-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-sage-900">{goal.title}</h2>
              <p className="text-sm text-sage-600">{goal.team}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-sage-100 text-sage-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Status + Progress */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor}`}>
              {goal.status}
            </span>
            <span className="text-2xl font-bold text-sage-900">{goal.progress}%</span>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="w-full bg-sage-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-sage-600 to-sage-700 h-3 rounded-full transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>

          {/* Milestone track */}
          <div>
            <p className="text-sm font-semibold text-sage-900 mb-3">Milestones</p>
            <div className="space-y-2">
              {milestones.map((m) => (
                <div key={m.pct} className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                      goal.progress >= m.pct
                        ? 'bg-sage-700 border-sage-700'
                        : 'bg-white border-sage-300'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      goal.progress >= m.pct ? 'text-sage-900 font-medium' : 'text-sage-400'
                    }`}
                  >
                    {m.label}
                  </span>
                  <span className="ml-auto text-xs text-sage-500">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-sage-100">
            <div className="flex items-center gap-2 text-sm text-sage-600">
              <Users className="w-4 h-4" />
              <span>{goal.team}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-sage-600">
              <TrendingUp className="w-4 h-4" />
              <span>{goal.progress >= 50 ? 'On Track' : 'Needs Attention'}</span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-sage-900 text-white rounded-lg text-sm font-medium hover:bg-sage-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const Goals: FC = () => {
  const { goals } = useAppStore()
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Goals</h1>
        <p className="text-sage-600">Track team objectives and progress</p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {goals.map((goal, idx) => (
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
                  <span className="text-sm font-bold text-sage-700">{goal.progress}%</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-sage-600 to-sage-700 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
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
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-sage-200 p-8 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-sage-900 mb-6">Progress Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Goals', value: goals.length },
            { label: 'Active', value: goals.filter((g) => g.status === 'active').length },
            {
              label: 'Avg Progress',
              value: goals.length
                ? `${Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%`
                : '0%',
            },
            { label: 'On Track', value: goals.filter((g) => g.progress >= 50).length },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-sage-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedGoal && (
        <GoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
      )}
    </div>
  )
}

export default Goals