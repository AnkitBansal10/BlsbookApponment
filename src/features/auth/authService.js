// src/features/auth/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthData = async ({ tokens, user }) => {
  try {
    await AsyncStorage.multiSet([
      ['authTokens', JSON.stringify(tokens)],
      ['userInfo', JSON.stringify(user)]
    ]);
  } catch (error) {
    console.error('Error storing auth data:', error);
    throw error;
  }
};

export const getStoredAuthData = async () => {
  try {
    const [tokens, user] = await AsyncStorage.multiGet(['authTokens', 'userInfo']);
    return {
      tokens: tokens[1] ? JSON.parse(tokens[1]) : null,
      user: user[1] ? JSON.parse(user[1]) : null
    };
  } catch (error) {
    console.error('Error getting auth data:', error);
    return { tokens: null, user: null };
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove(['authTokens', 'userInfo']);
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw error;
  }
};