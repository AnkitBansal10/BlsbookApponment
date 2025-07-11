// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeAuthData, getStoredAuthData, clearAuthData } from './authService';
import { onGoogleButtonPress, onFacebookButtonPress } from './onGoogleButtonPress';
import api from '../../api/authApi';
import { Alert } from 'react-native';
import { use } from 'react';

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
      const response = await api.post('applicant_login', {
        email: email,
        password: password
      });
      const user = response.data?.data; // ✅ Real user object is in "data"
      if (!user) throw new Error("Invalid user data from server");

      // Optionally simulate token since API doesn't return one
      const tokens = {
        access_token: user.email, // Or generate a dummy token
        fake: true
      };

      await storeAuthData({ tokens, user });
      return {
        tokens,
        user,
        message: response.data.message // Pass message to Redux store
      };
    } catch (error) {
      console.log("❌ Axios Error:", error);
      console.log("❌ Error Response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Login failed'
      );
    }
  }
);


// registerUser
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ first_name, email, mobile, passport }, { rejectWithValue }) => {
    console.log(mobile)
    try {
      const response = await api.post('applicant_registration', {
        first_name: first_name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        passport: passport.trim(),
      });
      const { message } = response.data;
      console.log("✅ Registration Message:", message);
      //  await storeAuthData({  user });
      return { message };
    } catch (error) {
      console.log("❌ Registration Error:", error);
      console.log("❌ Error Response:", error.response?.data);
      console.log("❌ Error Response:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Registration failed'
      );
    }
  }
)
//Nanationality
export const fetchNationalities = createAsyncThunk(
  'auth/fetchNationalities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('nationality');
      return response.data; // Return nationality data
    } catch (error) {
      console.error('Fetch Nationalities Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
      });
      
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch nationalities'
      );
    }
  }
);
// ForgetPassword
export const ForgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async ({ email, password }, { rejectWithValue }) => {
    console.log(password)
    console.log(email)
    try {
      const response = await api.post('applicant_forgot', {
        email: email.trim(),
        password: password.trim(),
      });
      const { message } = response.data;
      console.log("✅ ForgetPassword Message:", message);
      //  await storeAuthData({  user });
      return { message };
    } catch (error) {
      console.log("❌ ForgetPassword Error:", error);
      console.log("❌ Error Response:", error.response?.data);
      console.log("❌ Error Response:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'ForgetPassword failed'
      );
    }
  }
)

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