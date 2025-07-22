import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen.js/ProfileScreen';
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

    // Determine if we need wider width for focused state
    const needsWiderWidth = focused && (route.name === "Applications" || route.name === "Documents");
    const wrapperWidth = needsWiderWidth ? scale(75) : scale(54);
    
    // Determine if we need to shift left (for Chatbot or Documents)
    const needsLeftShift = route.name === "Chatbot" || route.name === "Documents";
    const leftMargin = needsLeftShift ? scale(12) : 0;

    return (
      <View style={[
        styles.iconWrapper, 
        focused && styles.activeTabBackground,
        { 
          width: wrapperWidth,
          left: leftMargin
        }
      ]}>
        <IconComponent
          width={scale(25.56)}
          height={scale(23.82)}
        />
        <Text 
          style={[
            styles.label, 
            focused && styles.activeLabel,
            { width: needsWiderWidth ? scale(90) : scale(80)}
          ]} 
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {route.name}
        </Text>
      </View>
    );
  },
 tabBarStyle: {
    ...styles.tabBar,
  },
  tabBarItemStyle: {
    flex: 1,
    marginTop:4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Applications" component={HomeScreen} />
      <Tab.Screen name="Documents" component={HomeScreen} />
      <Tab.Screen name="Chatbot" component={HomeScreen} />
      <Tab.Screen name="Menu" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: scale(78),
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    backgroundColor:colors.text,
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    paddingBottom: 0,
    paddingTop: 0,
  },
  iconWrapper: {
    marginTop: scale(24),
    height: scale(60),
    padding: 10,
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
    color:colors.borderColor,
    marginTop: scale(2),
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#fff',
  },
});