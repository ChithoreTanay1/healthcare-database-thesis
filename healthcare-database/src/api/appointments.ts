import { apiClient } from './client'
import type { Appointment } from '../types/index'

export const getAppointments = () => apiClient('/api/appointments')
export const createAppointment = (a: Omit<Appointment, 'id'>) =>
  apiClient('/api/appointments', { method: 'POST', body: JSON.stringify(a) })
export const updateAppointmentStatus = (id: string, status: string) =>
  apiClient(`/api/appointments/${id}/status?status=${status}`, { method: 'PATCH' })