import React, { memo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Geist_Fonts } from '../utils/fonts';

// Memoized gradient colors array
const GRADIENT_COLORS = ['#9C6100', '#D9A546'];

const CustomButton = ({ onPress, label = "SIGN IN" }) => {
  // Memoize the press handler to prevent unnecessary re-renders
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.85} 
      style={styles.touchable}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
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
    overflow: 'hidden',
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

export default memo(CustomButton);