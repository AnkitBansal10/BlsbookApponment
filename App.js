import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import { StatusBar, LogBox ,Linking} from 'react-native';
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
 const handleDeepLink = (url) => {
      if (url.includes('development.blsinternational.com/Italy_pakistan_appmnt/appointment/login'))
  
 {
        Alert.alert("Deep Link Opened", "App opened from website!");
        // You can navigate to a specific screen here
        // navigation.navigate('Login');
      }
    };

    // Check if app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Listen for deep links while app is running
    Linking.addEventListener('url', ({ url }) => handleDeepLink(url));

    return () => {
      Linking.removeAllListeners('url');
    };
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