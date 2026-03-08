import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { Download, Share2, Filter } from 'lucide-react'

const Reports: FC = () => {
  const { teamPulses } = useAppStore()
  const [activeTab, setActiveTab] = useState('overall')

  const tabs = [
    { id: 'overall', label: 'Overall', icon: '🌍' },
    { id: 'surveys', label: 'Surveys', icon: '📋' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'oneOnOnes', label: '1-on-1s', icon: '👥' },
  ]

  const metrics = [
    { name: 'Collaboration', key: 'collaboration' },
    { name: 'Communication', key: 'communication' },
    { name: 'Development', key: 'development' },
    { name: 'Impact', key: 'impact' },
    { name: 'Innovation', key: 'innovation' },
    { name: 'Inclusivity', key: 'inclusivity' },
    { name: 'Work Balance', key: 'workBalance' },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'bg-sage-300 text-sage-900'
    if (score >= 7.5) return 'bg-sage-200 text-sage-900'
    if (score >= 6.5) return 'bg-sage-100 text-sage-900'
    return 'bg-sage-50 text-sage-900'
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Reports</h1>
        <p className="text-sage-600">Comprehensive team metrics and analysis</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-sage-200 overflow-x-auto pb-0 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-sage-700 text-sage-900'
                : 'border-transparent text-sage-600 hover:text-sage-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between animate-fade-in-down" style={{ animationDelay: '0.15s' }}>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-sage-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-600">
            <option>Team</option>
            {teamPulses.map((tp) => (
              <option key={tp.team}>{tp.team}</option>
            ))}
          </select>
          <button className="px-4 py-2 border border-sage-300 rounded-lg text-sm flex items-center gap-2 hover:bg-sage-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-sage-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-sage-800">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="px-4 py-2 border border-sage-300 rounded-lg text-sm flex items-center gap-2 hover:bg-sage-50">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Metrics Table */}
      {activeTab === 'overall' && (
        <div className="bg-white rounded-xl border border-sage-200 overflow-hidden animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sage-200 bg-sage-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Team</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-sage-900">Benchmark</th>
                  {metrics.map((metric) => (
                    <th key={metric.key} className="px-4 py-4 text-center text-sm font-semibold text-sage-900">
                      {metric.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-200">
                {teamPulses.map((team, idx) => (
                  <tr key={idx} className="hover:bg-sage-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-sage-900">{team.team}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-sage-700 text-white px-3 py-1 rounded font-semibold text-sm">
                        {team.overall.toFixed(1)}
                      </div>
                    </td>
                    {metrics.map((metric) => (
                      <td key={metric.key} className="px-4 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded font-semibold text-sm ${getScoreColor(
                            team[metric.key as keyof typeof team] as number
                          )}`}
                        >
                          {(team[metric.key as keyof typeof team] as number).toFixed(1)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== 'overall' && (
        <div className="text-center py-12 bg-white rounded-xl border border-sage-200">
          <p className="text-sage-600">This section is coming soon</p>
        </div>
      )}
    </div>
  )
}

export default Reports
