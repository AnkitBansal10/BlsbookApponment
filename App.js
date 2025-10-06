import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { colors } from "./src/utils/colors";
import { store } from "./src/store/store";
import GlobalLoadingOverlay from './src/components/GlobalLoadingOverlay';
import { AccessibilityProvider } from './src/contexts/AccessibilityContext';
import AccessibilityFloatingButton from './src/components/AccessibilityFloatingButton';

// Only ignore logs in development, not in production
if (__DEV__) {
  const { LogBox } = require('react-native');
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested',
  ]);
}

const App = React.memo(() => {
  return (
    <Provider store={store}>
      <AccessibilityProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
        <GlobalLoadingOverlay />
        <AccessibilityFloatingButton />
      </AccessibilityProvider>
    </Provider>
  );
});

App.displayName = 'App';

export default App;
