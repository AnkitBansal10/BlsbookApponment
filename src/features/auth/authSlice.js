// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  storeAuthData, 
  getStoredAuthData, 
  clearAuthData 
} from './authService';

const initialState = {
  tokens: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearAuthData();
      return { ...initialState };
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state, action) => {
      const { tokens, user } = action.payload;
      state.tokens = tokens;
      state.user = user;
      state.isAuthenticated = !!tokens?.access_token;
    },
    refreshTokens: (state, action) => {
      state.tokens = action.payload;
      state.isAuthenticated = !!action.payload?.access_token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.isAuthenticated = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
          state.tokens = action.payload.tokens;
          state.user = action.payload.user;
          state.isAuthenticated = !!action.payload.tokens?.access_token;
          state.error = null;
        }
      );
  },
});

// Export all actions
export const { logout, clearError, initializeAuth, refreshTokens } = authSlice.actions;
export default authSlice.reducer;