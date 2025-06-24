import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {
  Application,
  Chatbot,
  Menu,
  Documents,
  Home,
  WightApplication,
  HomeGray,
  WightDocuments,
  WightMenu,
  WightChat,
} from '../utils/Image';
import { Poppins_Fonts } from '../utils/fonts';

const Tab = createBottomTabNavigator();
const tabIcons = {
  Home: {
    focused: Home,
    unfocused: HomeGray,
  },
  Applications: {
    focused: WightApplication,
    unfocused: Application,
  },
  Documents: {
    focused: WightDocuments,
    unfocused: Documents,
  },
  Chatbot: {
    focused: WightChat,
    unfocused: Chatbot,
  },
  Menu: {
    focused: WightMenu,
    unfocused: Menu,
  },
};

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => {
    const iconSet = tabIcons[route.name];
    const IconComponent = iconSet
      ? focused
        ? iconSet.focused
        : iconSet.unfocused
      : null;

    if (!IconComponent) {
      console.warn(`Missing icon for tab: ${route.name}`);
      return (
        <View style={styles.iconWrapper}>
          <Text style={styles.label}>{route.name}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.iconWrapper, focused && styles.activeTab]}>
        <IconComponent
          width={scale(20)}
          height={scale(20)}
        />
        <Text style={[styles.label, focused && styles.activeLabel]}>
          {route.name}
        </Text>
      </View>
    );
  },
  tabBarStyle: styles.tabBar,
});

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Applications" component={HomeScreen} />
      <Tab.Screen name="Documents" component={HomeScreen} />
      <Tab.Screen name="Chatbot" component={HomeScreen} />
      <Tab.Screen name="Menu" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: scale(90),
    backgroundColor: colors.text,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    paddingTop: 5,
    elevation: 5,
  },
  iconWrapper: {
    marginTop:40,
    width:scale(55),
    height:scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 4,
  },
  activeTab: {
    backgroundColor: '#B99147',
  },
  label: {
    fontSize: scale(8),
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color: '#777',
    marginTop: 2,
  },
  activeLabel: {
    color: '#fff',
  },
});
