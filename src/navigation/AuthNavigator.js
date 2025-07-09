import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator ,CardStyleInterpolators} from '@react-navigation/native-stack';
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
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth, logout } from '../features/auth/authSlice';
import { getStoredAuthData } from '../features/auth/authService';
import ForgetScreen from '../screens/Auth/ForgetScreen/ForgetScreen';
import { styles } from '';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated)

  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const authData = await getStoredAuthData();
        
        if (authData?.tokens?.access_token) {
          // Dispatch initializeAuth with the stored data
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
      initialRouteName={isAuthenticated ? "BottomTabScreen" : "SplashScreen"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
          <Stack.Screen name="Bookanappointment" component={Bookanappointment} />
        </>
      ) : (
        <>
          
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        </>
      )}
      <Stack.Screen name="VisaDetailScreen" component={VisaDetailScreen} />
      <Stack.Screen name="AdditionalServices" component={AdditionalServices} />
    </Stack.Navigator>
  );
}