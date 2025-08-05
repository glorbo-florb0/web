import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import { api } from '../services/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCorrections: 0,
    pendingCorrections: 0,
    totalComments: 0,
    totalPageViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      // Check if user is admin (you might want to add an isAdmin field to your user model)
      if (user.role !== 'admin' && user.role !== 'Admin') {
        navigate('/dashboard');
        return;
      }

      setIsAuthenticated(true);
      
      // Load users
      const usersData = await api.getAllUsers(token);
      if (usersData.users) {
        setUsers(usersData.users);
        setStats(prev => ({
          ...prev,
          totalUsers: usersData.users.length,
          activeUsers: usersData.users.filter(u => u.status === 'active' || u.status === 'Active').length
        }));
      }


    } catch (error) {
      console.error('Error loading admin data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-800 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-red-200">Manage Equinox Tanks</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'users', name: 'Users', icon: '👥' },
                { id: 'corrections', name: 'Corrections', icon: '✏️' },
                { id: 'content', name: 'Content', icon: '📝' },
                { id: 'settings', name: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Pending Corrections</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingCorrections}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-600">Page Views</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalPageViews.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600">Total Comments</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-indigo-600">Total Corrections</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCorrections}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status || 'active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'corrections' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Correction Requests</h2>
              <div className="space-y-4">
                {corrections.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No correction requests found.</p>
                ) : (
                  corrections.map((correction) => (
                    <div key={correction.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{correction.tank}</h3>
                          <p className="text-sm text-gray-600">Submitted by {correction.user}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          correction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          correction.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {correction.status}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{correction.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{correction.date}</span>
                        <div className="space-x-2">
                          <button className="text-green-600 hover:text-green-900 text-sm font-medium">Approve</button>
                          <button className="text-red-600 hover:text-red-900 text-sm font-medium">Reject</button>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tank Articles</h3>
                  <p className="text-gray-600 mb-4">Manage tank articles and content</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Manage Articles
                  </button>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
                  <p className="text-gray-600 mb-4">Moderate user comments</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Moderate Comments
                  </button>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                  <p className="text-gray-600 mb-4">Manage tank images and media</p>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Manage Images
                  </button>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <p className="text-gray-600 mb-4">Organize content categories</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Manage Categories
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input type="text" defaultValue="Equinox Tanks" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                      <textarea rows="3" defaultValue="The premier online resource for tank history and information" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input type="email" defaultValue="admin@equinoxtanks.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <label className="text-sm text-gray-700">Allow user registration</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <label className="text-sm text-gray-700">Require email verification</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <label className="text-sm text-gray-700">Allow user comments</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 