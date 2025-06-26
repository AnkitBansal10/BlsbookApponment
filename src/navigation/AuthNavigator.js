import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabScreen from './BottomTabNavigator';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import { getStoredTokens } from '../features/auth/authService';
import Bookanappointment from '../screens/Bookanappointment/Bookanappointment';
import VisaTypescreen from '../screens/Visatypescreen/VisaTypescreen'
import VisaDetailScreen from '../screens/VisaDetailScreen/VisaDetailScreen';
import FaqScreen from '../screens/FaqScreen/FaqScreen';
import HolidaysScreen from '../screens/HolidaysScreen/HolidaysScreen';
import AdditionalServices from '../screens/AdditionalServices/AdditionalServices';
import InformationScreen from '../screens/Bookanappointment/lnformationScreen/lnformationScreen'
import Appointmentbookinglink from '../screens/Bookanappointment/Appointmentbookinglink/Appointmentbookinglink'
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const { access_token } = useSelector((state) => state.auth);


  useEffect(() => {
    const init = async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
        if (alreadyLaunched === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        const tokens = await getStoredTokens();
        if (tokens?.access_token) {
          setUserToken(tokens.access_token);
        }
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (access_token) {
      setUserToken(access_token);
    }
  }, [access_token]);

  if (isLoading || isFirstLaunch === null) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        "Appointmentbookinglink"}>
        <Stack.Screen name="Appointmentbookinglink" component={Appointmentbookinglink} />
        <Stack.Screen name="InformationScreen" component={InformationScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="BottomTab" component={BottomTabScreen} />
      <Stack.Screen name="VisaDetailScreen" component={VisaDetailScreen} />
      <Stack.Screen name="AdditionalServices" component={AdditionalServices} />
      <Stack.Screen name="HolidaysScreen" component={HolidaysScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="Bookanappointment" component={Bookanappointment} />
      <Stack.Screen name="VisaTypescreen" component={VisaTypescreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    </Stack.Navigator>
  );
}