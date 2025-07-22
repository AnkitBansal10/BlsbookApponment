import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabScreen from './BottomTabNavigator';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth, logout } from '../features/auth/authSlice';
import { getStoredAuthData } from '../features/auth/authService';
import ForgetScreen from '../screens/Auth/ForgetScreen/ForgetScreen';
import Bookanappointment from '../screens/Bookanappointment/Bookanappointment';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import InfromationScreen from '../screens/Bookanappointment/lnformationScreen/lnformationScreen'
import ProcessingScreen from '../screens/Bookanappointment/ProcessingScreen/ProcessingScreen';
import FeedBack from '../screens/FeedBack/FeedBack';
import VoiceoverScreen from '../screens/VoiceoverScreen/VoiceoverScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuthSession = async () => {
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
    };

    checkAuthSession();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={isAuthenticated ? "ProcessingScreen" : "SplashScreen"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
          <Stack.Screen name="VoiceoverScreen" component={VoiceoverScreen} />
          <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
          <Stack.Screen name="InfromationScreen" component={InfromationScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Bookanappointment" component={Bookanappointment} />
          <Stack.Screen name="FeedBack" component={FeedBack} />
        </>
      ) : (
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}