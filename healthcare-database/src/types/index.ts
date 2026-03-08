export interface User {
  id: string
  email: string
  role: 'admin' | 'doctor' | 'manager'
  name: string
}

export interface Patient {
  id: string
  name: string
  age: number
  email: string
  phone: string
  lastVisit: string
  condition: string
  department: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  available: boolean
  team: string
}

export interface Appointment {
  id: string
  patient: string
  doctor: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'completed'
  type: string
}

export interface Feedback {
  id: string
  author: string
  category: string
  content: string
  timestamp: string
  status: 'new' | 'reviewed' | 'archived'
}

export interface TeamPulse {
  team: string
  overall: number
  collaboration: number
  communication: number
  development: number
  impact: number
  innovation: number
  inclusivity: number
  workBalance: number
}

export interface Goal {
  id: string
  team: string
  title: string
  status: 'active' | 'completed'
  progress: number
}

export interface Survey {
  id: string
  team: string
  date: string
  responseRate: number
  questions: SurveyQuestion[]
}

export interface SurveyQuestion {
  id: string
  question: string
  responses: number
}

export interface OneOnOne {
  id: string
  employee: string
  manager: string
  date: string
  lastMeeting: string
}

export interface ReportMetrics {
  [key: string]: number | string
}
