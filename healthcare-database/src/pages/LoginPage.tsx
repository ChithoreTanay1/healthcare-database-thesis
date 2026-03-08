import { FC, useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { FileText } from 'lucide-react'

const LoginPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'doctor' | 'manager'>('admin')
  const { setCurrentUser, setCurrentPage } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setCurrentUser({
        id: '1',
        email,
        role,
        name: email.split('@')[0],
      })
      setCurrentPage('dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="w-full max-w-md animate-fade-in-down">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-sage-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-sage-700 to-sage-800 px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-sage-700" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Syne' }}>
              MediHub
            </h1>
            <p className="text-sage-100 text-sm">Healthcare Management Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-sage-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hospital.com"
                className="input-field"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-sage-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-sage-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'doctor' | 'manager')}
                className="input-field"
              >
                <option value="admin">Administrator</option>
                <option value="doctor">Doctor</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sage-700 to-sage-800 text-white font-semibold py-3 rounded-lg hover:from-sage-800 hover:to-sage-900 transition duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </button>

            <p className="text-center text-sage-600 text-xs mt-6">Demo: any email/password</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
