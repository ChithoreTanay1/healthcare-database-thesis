const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

let authToken: string | null = null

export const setToken = (token: string | null) => { authToken = token }

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
  return res.json()
}