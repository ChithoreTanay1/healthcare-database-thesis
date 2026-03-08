import { FC } from 'react'
import { useAppStore } from '@/store/appStore'
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react'

const Dashboard: FC = () => {
  const { appointments, patients, doctors, teamPulses, goals } = useAppStore()

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'sage' },
    { label: 'Active Doctors', value: doctors.filter((d) => d.available).length, icon: Users, color: 'sage' },
    { label: 'Appointments', value: appointments.length, icon: Calendar, color: 'sage' },
    { label: 'Goals', value: goals.length, icon: TrendingUp, color: 'sage' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Dashboard</h1>
        <p className="text-sage-600">Welcome to your healthcare management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-sage-200 p-6 card-hover"
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-sage-600" />
                <span className="text-xs font-semibold text-sage-600">This Month</span>
              </div>
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-sage-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-sage-200 p-6">
          <h2 className="text-xl font-bold text-sage-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sage-700" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {appointments.slice(0, 4).map((apt) => (
              <div
                key={apt.id}
                className="border border-sage-200 rounded-lg p-4 hover:border-sage-400 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sage-900">{apt.patient}</h3>
                    <p className="text-sm text-sage-600">{apt.doctor}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      apt.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : apt.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-sage-500 mt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {apt.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Pulse Summary */}
        <div className="bg-white rounded-xl border border-sage-200 p-6">
          <h2 className="text-xl font-bold text-sage-900 mb-6">Team Health</h2>
          <div className="space-y-4">
            {teamPulses.map((pulse) => (
              <div key={pulse.team} className="border border-sage-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sage-900">{pulse.team}</h3>
                  <span className="text-2xl font-bold text-sage-700">{pulse.overall.toFixed(1)}</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-sage-600 to-sage-700 h-2 rounded-full"
                    style={{ width: `${(pulse.overall / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-xl border border-sage-200 p-6 animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-xl font-bold text-sage-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sage-700" />
          Active Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-sage-200 rounded-lg p-4">
              <h3 className="font-semibold text-sage-900 mb-2">{goal.title}</h3>
              <p className="text-sm text-sage-600 mb-4">{goal.team}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-sage-600">
                  <span>Progress</span>
                  <span className="font-semibold">{goal.progress}%</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div
                    className="bg-sage-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
