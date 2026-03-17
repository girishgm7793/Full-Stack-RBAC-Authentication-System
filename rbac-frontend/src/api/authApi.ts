import axiosInstance from './axiosInstance'
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  MessageResponse,
} from '../types/auth.types'

// Register a new user → POST /api/auth/register
export const registerUser = (data: RegisterRequest): Promise<MessageResponse> => {
  return axiosInstance
    .post<MessageResponse>('/api/auth/register', data)
    .then((res) => res.data)
}

// Login and get JWT token → POST /api/auth/login
export const loginUser = (data: LoginRequest): Promise<AuthResponse> => {
  return axiosInstance
    .post<AuthResponse>('/api/auth/login', data)
    .then((res) => res.data)
}

// Public endpoint — no token needed → GET /api/public
export const getPublicContent = (): Promise<MessageResponse> => {
  return axiosInstance
    .get<MessageResponse>('/api/public')
    .then((res) => res.data)
}

// User protected endpoint → GET /api/user
export const getUserContent = (): Promise<MessageResponse> => {
  return axiosInstance
    .get<MessageResponse>('/api/user')
    .then((res) => res.data)
}

// Admin protected endpoint → GET /api/admin
export const getAdminContent = (): Promise<MessageResponse> => {
  return axiosInstance
    .get<MessageResponse>('/api/admin')
    .then((res) => res.data)
}
