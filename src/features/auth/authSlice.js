import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  storeTokens, 
  getStoredTokens, 
  clearTokens, 
  storeUser, 
  getStoredUser 
} from './authService';
import { 
  onGoogleButtonPress, 
  onFacebookButtonPress 
} from './socialAuth';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      await storeTokens(data.tokens);
      await storeUser(data.user);

      return { tokens: data.tokens, user: data.user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const credential = await onGoogleButtonPress();
      const idToken = credential?.user?.stsTokenManager?.accessToken;
      
      if (!idToken) throw new Error('Google login failed');
      
      const tokens = { access_token: idToken };
      const user = {
        id: credential.user.uid,
        name: credential.user.displayName,
        email: credential.user.email,
      };

      await Promise.all([storeTokens(tokens), storeUser(user)]);
      return { tokens, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const [tokens, user] = await Promise.all([
        getStoredTokens(),
        getStoredUser(),
      ]);
      
      if (!tokens?.access_token) throw new Error('No valid session');
      return { tokens, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    tokens: null,
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      clearTokens();
      return { ...initialState, loading: false };
    },
    clearError: (state) => {
      state.error = null;
    },
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
          state.isAuthenticated = true;
          state.error = null;
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;