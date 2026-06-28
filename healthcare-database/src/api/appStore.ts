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

  // Sync actions
  setCurrentUser: (user: User | null) => void
  setCurrentPage: (page: string) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  addAppointment: (appointment: Appointment) => void
  addFeedback: (feedback: Feedback) => void
  logout: () => void

  // Async actions
  loginAsync: (email: string, password: string, role: string) => Promise<void>
  logoutAsync: () => Promise<void>
  loadData: () => Promise<void>
}



export const useAppStore = create<AppStore>((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  currentUser: null,
  currentPage: 'login',
  sidebarOpen: true,
  accessToken: localStorage.getItem('token'),
  loading: false,
  error: null,

  appointments: [],
  patients: [],
  doctors: [],
  feedbacks: [],
  teamPulses: [],
  goals: [],
  oneOnOnes: [],

  // ── Sync actions ───────────────────────────────────────────────────────────
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

  // ── Async actions ──────────────────────────────────────────────────────────
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
      // best-effort — clear state regardless
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
      const [patients, feedbacks, appointments, teamPulses, goals] = await Promise.all([
        getPatients(),
        getFeedbacks(),
        getAppointments(),
        getTeamPulses(),
        getGoals(),
      ])
      set({ patients, feedbacks, appointments, teamPulses, goals })
    } catch (e: any) {
      set({ error: e.message ?? 'Failed to load data' })
    } finally {
      set({ loading: false })
    }
  },
}))