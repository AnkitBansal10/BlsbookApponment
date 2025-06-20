import React,{useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { StatusBar ,LogBox} from 'react-native'
import { colors } from "./src/utils/colors";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreAllLogs()

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
  webClientId: '772676389619-vb002cjoemj97ipssos8sjsp5u648t7i.apps.googleusercontent.com',
   // ✅ This is correct
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