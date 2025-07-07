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
      <View style={[styles.iconWrapper, focused && styles.activeTabBackground]}>
        <IconComponent
          width={scale(23.56)}
          height={scale(21.82)}
        />
        <Text style={[styles.label, focused && styles.activeLabel]} numberOfLines={1}>
          {route.name}
        </Text>
      </View>
    );
  },
  tabBarStyle: styles.tabBar,
  tabBarItemStyle: {
    flex: 1, // Crucial for equal horizontal distribution
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
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
    height: scale(78),
    backgroundColor: colors.text,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 0,
    paddingTop: 0,
  },
  iconWrapper: {
    marginTop:scale(24),
    width: scale(55), // Increased width to accommodate longer text labels like "Applications"
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeTabBackground: {
    backgroundColor: '#B99147',
  },
  label: {
    fontSize: scale(12),
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: '#777',
    marginTop: scale(2),
    flexShrink: 1, // Allows the text to shrink if absolutely necessary
    flexGrow: 0,   // Prevents the text from growing unnecessarily
    textAlign: 'center', // Ensures text is centered
    // No need for overflow: 'hidden' or textBreakStrategy: 'simple' as numberOfLines={1} handles truncation
  },
  activeLabel: {
    color: '#fff',
  },
});