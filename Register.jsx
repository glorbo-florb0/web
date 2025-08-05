import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Navigate helpers
  const navigateToHome = () => navigate('/')
  const navigateToLogin = () => navigate('/login')

  // Handle form submission
  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    // Basic frontend validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })
      const data = await response.json()

      if (data.success) {
        navigateToLogin()
      } else {
        setError(data.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Network error. Please check if the server is running and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center cursor-pointer" onClick={navigateToHome}>
            <div className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              🚗
            </div>
            <h1 className="text-xl font-bold hover:text-yellow-400 transition-colors">Equinox Tanks</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-yellow-400">Home</a>
            <a href="/wwi" className="hover:text-yellow-400">WWI</a>
            <a href="/wwii" className="hover:text-yellow-400">WWII</a>
            <a href="/modern" className="hover:text-yellow-400">Modern</a>
            <a href="/shop" className="hover:text-yellow-400">Shop</a>
            <a href="/login" className="hover:text-yellow-400">Login</a>
            <a href="/register" className="hover:text-yellow-400">Register</a>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Equinox Tanks</h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a unique username"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password (min 6 characters)"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed mt-6 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={navigateToLogin}
                disabled={loading}
                className="text-blue-600 hover:underline font-medium disabled:text-gray-400"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
