import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi'
import type { RegisterRequest } from '../types/auth.types'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // React Hook Form — handles form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>()

  const onSubmit = async (formData: RegisterRequest) => {
    setServerError('')
    setSuccessMsg('')
    setLoading(true)

    try {
      const response = await registerUser(formData)
      setSuccessMsg(response.message)
      // Redirect to login after short delay
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        'Registration failed. Please try again.'
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
          Create Account
        </h2>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-3 rounded bg-green-50 border border-green-400 text-green-700 text-sm">
            ✓ {successMsg} Redirecting...
          </div>
        )}

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-400 text-red-700 text-sm">
            ✗ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.name ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              className={`w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.role ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('role', {
                required: 'Please select a role',
              })}
            >
              <option value="">-- Select a role --</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded text-sm transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
