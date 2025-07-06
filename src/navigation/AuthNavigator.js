import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { checkFirstLaunch, loadUser } from '../features/auth/authThunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabScreen from './BottomTabNavigator';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import Bookanappointment from '../screens/Bookanappointment/Bookanappointment';
import VisaTypescreen from '../screens/Visatypescreen/VisaTypescreen';
import VisaDetailScreen from '../screens/VisaDetailScreen/VisaDetailScreen';
import FaqScreen from '../screens/FaqScreen/FaqScreen';
import HolidaysScreen from '../screens/HolidaysScreen/HolidaysScreen';
import AdditionalServices from '../screens/AdditionalServices/AdditionalServices';
import InformationScreen from '../screens/Bookanappointment/lnformationScreen/lnformationScreen';
import Appointmentbookinglink from '../screens/Bookanappointment/Appointmentbookinglink/Appointmentbookinglink';
import Uploadyourpassport from '../screens/Bookanappointment/Uploadyourpassport/Uploadyourpassport';
import UploadSelfiescreen from '../screens/Bookanappointment/UploadSelfiescreen/UploadSelfiescreen';
import ProcessingScreen from '../screens/Bookanappointment/ProcessingScreen/ProcessingScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { 
    isAuthenticated, 
    isFirstLaunch, 
    loading: authLoading 
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if it's first launch and load user session
        await Promise.all([
          dispatch(checkFirstLaunch()),
          dispatch(loadUser())
        ]);
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading || authLoading || isFirstLaunch === null) {
    return <SplashScreen />;
  }

  const getInitialRoute = () => {
    if (isFirstLaunch) return 'GetStarted';
    return isAuthenticated ? 'BottomTab' : 'SignIn';
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={getInitialRoute()}
    >
      {/* Authentication Screens */}
      {!isAuthenticated && (
        <>
          {isFirstLaunch && (
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          )}
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}

      {/* Authenticated Screens */}
      {isAuthenticated && (
        <>
          <Stack.Screen name="BottomTab" component={BottomTabScreen} />
          <Stack.Screen name="Bookanappointment" component={Bookanappointment} />
          <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
          <Stack.Screen name="Uploadyourpassport" component={Uploadyourpassport} />
          <Stack.Screen name="UploadSelfiescreen" component={UploadSelfiescreen} />
          <Stack.Screen name="Appointmentbookinglink" component={Appointmentbookinglink} />
          <Stack.Screen name="InformationScreen" component={InformationScreen} />
        </>
      )}

      {/* Public Screens (accessible regardless of auth state) */}
      <Stack.Screen name="VisaDetailScreen" component={VisaDetailScreen} />
      <Stack.Screen name="AdditionalServices" component={AdditionalServices} />
      <Stack.Screen name="HolidaysScreen" component={HolidaysScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="VisaTypescreen" component={VisaTypescreen} />
    </Stack.Navigator>
  );
}