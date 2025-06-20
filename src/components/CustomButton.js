// components/CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Geist_Fonts } from '../utils/fonts';

const CustomButton = ({ onPress, label = "SIGN IN" }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.touchable}>
      <LinearGradient
        colors={['#9C6100', '#D9A546']} // Adjust as needed for golden effect
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden', // Ensures gradient corners are rounded
  },
  gradient: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Geist_Fonts.Geist_Bold,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CustomButton;
