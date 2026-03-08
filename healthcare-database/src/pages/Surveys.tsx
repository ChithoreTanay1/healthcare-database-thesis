import { FC } from 'react'
import { BarChart3, Calendar, Users } from 'lucide-react'

const Surveys: FC = () => {
  const surveys = [
    {
      id: '1',
      title: 'Q1 Wellness Check-in',
      team: 'Company',
      date: '2025-03-01',
      responseRate: 78,
      total: 180,
    },
    {
      id: '2',
      title: 'Team Effectiveness',
      team: 'Engineering',
      date: '2025-02-15',
      responseRate: 85,
      total: 45,
    },
    {
      id: '3',
      title: 'Leadership Review',
      team: 'Management',
      date: '2025-02-01',
      responseRate: 92,
      total: 23,
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Surveys</h1>
        <p className="text-sage-600">Monitor team feedback surveys and results</p>
      </div>

      {/* Surveys List */}
      <div className="space-y-4 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {surveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-xl border border-sage-200 p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sage-900 text-lg">{survey.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-sage-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {survey.team}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {survey.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sage-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-sage-900">Response Rate</p>
                <p className="text-2xl font-bold text-sage-900">{survey.responseRate}%</p>
              </div>
              <div className="w-full bg-sage-200 rounded-full h-3">
                <div
                  className="bg-sage-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${survey.responseRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-sage-600 mt-2">
                {Math.round((survey.responseRate / 100) * survey.total)} of {survey.total} responded
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Survey Stats */}
      <div className="bg-white rounded-xl border border-sage-200 p-8 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-bold text-sage-900 mb-6">Survey Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Surveys', value: surveys.length },
            { label: 'Avg Response Rate', value: `${Math.round(surveys.reduce((a, s) => a + s.responseRate, 0) / surveys.length)}%` },
            { label: 'Total Responses', value: surveys.reduce((a, s) => a + Math.round((s.responseRate / 100) * s.total), 0) },
          ].map((stat, idx) => (
            <div key={idx} className="border border-sage-200 rounded-lg p-4">
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-sage-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Surveys
