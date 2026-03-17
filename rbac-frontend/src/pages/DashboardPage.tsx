import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import { getPublicContent, getUserContent, getAdminContent } from '../api/authApi'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // React Query — fetch public content (all roles can see)
  const {
    data: publicData,
    isLoading: publicLoading,
    isError: publicError,
  } = useQuery({
    queryKey: ['public'],
    queryFn: getPublicContent,
  })

  // React Query — fetch USER content (only when role is USER)
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user-content'],
    queryFn: getUserContent,
    enabled: user?.role === 'USER',   // only runs if role is USER
    retry: false,
  })

  // React Query — fetch ADMIN content (only when role is ADMIN)
  const {
    data: adminData,
    isLoading: adminLoading,
    isError: adminError,
  } = useQuery({
    queryKey: ['admin-content'],
    queryFn: getAdminContent,
    enabled: user?.role === 'ADMIN',  // only runs if role is ADMIN
    retry: false,
  })

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">
            RBAC Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, <span className="font-semibold text-gray-800">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">

        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4 border-b pb-2">
            Your Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Name: </span>
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Email: </span>
              <span className="font-medium text-gray-800">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-500">Role: </span>
              {user.role === 'ADMIN' ? (
                <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                  ADMIN
                </span>
              ) : (
                <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  USER
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Public Content Card (visible to everyone) ─────── */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-base font-semibold text-gray-700">
              Public Content
            </h3>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              All Roles
            </span>
          </div>
          {publicLoading && (
            <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
          )}
          {publicError && (
            <p className="text-sm text-red-500">Failed to load public content.</p>
          )}
          {publicData && (
            <p className="text-sm text-gray-600">{publicData.message}</p>
          )}
        </div>

        {/* ── User Content Card (only shown if role is USER) ── */}
        {user.role === 'USER' && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-base font-semibold text-gray-700">
                User Content
              </h3>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-medium">
                USER Only
              </span>
            </div>
            {userLoading && (
              <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
            )}
            {userError && (
              <p className="text-sm text-red-500">
                Access denied or failed to load content.
              </p>
            )}
            {userData && (
              <p className="text-sm text-gray-600">{userData.message}</p>
            )}
          </div>
        )}

        {/* ── Admin Content Card (only shown if role is ADMIN) */}
        {user.role === 'ADMIN' && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-base font-semibold text-gray-700">
                Admin Content
              </h3>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded font-medium">
                ADMIN Only
              </span>
            </div>
            {adminLoading && (
              <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
            )}
            {adminError && (
              <p className="text-sm text-red-500">
                Access denied or failed to load content.
              </p>
            )}
            {adminData && (
              <p className="text-sm text-gray-600">{adminData.message}</p>
            )}
          </div>
        )}

        {/* ── API Endpoints Reference ───────────────────────── */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-4 border-b pb-2">
            API Endpoints
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 pr-4 font-medium">Method</th>
                  <th className="pb-2 pr-4 font-medium">Endpoint</th>
                  <th className="pb-2 font-medium">Access</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-gray-50">
                <tr>
                  <td className="py-2 pr-4 text-green-600 font-mono font-bold">POST</td>
                  <td className="py-2 pr-4 font-mono text-xs">/api/auth/register</td>
                  <td className="py-2 text-gray-500">Public</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-green-600 font-mono font-bold">POST</td>
                  <td className="py-2 pr-4 font-mono text-xs">/api/auth/login</td>
                  <td className="py-2 text-gray-500">Public</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-blue-500 font-mono font-bold">GET</td>
                  <td className="py-2 pr-4 font-mono text-xs">/api/public</td>
                  <td className="py-2 text-gray-500">All</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-blue-500 font-mono font-bold">GET</td>
                  <td className="py-2 pr-4 font-mono text-xs">/api/user</td>
                  <td className="py-2">
                    <span className="text-green-600 font-medium">USER</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-blue-500 font-mono font-bold">GET</td>
                  <td className="py-2 pr-4 font-mono text-xs">/api/admin</td>
                  <td className="py-2">
                    <span className="text-purple-600 font-medium">ADMIN</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage
