import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('currentUser')

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setCurrentUser(user)
        setIsLoggedIn(true)
        navigate('/dashboard') // Redirect if already logged in
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async () => {
    if (loading) return

    if (!formData.email.trim() || !formData.password) {
      toast.error('Email and password are required')
      return
    }

    setLoading(true)

    try {
      const loadingToast = toast.loading('Signing you in...')

      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      toast.dismiss(loadingToast)

      if (data.success) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('currentUser', JSON.stringify(data.user))

        setCurrentUser(data.user)
        setIsLoggedIn(true)

        toast.success(`Welcome back, ${data.user.firstName}!`)
        navigate('/dashboard') // ✅ Redirect to dashboard after login
      } else {
        toast.error(data.message || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full p-3 mb-6 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default Login
