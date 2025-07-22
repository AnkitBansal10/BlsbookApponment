import { createSlice } from '@reduxjs/toolkit';
import { fetchNationalities, fetchcenter, applicantdata, appointmentholiday,appointment_workplan } from '../auth/authThunks';
import { storeAuthData, getStoredAuthData, clearAuthData } from './authService';
import { Holidays } from '../../utils/Image';

const initialState = {
  tokens: null,
  user: null,
  nationalities: null,
  ApplicationInfo: null,
  Holidays: null,
  appointmentworkplans:null,
  centers: null,
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
      // Specific handler for fetchNationalities
      .addCase(fetchNationalities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNationalities.fulfilled, (state, action) => {
        state.loading = false;
        state.nationalities = action.payload;
      })
      .addCase(fetchNationalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Specific handler for fetchcenter
      .addCase(fetchcenter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcenter.fulfilled, (state, action) => {
        state.loading = false;
        state.centers = action.payload;
      })
      .addCase(fetchcenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applicantdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applicantdata.fulfilled, (state, action) => {
        state.loading = false;
        state.ApplicationInfo = action.payload;
      })
      .addCase(applicantdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(appointmentholiday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentholiday.fulfilled, (state, action) => {
        state.loading = false;
        state.Holidays = action.payload;
      })
      .addCase(appointmentholiday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(appointment_workplan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointment_workplan.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentworkplans = action.payload;
      })
      .addCase(appointment_workplan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generic matchers for other actions
      .addMatcher(
        (action) => action.type.endsWith('/pending') &&
          !action.type.includes('fetchNationalities') &&
          !action.type.includes('fetchcenter') &&
          !action.type.includes('applicantdata') &&
          !action.type.includes('appointment_holiday ')&&
            !action.type.includes('appointment_workplan '),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') &&
          !action.type.includes('fetchNationalities') &&
          !action.type.includes('fetchcenter') &&
          !action.type.includes('applicantdata') &&
           !action.type.includes('appointment_holiday ')&&
            !action.type.includes('appointment_workplan '),
        (state, action) => {
          state.loading = false;
          if (action.payload?.tokens) {
            state.tokens = action.payload.tokens;
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.tokens?.access_token;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') &&
          !action.type.includes('fetchNationalities') &&
          !action.type.includes('fetchcenter') &&
          !action.type.includes('applicantdata') &&
         !action.type.includes('appointment_holiday ')&&
          !action.type.includes('appointment_workplan '),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearError, initializeAuth, refreshTokens } = authSlice.actions;
export default authSlice.reducer;