// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Utility to get the JWT token from localStorage
export const getToken = () => localStorage.getItem('authToken');

// Utility to set the JWT token
export const setToken = (token: string) => localStorage.setItem('authToken', token);

// Utility to remove the JWT token (on logout)
export const removeToken = () => localStorage.removeItem('authToken');

// Register user
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Save the JWT token
    setToken(data.token);

    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save the JWT token
    setToken(data.token);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Get current user (protected route)
export const getCurrentUser = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }

    return data.user;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

// Update user profile (protected route)
export const updateUserProfile = async (name: string, email: string) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Update failed');
    }

    return data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  removeToken();
};
