import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { colors } from '../utils/colors';
import { scale } from '../utils/responsive';

const Tab = createBottomTabNavigator();

const pngIcons = {
  Home: require('../assets/icons/Home.png'),
  Applications: require('../assets/icons/Application.png'),
  Chatbot: require('../assets/icons/Chatbot.png'),
   Documents: require('../assets/icons/Document.png'),
  Menu: require('../assets/icons/Menu.png'),
};

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused }) => {
    const iconSource = pngIcons[route.name];
    return (
      <Image
        source={iconSource}
        style={{
          width: scale(20),
          height: scale(20),
          tintColor: focused ? colors.primary : 'gray',
        }}
        resizeMode="contain"
      />
    );
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    height: 75,
    paddingBottom: 20,
    paddingTop: 5,
    elevation: 5,
  },
});

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Applications" component={HomeScreen} />
      <Tab.Screen name="Chatbot" component={HomeScreen} />
       <Tab.Screen name="Documents" component={HomeScreen} />
      <Tab.Screen name="Menu" component={HomeScreen} />
    </Tab.Navigator>
  );
}
