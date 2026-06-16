import { apiClient, setToken } from './client'

export const login = async (email: string, password: string) => {
  const data = await apiClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.accessToken)
  return data // { accessToken, refreshToken, role }
}

export const register = async (email: string, password: string, name: string, role: string) => {
  const data = await apiClient('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role }),
  })
  setToken(data.accessToken)
  return data
}

export const logout = async (token: string) => {
  await apiClient('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  setToken(null)
}