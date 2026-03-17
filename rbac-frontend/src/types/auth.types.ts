// Matches backend RegisterRequest DTO
export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: string
}

// Matches backend LoginRequest DTO
export interface LoginRequest {
  email: string
  password: string
}

// Matches backend AuthResponse DTO — returned on login
export interface AuthResponse {
  token: string
  role: string
  email: string
  name: string
}

// Matches backend MessageResponse DTO
export interface MessageResponse {
  message: string
}

// Stored in AuthContext after login
export interface AuthUser {
  token: string
  role: string
  email: string
  name: string
}
