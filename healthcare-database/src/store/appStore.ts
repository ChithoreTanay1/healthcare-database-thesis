import { create } from 'zustand'
import type { User, Patient, Doctor, Appointment, Feedback, TeamPulse, Goal, OneOnOne } from '@types/index'

interface AppStore {
  currentUser: User | null
  currentPage: string
  sidebarOpen: boolean
  appointments: Appointment[]
  patients: Patient[]
  doctors: Doctor[]
  feedbacks: Feedback[]
  teamPulses: TeamPulse[]
  goals: Goal[]
  oneOnOnes: OneOnOne[]

  // Actions
  setCurrentUser: (user: User | null) => void
  setCurrentPage: (page: string) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  addAppointment: (appointment: Appointment) => void
  addFeedback: (feedback: Feedback) => void
  logout: () => void
}

const initialAppointments: Appointment[] = [
  {
    id: '1',
    patient: 'John Smith',
    doctor: 'Dr. Sarah Chen',
    date: '2025-03-15',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'Consultation',
  },
  {
    id: '2',
    patient: 'Emma Johnson',
    doctor: 'Dr. James Wilson',
    date: '2025-03-15',
    time: '2:30 PM',
    status: 'pending',
    type: 'Follow-up',
  },
  {
    id: '3',
    patient: 'Michael Brown',
    doctor: 'Dr. Sarah Chen',
    date: '2025-03-16',
    time: '9:00 AM',
    status: 'confirmed',
    type: 'Check-up',
  },
]

const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    email: 'john@example.com',
    phone: '555-0101',
    lastVisit: '2025-02-28',
    condition: 'Hypertension',
    department: 'Cardiology',
  },
  {
    id: '2',
    name: 'Emma Johnson',
    age: 32,
    email: 'emma@example.com',
    phone: '555-0102',
    lastVisit: '2025-03-01',
    condition: 'Diabetes Type 2',
    department: 'Endocrinology',
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 56,
    email: 'michael@example.com',
    phone: '555-0103',
    lastVisit: '2025-02-15',
    condition: 'Arthritis',
    department: 'Rheumatology',
  },
]

const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology',
    available: true,
    team: 'Cardiology',
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Endocrinology',
    available: true,
    team: 'Endocrinology',
  },
  {
    id: '3',
    name: 'Dr. Lisa Anderson',
    specialty: 'Rheumatology',
    available: false,
    team: 'Rheumatology',
  },
]

const initialTeamPulses: TeamPulse[] = [
  {
    team: 'Cardiology',
    overall: 8.2,
    collaboration: 7.4,
    communication: 6.8,
    development: 7.2,
    impact: 8.9,
    innovation: 8.5,
    inclusivity: 7.7,
    workBalance: 9.3,
  },
  {
    team: 'Endocrinology',
    overall: 7.8,
    collaboration: 7.2,
    communication: 8.1,
    development: 7.5,
    impact: 8.4,
    innovation: 7.9,
    inclusivity: 8.2,
    workBalance: 8.8,
  },
]

const initialGoals: Goal[] = [
  {
    id: '1',
    team: 'Cardiology',
    title: 'Reduce patient wait times by 20%',
    status: 'active',
    progress: 65,
  },
  {
    id: '2',
    team: 'Endocrinology',
    title: 'Implement new diabetes management protocol',
    status: 'active',
    progress: 45,
  },
  {
    id: '3',
    team: 'Rheumatology',
    title: 'Increase patient satisfaction scores',
    status: 'active',
    progress: 80,
  },
]

const initialOneOnOnes: OneOnOne[] = [
  {
    id: '1',
    employee: 'Peter Jacobs',
    manager: 'Dr. Sarah Chen',
    date: '2025-03-20',
    lastMeeting: '2025-02-20',
  },
  {
    id: '2',
    employee: 'Mary Billin',
    manager: 'Dr. Sarah Chen',
    date: '2025-03-22',
    lastMeeting: '2025-02-22',
  },
  {
    id: '3',
    employee: 'Andrea McBean',
    manager: 'Dr. James Wilson',
    date: '2025-03-25',
    lastMeeting: '2025-02-25',
  },
]

export const useAppStore = create<AppStore>((set) => ({
  currentUser: null,
  currentPage: 'login',
  sidebarOpen: true,
  appointments: initialAppointments,
  patients: initialPatients,
  doctors: initialDoctors,
  feedbacks: [
    {
      id: '1',
      author: 'Anonymous',
      category: 'Company Culture',
      content:
        'Great workplace culture with supportive team members and good work-life balance',
      timestamp: '1h ago',
      status: 'new',
    },
    {
      id: '2',
      author: 'Anonymous',
      category: 'Team Leader',
      content: 'Leadership team is responsive and supportive of our career growth',
      timestamp: '2h ago',
      status: 'reviewed',
    },
    {
      id: '3',
      author: 'Anonymous',
      category: 'Benefits',
      content: 'Health insurance and retirement benefits are very competitive',
      timestamp: '1d ago',
      status: 'archived',
    },
  ],
  teamPulses: initialTeamPulses,
  goals: initialGoals,
  oneOnOnes: initialOneOnOnes,

  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),
  addFeedback: (feedback) =>
    set((state) => ({
      feedbacks: [feedback, ...state.feedbacks],
    })),
  logout: () =>
    set({ currentUser: null, currentPage: 'login', appointments: initialAppointments }),
}))
