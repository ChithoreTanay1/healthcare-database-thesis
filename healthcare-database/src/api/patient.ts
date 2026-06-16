import { apiClient } from './client'
import type { Patient } from '../types/index'

export const getPatients = () => apiClient('/api/patients')
export const getPatient = (id: string) => apiClient(`/api/patients/${id}`)
export const createPatient = (p: Omit<Patient, 'id'>) =>
  apiClient('/api/patients', { method: 'POST', body: JSON.stringify(p) })
export const updatePatient = (id: string, p: Partial<Patient>) =>
  apiClient(`/api/patients/${id}`, { method: 'PUT', body: JSON.stringify(p) })
export const deletePatient = (id: string) =>
  apiClient(`/api/patients/${id}`, { method: 'DELETE' })