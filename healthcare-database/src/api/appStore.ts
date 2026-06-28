import { create } from 'zustand'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import { getPatients } from '@/api/patient'
import { getFeedbacks } from '@/api/feedback'
import { getAppointments } from '@/api/appointments'
import { getTeamPulses, getGoals } from '@/api/analytics'
import type { User, Patient, Doctor, Appointment, Feedback, TeamPulse, Goal, OneOnOne } from '@/types/index'

interface AppStore {
  currentUser: User | null
  currentPage: string
  sidebarOpen: boolean
  accessToken: string | null
  loading: boolean
  error: string | null

  appointments: Appointment[]
  patients: Patient[]
  doctors: Doctor[]
  feedbacks: Feedback[]
  teamPulses: TeamPulse[]
  goals: Goal[]
  oneOnOnes: OneOnOne[]

  setCurrentUser: (user: User | null) => void
  setCurrentPage: (page: string) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  addAppointment: (appointment: Appointment) => void
  addFeedback: (feedback: Feedback) => void
  logout: () => void

  loginAsync: (email: string, password: string, role: string) => Promise<void>
  logoutAsync: () => Promise<void>
  loadData: () => Promise<void>
}

const initialDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Chen', specialty: 'Cardiology', available: true, team: 'Cardiology' },
  { id: '2', name: 'Dr. James Wilson', specialty: 'Endocrinology', available: true, team: 'Endocrinology' },
  { id: '3', name: 'Dr. Lisa Anderson', specialty: 'Rheumatology', available: false, team: 'Rheumatology' },
]

const initialOneOnOnes: OneOnOne[] = [
  { id: '1', employee: 'Peter Jacobs', manager: 'Dr. Sarah Chen', date: '2025-03-20', lastMeeting: '2025-02-20' },
  { id: '2', employee: 'Mary Billin', manager: 'Dr. Sarah Chen', date: '2025-03-22', lastMeeting: '2025-02-22' },
  { id: '3', employee: 'Andrea McBean', manager: 'Dr. James Wilson', date: '2025-03-25', lastMeeting: '2025-02-25' },
]

// Normalize raw API responses to match frontend types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeAppointment = (a: any): Appointment => ({
  id: a.id,
  patient: a.patient ?? a.patientName ?? '',
  doctor: a.doctor ?? a.doctorName ?? '',
  date: a.date ?? '',
  time: a.time ?? '',
  type: a.type ?? 'Consultation',
  status: (a.status ?? 'pending').toLowerCase() as Appointment['status'],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeFeedback = (f: any): Feedback => ({
  id: f.id,
  author: f.author ?? 'Anonymous',
  category: f.category ?? '',
  content: f.content ?? f.message ?? '',
  timestamp: f.timestamp ?? '',
  status: (f.status ?? 'new').toLowerCase() as Feedback['status'],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeGoal = (g: any): Goal => ({
  id: g.id,
  team: g.team ?? '',
  title: g.title ?? '',
  progress: g.progress ?? 0,
  status: (g.status ?? 'active').toLowerCase() as Goal['status'],
})

export const useAppStore = create<AppStore>((set, get) => ({
  currentUser: null,
  currentPage: 'login',
  sidebarOpen: true,
  accessToken: localStorage.getItem('token'),
  loading: false,
  error: null,

  appointments: [],
  patients: [],
  doctors: initialDoctors,
  feedbacks: [],
  teamPulses: [],
  goals: [],
  oneOnOnes: initialOneOnOnes,

  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),

  addFeedback: (feedback) =>
    set((state) => ({ feedbacks: [feedback, ...state.feedbacks] })),

  logout: () =>
    set({
      currentUser: null,
      currentPage: 'login',
      accessToken: null,
      appointments: [],
      patients: [],
      feedbacks: [],
      teamPulses: [],
      goals: [],
    }),

  loginAsync: async (email, password, _role) => {
    set({ loading: true, error: null })
    try {
      const data = await apiLogin(email, password)
      localStorage.setItem('token', data.accessToken)
      set({
        accessToken: data.accessToken,
        currentUser: {
          id: '',
          email,
          role: data.role.toLowerCase() as User['role'],
          name: email.split('@')[0],
        },
        currentPage: 'dashboard',
      })
      await get().loadData()
    } catch (e: any) {
      set({ error: e.message ?? 'Login failed' })
    } finally {
      set({ loading: false })
    }
  },

  logoutAsync: async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) await apiLogout(token)
    } catch {
      // best-effort
    } finally {
      localStorage.removeItem('token')
      set({
        currentUser: null,
        currentPage: 'login',
        accessToken: null,
        appointments: [],
        patients: [],
        feedbacks: [],
        teamPulses: [],
        goals: [],
      })
    }
  },

  loadData: async () => {
    set({ loading: true, error: null })
    try {
      const [rawPatients, rawFeedbacks, rawAppointments, teamPulses, rawGoals] = await Promise.all([
        getPatients(),
        getFeedbacks(),
        getAppointments(),
        getTeamPulses(),
        getGoals(),
      ])
      set({
        patients: rawPatients,
        feedbacks: rawFeedbacks.map(normalizeFeedback),
        appointments: rawAppointments.map(normalizeAppointment),
        teamPulses,
        goals: rawGoals.map(normalizeGoal),
      })
    } catch (e: any) {
      set({ error: e.message ?? 'Failed to load data' })
    } finally {
      set({ loading: false })
    }
  },
}))