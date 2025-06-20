import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { styles } from './styling';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../../utils/Image';

export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo
          width={scale(130)}
          height={scale(130)}
        />
      </View>
    </View>
  );
}


