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
  async ({ first_name, email, mobile, passport, nationality_id, country_id }, { rejectWithValue }) => {
    console.log(mobile)
    try {
      const response = await api.post('applicant_registration', {
        first_name: first_name,
        email: email,
        mobile: mobile,
        passport: passport,
        nationality_id:nationality_id,
        country_apply_from_id:country_id
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
// applicant_data
export const applicantdata = createAsyncThunk(
  'auth/applicantdata', 
  async ({ email, passport_no }, { rejectWithValue }) => {
    console.log("Passport:", passport_no);
    console.log("Email:", email);
    try {
      const response = await api.post('applicant_data', {
        email:email, 
        passport_no: passport_no
      });
      console.log("Response:", response?.data
      );
      return response?.data?.data; 
    } catch (error) {
      console.log("❌ applicant_data Error:", error);
      console.log("❌ Error Response:", error.response?.data);
      console.log("❌ Error Response:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'applicant_data failed'
      );
    }
  }
);
// appointment_form
export const appointmentform = createAsyncThunk(
  'auth/appointmentform',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('appointment_form', {
        uid: formData.uid,
        title: formData.title,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_country_code: formData.mobile_country_code,
        mobile_number: formData.mobile_number,
        passport_no: formData.passport_no
      });
      return response.data.message; // Return just the message string
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'appointment_form failed'
      );
    }
  }
);
//center
export const fetchcenter = createAsyncThunk(
  'auth/fetchcenter',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('center');
      console.log(response)
      return response.data; // Return nationality data
    } catch (error) {
      console.error('Fetch center Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
      });
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch center'
      );
    }
  }
);

// appointment_form
export const share_feedback = createAsyncThunk(
  'auth/share_feedback',
  async ({name,email, mobile,purpose},{ rejectWithValue }) => {
    try {
      const response = await api.post('share_feedback', {
        name,
        email,
        mobile,
        purpose,
      });
      return response.data.message; // Return just the message string
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'share_feedback'
      );
    }
  }
);
// appointment_holiday
export const appointmentholiday = createAsyncThunk(
  'auth/appointment_holiday',
  async ({ location_id }, { rejectWithValue }) => {
    try {
      const response = await api.post('appointment_holiday?',{
      location_id})
      console.log("API Response:", response.data);
      return response.data?.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch appointment holidays'
      );
    }
  }
);

// appointment_workplan
export const appointment_workplan = createAsyncThunk(
  'auth/appointment_workplan',
  async ({ location_id }, { rejectWithValue }) => {
    try {
      const response = await api.post('appointment_workplan?',{
      location_id})
      console.log("API Response:", response.data);
      return response.data?.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch appointment appointment_workplan'
      );
    }
  }
);

export const availability = createAsyncThunk(
  'auth/availability',
  async ({ location_id ,appointment_date,slot_type}, { rejectWithValue }) => {
    try {
      const response = await api.post('availability',{
      location_id,
    appointment_date,
    slot_type
    })
      console.log("API Response:", response.data);
      return response.data?.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch appointment availability'
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