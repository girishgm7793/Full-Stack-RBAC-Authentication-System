import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'
import useAuth from '../hooks/useAuth'
import type { LoginRequest } from '../types/auth.types'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [serverError, setServerError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // React Hook Form for login form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()

  const onSubmit = async (formData: LoginRequest) => {
    setServerError('')
    setLoading(true)

    try {
      const response = await loginUser(formData)

      // Save JWT token and user info to context + localStorage
      login({
        token: response.token,
        role:  response.role,
        name:  response.name,
        email: response.email,
      })

      // Redirect to dashboard after successful login
      navigate('/dashboard')
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        'Invalid email or password.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-400 text-red-700 text-sm">
            ✗ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded text-sm transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
