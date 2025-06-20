// src/features/auth/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokens = async (tokens) => {
  try {
    await AsyncStorage.setItem('authTokens', JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing auth tokens', error);
    throw error;
  }
};

export const getStoredTokens = async () => {
  try {
    const tokens = await AsyncStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error getting auth tokens', error);
    throw error;
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('authTokens');
  } catch (error) {
    console.error('Error clearing auth tokens', error);
    throw error;
  }
};

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user info', error);
    throw error;
  }
};

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user info', error);
    throw error;
  }
};
