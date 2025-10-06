import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth, logout } from '../features/auth/authSlice';
import { getStoredAuthData } from '../features/auth/authService';

// Import screens - React Native doesn't support React.lazy the same way
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabScreen from './BottomTabNavigator';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import ForgetScreen from '../screens/Auth/ForgetScreen/ForgetScreen';
import Bookanappointment from '../screens/Bookanappointment/Bookanappointment';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import InfromationScreen from '../screens/Bookanappointment/lnformationScreen/lnformationScreen';
import ProcessingScreen from '../screens/Bookanappointment/ProcessingScreen/ProcessingScreen';
import FeedBack from '../screens/FeedBack/FeedBack';
import VoiceoverScreen from '../screens/VoiceoverScreen/VoiceoverScreen';
import Uploadyourpassport from '../screens/Bookanappointment/Uploadyourpassport/Uploadyourpassport';
import UploadSelfiescreen from '../screens/Bookanappointment/UploadSelfiescreen/UploadSelfiescreen';

const Stack = createNativeStackNavigator();

// Memoized screen options
const screenOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  animation: 'slide_from_right',
};

const AuthNavigator = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Memoized auth check function
  const checkAuthSession = useCallback(async () => {
    try {
      const authData = await getStoredAuthData();
      if (authData?.tokens?.access_token) {
        dispatch(initializeAuth(authData));
      }
    } catch (error) {
      console.error('Session check failed:', error);
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthSession();
  }, [checkAuthSession]);

  // Memoized initial route name
  const initialRouteName = useMemo(() => {
    return isAuthenticated ? "BottomTabScreen" : "SplashScreen";
  }, [isAuthenticated]);

  // Memoized authenticated screens
  const authenticatedScreens = useMemo(() => (
    <>
          <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
      <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Bookanappointment" component={Bookanappointment} />
      <Stack.Screen name="InfromationScreen" component={InfromationScreen} />
      <Stack.Screen name="Uploadyourpassport" component={Uploadyourpassport} />
      <Stack.Screen name="UploadSelfiescreen" component={UploadSelfiescreen} />
      <Stack.Screen name="VoiceoverScreen" component={VoiceoverScreen} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </>
  ), []);

  // Memoized unauthenticated screens
  const unauthenticatedScreens = useMemo(() => (
    <>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="VoiceoverScreen" component={VoiceoverScreen} />
    </>
  ), []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
    >
      {isAuthenticated ? authenticatedScreens : unauthenticatedScreens}
    </Stack.Navigator>
  );
});

AuthNavigator.displayName = 'AuthNavigator';

export default AuthNavigator;
