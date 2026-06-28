import { FC, useRef } from 'react'
import { useAppStore } from '@/store/appStore'
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react'

const Dashboard: FC = () => {
  const { appointments, patients, teamPulses, goals, setCurrentPage } = useAppStore()

  // ── Scroll targets ────────────────────────────────────────────────────────
  const appointmentsRef = useRef<HTMLDivElement>(null)
  const teamPulseRef = useRef<HTMLDivElement>(null)
  const goalsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const uniqueDoctors = new Set(appointments.map((a) => a.doctor)).size

  const stats = [
    {
      label: 'Total Patients',
      value: patients.length,
      icon: Users,
    },
    {
      label: 'Active Doctors',
      value: uniqueDoctors,
      icon: Users,
    },
    {
      label: 'Appointments',
      value: appointments.length,
      icon: Calendar,
      onClick: () => scrollTo(appointmentsRef),
    },
    {
      label: 'Goals',
      value: goals.length,
      icon: TrendingUp,
      onClick: () => scrollTo(goalsRef),
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-sage-900 mb-2">Dashboard</h1>
        <p className="text-sage-600">Welcome to your healthcare management system</p>
      </div>

      {/* Stats Grid — clicking scrolls to the relevant section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <button
              key={i}
              onClick={stat.onClick}
              className="bg-white rounded-xl border border-sage-200 p-6 card-hover text-left w-full transition-all hover:shadow-md hover:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600"
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-sage-600" />
                <span className="text-xs font-semibold text-sage-600">This Month</span>
              </div>
              <p className="text-sage-600 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-sage-900">{stat.value}</p>
            </button>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
        {/* Upcoming Appointments */}
        <div ref={appointmentsRef} className="lg:col-span-2 bg-white rounded-xl border border-sage-200 p-6 scroll-mt-8">
          <h2 className="text-xl font-bold text-sage-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sage-700" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-sage-500 text-sm text-center py-8">No upcoming appointments</p>
            ) : (
              appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between py-3 border-b border-sage-100 last:border-0">
                  <div>
                    <p className="font-medium text-sage-900">{apt.patient}</p>
                    <p className="text-sm text-sage-600">{apt.doctor} · {apt.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-sage-900">{apt.date}</p>
                    <p className="text-xs text-sage-600">{apt.time}</p>
                  </div>
                  <span className={`ml-4 px-2 py-1 rounded-full text-xs font-semibold ${
                    apt.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : apt.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-sage-100 text-sage-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Team Pulse */}
        <div ref={teamPulseRef} className="bg-white rounded-xl border border-sage-200 p-6 scroll-mt-8">
          <h2 className="text-xl font-bold text-sage-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sage-700" />
            Team Pulse
          </h2>
          <div className="space-y-4">
            {teamPulses.length === 0 ? (
              <p className="text-sage-500 text-sm text-center py-8">No team data</p>
            ) : (
              teamPulses.map((pulse) => (
                <div key={pulse.team} className="bg-sage-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sage-900">{pulse.team}</h3>
                    <span className="text-2xl font-bold text-sage-700">{pulse.overall.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-sage-300 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sage-600 to-sage-700 h-2 rounded-full"
                      style={{ width: `${(pulse.overall / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setCurrentPage('reports')}
            className="mt-4 w-full text-sm text-sage-600 hover:text-sage-900 font-medium transition-colors"
          >
            View full report →
          </button>
        </div>
      </div>

      {/* Goals Section */}
      <div ref={goalsRef} className="bg-white rounded-xl border border-sage-200 p-6 animate-fade-in-down scroll-mt-8" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-sage-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sage-700" />
            Active Goals
          </h2>
          <button
            onClick={() => setCurrentPage('goals')}
            className="text-sm text-sage-600 hover:text-sage-900 font-medium transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.length === 0 ? (
            <p className="text-sage-500 text-sm text-center py-8 col-span-3">No active goals</p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="border border-sage-200 rounded-lg p-4 hover:border-sage-400 transition-colors cursor-pointer"
                onClick={() => setCurrentPage('goals')}
              >
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
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard