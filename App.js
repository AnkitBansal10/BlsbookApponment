import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import { StatusBar, LogBox } from 'react-native';
import { colors } from "./src/utils/colors";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { store } from "./src/store/store";
import { webClientId } from "./src/api/digestClient";


LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:webClientId,
      offlineAccess: true,
    });
  }, []);

  return (
    <>
      <Provider store={store}>
          <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
      </Provider>
    </>
  );
}