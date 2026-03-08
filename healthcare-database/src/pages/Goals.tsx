import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import { CheckCircle, Eye } from 'lucide-react'

const Goals: FC = () => {
  const { goals } = useAppStore()

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
                  ></div>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors">
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
            { label: 'Avg Progress', value: `${Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%` },
            { label: 'On Track', value: goals.filter((g) => g.progress >= 50).length },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-sage-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Goals
