import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};

const API_URL = getApiUrl();

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server health on component mount
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        console.log('🔍 Checking server health at:', `${API_URL}/api/health`);
        const response = await fetch(`${API_URL}/api/health`, { 
          method: 'GET',
          timeout: 5000 
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Server is healthy:', data);
          setServerStatus('online');
        } else {
          console.warn('⚠️ Server responded with error:', response.status);
          setServerStatus('error');
          setError(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Server health check failed:', error);
        setServerStatus('offline');
        setError('Cannot connect to server. Make sure the server is running on port 3000.');
      }
    };

    checkServerHealth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form data
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (serverStatus !== 'online') {
      setError('Server is not available. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Attempting login with:', { email: formData.email });
      
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📥 Login response:', response.data);

      if (response.data && response.data.success) {
        const { token, user } = response.data.data;
        
        if (!token) {
          throw new Error('No token received from server');
        }
        
        // Store the token and user data
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        console.log('✅ Login successful, calling onLoginSuccess');
        
        // Call the success callback
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
      } else {
        throw new Error(response.data?.message || 'Login failed - invalid response format');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Server might be slow or unavailable.';
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const serverMessage = error.response.data?.message;
        
        switch (status) {
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 403:
            errorMessage = 'Access forbidden';
            break;
          case 404:
            errorMessage = 'Login endpoint not found. Check server configuration.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = serverMessage || `Server error (${status})`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Cannot connect to server. Check your connection and server status.';
        setServerStatus('offline');
      } else {
        // Something else happened
        errorMessage = error.message || 'An unexpected error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const getServerStatusDisplay = () => {
    switch (serverStatus) {
      case 'checking':
        return (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
              <span className="text-sm text-yellow-700">Checking server status...</span>
            </div>
          </div>
        );
      case 'offline':
        return (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">●</span>
              <span className="text-sm text-red-700">Server is offline</span>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-sm text-red-700">Server error detected</span>
            </div>
          </div>
        );
      case 'online':
        return (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">●</span>
              <span className="text-sm text-green-700">Server is online</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your house listings
          </p>
        </div>

        {/* Server Status */}
        {getServerStatusDisplay()}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading || serverStatus !== 'online'}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading || serverStatus !== 'online'}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || serverStatus !== 'online'}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || serverStatus !== 'online'
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : serverStatus !== 'online' ? (
                'Server Unavailable'
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Default credentials for testing:
              <br />
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                admin@example.com / admin123
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              API URL: {API_URL}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;