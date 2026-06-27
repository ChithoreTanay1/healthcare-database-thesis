import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { Download, Share2, Filter } from 'lucide-react'

const Reports: FC = () => {
  const { teamPulses, goals } = useAppStore()
  const [activeTab, setActiveTab] = useState('overall')
  const [filterTeam, setFilterTeam] = useState('all')

  const tabs = [
    { id: 'overall', label: 'Overall', icon: '🌍' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
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

  const filteredPulses =
    filterTeam === 'all' ? teamPulses : teamPulses.filter((tp) => tp.team === filterTeam)

  const downloadCSV = (filename: string, rows: string[][]) => {
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    if (activeTab === 'overall') {
      const header = ['Team', 'Overall', ...metrics.map((m) => m.name)]
      const rows = filteredPulses.map((tp) => [
        tp.team,
        tp.overall.toFixed(1),
        ...metrics.map((m) => (tp as any)[m.key]?.toFixed(1) ?? ''),
      ])
      downloadCSV('team-pulse-report.csv', [header, ...rows])
    } else if (activeTab === 'goals') {
      const header = ['Title', 'Team', 'Status', 'Progress (%)']
      const rows = goals.map((g) => [g.title, g.team, g.status, String(g.progress)])
      downloadCSV('goals-report.csv', [header, ...rows])
    }
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
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="px-4 py-2 border border-sage-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
          >
            <option value="all">All Teams</option>
            {teamPulses.map((tp) => (
              <option key={tp.team} value={tp.team}>{tp.team}</option>
            ))}
          </select>
          <button className="px-4 py-2 border border-sage-300 rounded-lg text-sm flex items-center gap-2 hover:bg-sage-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-sage-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-sage-800 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-4 py-2 border border-sage-300 rounded-lg text-sm flex items-center gap-2 hover:bg-sage-50">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Overall Tab */}
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
                {filteredPulses.map((team, idx) => (
                  <tr key={idx} className="hover:bg-sage-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-sage-900">{team.team}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-sage-700 text-white px-3 py-1 rounded font-semibold text-sm">
                        {team.overall.toFixed(1)}
                      </span>
                    </td>
                    {metrics.map((m) => (
                      <td key={m.key} className="px-4 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded font-semibold text-sm ${getScoreColor((team as any)[m.key])}`}>
                          {((team as any)[m.key] as number).toFixed(1)}
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

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="bg-white rounded-xl border border-sage-200 overflow-hidden animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-sage-200 bg-sage-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Team</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-sage-900">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-sage-900">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {goals.map((g) => (
                <tr key={g.id} className="hover:bg-sage-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-sage-900">{g.title}</td>
                  <td className="px-6 py-4 text-sm text-sage-600">{g.team}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      g.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-sage-200 text-sage-800'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-sage-200 rounded-full h-2">
                        <div
                          className="bg-sage-600 h-2 rounded-full"
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-sage-700 w-10 text-right">{g.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Reports