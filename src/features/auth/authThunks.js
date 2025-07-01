// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeAuthData, getStoredAuthData, clearAuthData } from './authService';
import { onGoogleButtonPress, onFacebookButtonPress } from './onGoogleButtonPress';
import api from '../../api/authApi';

export const checkFirstLaunch = createAsyncThunk(
  'auth/checkFirstLaunch',
  async (_, { rejectWithValue }) => {
    try {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        return true;
      }
      return false;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Email/Password Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { tokens, user } = response.data;
      
      await storeAuthData({ tokens, user });
      return { tokens, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Login failed'
      );
    }
  }
);

// Google Login
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const credential = await onGoogleButtonPress();
      const idToken = credential?.user?.stsTokenManager?.accessToken;
      
      if (!idToken) throw new Error('Google authentication failed');
      
      const response = await api.post('/auth/google', { token: idToken });
      const { tokens, user } = response.data;
      
      await storeAuthData({ tokens, user });
      return { tokens, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Google login failed'
      );
    }
  }
);

// Facebook Login
export const loginWithFacebook = createAsyncThunk(
  'auth/loginWithFacebook',
  async (_, { rejectWithValue }) => {
    try {
      const credential = await onFacebookButtonPress();
      const accessToken = credential?.accessToken;
      
      if (!accessToken) throw new Error('Facebook authentication failed');
      
      const response = await api.post('/auth/facebook', { token: accessToken });
      const { tokens, user } = response.data;
      
      await storeAuthData({ tokens, user });
      return { tokens, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Facebook login failed'
      );
    }
  }
);

// Load existing session
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const { tokens, user } = await getStoredAuthData();
      
      if (!tokens?.access_token) {
        throw new Error('No active session');
      }
      
      await api.get('/auth/verify');
      return { tokens, user };
    } catch (error) {
      await clearAuthData();
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Session expired'
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      await clearAuthData();
      return true;
    } catch (error) {
      await clearAuthData();
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Logout failed'
      );
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const { tokens, user } = await getStoredAuthData();
      
      if (!tokens?.access_token) {
        throw new Error('No active session');
      }
      
      // Verify token with backend
      await api.get('/auth/verify');
      return { tokens, user };
    } catch (error) {
      await clearAuthData();
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Session verification failed'
      );
    }
  }
);