import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      showToast.success('Registration successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      showToast.success('Login successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    showToast.success('Logged out successfully');
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
});

// Verify token
export const verifyToken = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const { data } = await api.get('/auth/verify');
      return data.user;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return rejectWithValue('Token verification failed');
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Request failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Reset failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Google OAuth login
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      // Redirect to Google OAuth
      const apiUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      const message = 'Google OAuth failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Handle Google OAuth success
export const handleGoogleSuccess = createAsyncThunk(
  'auth/handleGoogleSuccess',
  async (token, { rejectWithValue }) => {
    try {
      localStorage.setItem('accessToken', token);

      // Get user data
      const { data } = await api.get('/auth/me');
      localStorage.setItem('user', JSON.stringify(data));
      showToast.success('Google login successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Google login failed';
      showToast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Verify token
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Google OAuth success
      .addCase(handleGoogleSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGoogleSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(handleGoogleSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
