import { apiClient } from './client'
import type { Goal, TeamPulse } from '../types/index'

export const getTeamPulses = () => apiClient('/api/analytics/team-pulse')
export const getGoals = () => apiClient('/api/analytics/goals')
export const createGoal = (g: Omit<Goal, 'id'>) =>
  apiClient('/api/analytics/goals', { method: 'POST', body: JSON.stringify(g) })
export const updateGoalProgress = (id: string, progress: number) =>
  apiClient(`/api/analytics/goals/${id}/progress?progress=${progress}`, { method: 'PATCH' })