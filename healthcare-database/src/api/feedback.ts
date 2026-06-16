import { apiClient } from './client'
import type { Feedback } from '../types/index'

export const getFeedbacks = () => apiClient('/api/feedback')
export const getFeedbacksByCategory = (cat: string) => apiClient(`/api/feedback/category/${cat}`)
export const createFeedback = (f: Omit<Feedback, 'id' | 'timestamp'>) =>
  apiClient('/api/feedback', { method: 'POST', body: JSON.stringify(f) })
export const updateFeedbackStatus = (id: string, status: string) =>
  apiClient(`/api/feedback/${id}/status?status=${status}`, { method: 'PATCH' })